// Libs
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";

// Actions
import { showModal } from "../../../actions/ui";

// Components
import Container from "../Container";
import Countdown from "../../../components/_Shared/Countdown/Countdown";

// Style
import "./Promotion.css";
import { gaEvent } from "../../utils/trackEvents";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const Promotion = ({ showModal, timer, trialDaysPlan }) => {
  const { t } = useTranslation();
  const [isTheCountdownOver, setIsTheCountdownOver] = useState(false);
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  const openUpgradeModal = () => {
    const eventName = isTheCountdownOver
      ? "upgrade__promo-banner-without-time--clicked"
      : "upgrade__promo-banner-with-time--clicked";
    track(eventName, {}, { refreshAttemptId: true });
    showModal("UPGRADE_MODAL", {
      referrerPage: "product_search",
      referrerContext: "special_offer",
      upgradeStep: "viewed_all_plans"
    });

    window.location.pathname === "/search" &&
      gaEvent({
        category: "search page",
        action: "upgrade button clicked (free trial banner)"
      });
  };

  const trialDaysNormalizer = days => {
    if (days >= 30) {
      return t("Promotion.TrialDaysNormalizer.30days");
    } else if (days === 28) {
      return t("Promotion.TrialDaysNormalizer.28days");
    } else if (days === 21) {
      return t("Promotion.TrialDaysNormalizer.21days");
    } else if (days === 14) {
      return t("Promotion.TrialDaysNormalizer.14days");
    } else if (days === 7) {
      return t("Promotion.TrialDaysNormalizer.7days");
    } else if (days === 1) {
      return t("Promotion.TrialDaysNormalizer.1day");
    } else {
      return t("Promotion.TrialDaysNormalizer.Days", { value: days });
    }
  };

  return (
    <Container onClick={() => openUpgradeModal()}>
      <div className="Promotion__container" data-cy="upgradePromotionBanner">
        <div className="Promotion__title">
          {!trialDaysPlan && 
            <p className="Promotion__text">{t("Promotion.TrialDaysPlan.Title")}</p>}

          {trialDaysPlan > 0 && 
            <p className="Promotion__text">{t("Promotion.TrialDaysPlan.Text", { value: trialDaysNormalizer(trialDaysPlan) })}</p>}
          <button className="Promotion__button">{t("Promotion.Button")}</button>
        </div>
        {!isTheCountdownOver && (
          <Countdown
            countdownEnds={() => setIsTheCountdownOver(true)}
            splitTime
            showDays={false}
            showHours={false}
            endDate={timer}
          />
        )}
      </div>
    </Container>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Promotion);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/onboarding/Promotion.js