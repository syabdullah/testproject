// React
import React, { Fragment } from "react";

// Libs
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IntercomAPI } from "react-intercom";

import { showModal } from "../../actions/ui";
import { isAnnual } from "../../actions/upgrade.js";

import { trackPaywallView } from "../../actions/tracker";

// i18n
import { useTranslation } from "react-i18next";

// Icon
import growChartIcon from "../images/grow-chart-icon.svg";

// Style
import "./UpgradeButton.css";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const trackButtonClick = () => {
  IntercomAPI("trackEvent", "Click: Corner Upgrade CTA");
};

function shouldShowUpgradeButton(currentPlan) {
  return !currentPlan.annual && currentPlan.name !== "Unicorn" && window.location.pathname !== "/aliscraper";
}

const UpgradeButton = ({ currentPlan, trackPaywallView, showModal, trackOnClick }) => {
  const { t } = useTranslation();
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  const renderCtaText = () => {
    if (["Basic", "Starter"].includes(currentPlan.name)) {
      return t("Navigation.UpgradeButton.TryPro");
    } else if (["Professional", "Promotional"].includes(currentPlan.name) && !currentPlan.annual) {
      return t("Navigation.UpgradeButton.TryEmpire");
    } else if (currentPlan.name === "Empire" && !currentPlan.annual) {
      return t("Navigation.UpgradeButton.TryUnicorn");
    }
  };

  return (
    <Fragment>
      <div data-cy="upgrade-button" className="UpgradeButton__container UpgradeButton__rightAlign">
        {currentPlan.name && shouldShowUpgradeButton(currentPlan) ? (
          <button
            onClick={() => {
              trackButtonClick(trackPaywallView);
              trackOnClick && trackOnClick();
              track("upgrade__corner-upgrade-btn--clicked", {}, { refreshAttemptId: true });
              showModal("UPGRADE_MODAL", {
                referrerPage: "navigation",
                referrerContext: "experimental",
                upgradeStep: "viewed_all_plans"
              });
            }}
            className="UpgradeButton"
          >
            <img src={growChartIcon} alt="Grow Chart Icon" />
            <p>{renderCtaText()}</p>
          </button>
        ) : null}
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    currentPlan: state.settings.currentPlan,
    annualIsChecked: state.upgrade.annualIsChecked
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, isAnnual, trackPaywallView }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpgradeButton);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/UpgradeButton.js