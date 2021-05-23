// Libs
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IntercomAPI } from "react-intercom";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

// Components
import Plans from "../../Plans";

// Actions
import { trackPaywallView } from "../../../actions/tracker";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const PlansTabAnalyticWrapper = props => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  return <PlansTab {...props} track={track} />;
};
class PlansTab extends React.Component {
  static propTypes = {
    location: PropTypes.object
  };

  componentDidMount() {
    IntercomAPI("trackEvent", "Visit: Plans page");
    document.title = "Settings - Plans - Spocket";
    this.props.track("upgrade__settings-plans--viewed", {}, { refreshAttemptId: true });
    this.props.trackPaywallView("settings_plan", "plan", null, null, null, "viewed_all_plans");
  }

  render() {
    return (
      <div>
        <h5 className="settings__subtitle header-tip">{this.props.t("Settings.PricingPlans.Title")}</h5>
        <hr />
        <Plans location={this.props.location} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ trackPaywallView }, dispatch);
}

export default withTranslation()(
  connect(
    null,
    mapDispatchToProps
  )(PlansTabAnalyticWrapper)
);



// WEBPACK FOOTER //
// ./src/components/Settings/PlansTab/index.js