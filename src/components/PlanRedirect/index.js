import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAlertMessage } from "../../actions";
import PropTypes from "prop-types";
import qs from "qs";
import { verifyAuth } from "../../actions";
import { showModal } from "../../actions/ui";
import { postUpgradeTrackingEvents } from "../../newDropshipperApp/utils/trackingEvents/upgradeEvents";
// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const PlanRedirectAnalyticsWrapper = props => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  return <PlanRedirect {...props} track={track} />;
};
class PlanRedirect extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    router: PropTypes.object
  };

  shouldComponentUpdate(nextProps) {
    const { allPlans, currentPlan } = this.props;

    // Condition to avoid running postUpgradeTrackingEvents more than once.
    if (nextProps.allPlans !== allPlans && allPlans === undefined) {
      const plan = nextProps.allPlans.find(
        plan => plan.name === currentPlan.name && plan.annual === currentPlan.annual
      );

      this.props.track("upgrade__plan-upgraded");
      postUpgradeTrackingEvents({
        plan,
        subscriptionId: this.props.currentSubscription.id
      });
    }
    return true;
  }

  /**
   * If the plan is successful, we check to see if there was a listing to be imported
   */
  plan = () => {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });

    const queryResult = String(query.success).toLowerCase();

    if (queryResult === "true") {
      const plan = this.props.allPlans.find(
        plan => plan.name === this.props.currentPlan.name && plan.annual === this.props.currentPlan.annual
      );

      this.props.showModal("UPGRADE_SUCCESS", { plan });

      const supplierOrderToCheckoutJson = localStorage.getItem("supplier_order_to_checkout");
      if (supplierOrderToCheckoutJson) {
        this.props.router.push("/orders");
        return;
      }
    } else if (queryResult === "false") {
      this.props.setAlertMessage("Your plan was not upgraded", "error");
    } else {
      this.props.setAlertMessage("There was an error while upgrading your plan", "error");
    }
    this.props.verifyAuth().then(() => {
      this.props.router.push("/settings/plan");
    });
  };

  render() {
    const { allPlans, currentPlan } = this.props;
    return (
      <div className="container">{Object.keys(currentPlan) && allPlans !== undefined && this.plan()}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPlan: state.settings.currentPlan,
    allPlans: state.store.plans.allPlans,
    currentSubscription: state.settings.currentSubscription
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage, verifyAuth, showModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanRedirectAnalyticsWrapper);



// WEBPACK FOOTER //
// ./src/components/PlanRedirect/index.js