import "../../index.css";
import "./style.css";
import "./deprecated.style.css";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Intercom from "react-intercom";
import PropTypes from "prop-types";
import React from "react";
import { browserHistory } from "react-router";
import { withTranslation } from "react-i18next";

import { LIVE_CHAT } from "../../utils/features";
import { signOutUser, setAlertMessage } from "../../actions";
import Alerts from "./Alerts";
import { BubbleWidget } from "newDropshipperApp/spocketUI/components/BubbleWidget";
import ModalConductor from "../_Shared/ModalConductor";
import UpgradeButton from "../../newDropshipperApp/component/UpgradeButton";
import { showModal, closeModal } from "../../actions/ui";
import SideBar from "../../newDropshipperApp/component/SideBar";
import { isSubscriptionOverdue } from "../../newDropshipperApp/utils/user";
import { isAnnual } from "../../actions/upgrade.js";
import SubscriptionConfirmation from "../../newDropshipperApp/component/SubscriptionConfirmation";
import BannerConductor from "../../newDropshipperApp/component/BannerConductor";
import { getStore } from "../../newDropshipperApp/module/store";
import { gaEvent } from "../../newDropshipperApp/utils/trackEvents";

// Utils
import { isIntegratedStoreWix } from "../../utils/features";

class Navigation extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    signOutUser: PropTypes.func.isRequired,
    registered: PropTypes.bool,
    listingModalOpened: PropTypes.bool,
    setAlertMessage: PropTypes.func.isRequired
  };

  state = {
    stickySideBar: false
  };

  componentDidMount() {
    this.actionByUrlQueryString();
    this.props.getStore();
  }

  actionByUrlQueryString() {
    // TODO - Handle the query string via "use-query-params"
    let params = new URLSearchParams(window.location.search);
    let action = params.get("action");
    let annual = params.get("annual");

    action === "connect" && this.props.showModal("CONNECT_STORE");
    annual && this.props.isAnnual(true);
  }

  redirectToPlansByBubble = () => {
    browserHistory.push("/settings/plan");
  };

  renderUpgradeButton = () => {
    const { confirmationUrl, current_promotion_type } = this.props;
    const currentUrl = window.location.pathname;

    if (
      !confirmationUrl &&
      !isIntegratedStoreWix() &&
      currentUrl !== "/settings/plan" &&
      current_promotion_type !== "introductory_annual"
    ) {
      return (
        <UpgradeButton
          location={currentUrl}
          trackOnClick={() => {
            currentUrl === "/search" &&
              gaEvent({
                category: "search page",
                action: "upgrade button clicked (top right button)"
              });
          }}
        />
      );
    }
  };

  render() {
    const user = {
      email: localStorage.user_email
    };
    const { currentPlan } = this.props;
    const isCurrentPlanAbleToLiveChat = currentPlan.features && currentPlan.features.includes(LIVE_CHAT);

    return (
      <div>
        <div>
          <ModalConductor currentModal={this.props.currentModal} />
        </div>
        <div>
          <Alerts />

          {/* Starting Intercom only in production environment */}
          {process.env.NODE_ENV === "production"
            && <Intercom appID={process.env.REACT_APP_INTERCOM_KEY} {...user} />}

          {(!isCurrentPlanAbleToLiveChat || isSubscriptionOverdue()) && (
            <BubbleWidget t={this.props.t} redirectTo={this.redirectToPlansByBubble} />
          )}

          <SideBar sticky={true} />

          <div className="container-dash">
            {this.renderUpgradeButton()}

            <SubscriptionConfirmation />
            {!["suppliers"].includes(window.location.pathname.split("/")[1]) && (
              <BannerConductor currentBanner={this.props.current_promotion_type} />
            )}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { signOutUser, setAlertMessage, showModal, closeModal, isAnnual, getStore },
    dispatch
  );
}

function mapStateToProps(state) {
  const subscription = state.settings.currentSubscription;
  return {
    hasClickedCurrentPromotion: state.settings.dropshipperData.has_clicked_current_promotion,
    registered: state.auth.registered,
    currentModal: state.ui.currentModal,
    currentPlan: state.settings.currentPlan,
    show_promotion: state.settings.dropshipperData.show_promotion,
    confirmationUrl: subscription && subscription.confirmation_url,
    current_promotion_type: state.settings.dropshipperData.current_promotion_type || "",
    dropshipperCreatedAt: state.settings.dropshipperCreatedAt,
    has_clicked_to_review: state.settings.dropshipperData.has_clicked_to_review,
    allOffers: state.store.offers.allOffers,
    trialDaysUsed: state.settings.dropshipperData.trial_days_used || 0,
    trialDaysPlan: state.store.plans.trialDaysPlan || 0
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
);



// WEBPACK FOOTER //
// ./src/components/Navigation/index.js