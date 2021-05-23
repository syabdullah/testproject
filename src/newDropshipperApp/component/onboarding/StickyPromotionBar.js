// Libs
import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";

// Actions
import { showModal } from "../../../actions/ui";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

// Components
import { BarContainer, PopupContainer, PopupTextContainer, CountdownTheme } from "./StickyPromotionBarStyle";
import Countdown from "../../../components/_Shared/Countdown/Countdown";
import { Button } from "../../spocketUI";
import { Emoji } from "newDropshipperApp/component/Emoji";
import { gaEvent } from "../../utils/trackEvents";

const StickyPromotionBar = ({ showModal, timer, trialDaysPlan, searchPageVersion }) => {
  const { t } = useTranslation();
  const [isTheCountdownOver, setIsTheCountdownOver] = useState(false);
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  const openUpgradeModal = () => {
    track("upgrade__promo-sticky-bar--clicked", {}, { refreshAttemptId: true });
    showModal("UPGRADE_MODAL", {
      referrerPage: "product_search",
      referrerContext: "special_offer",
      upgradeStep: "viewed_all_plans"
    });

    window.location.pathname === "/search" &&
      gaEvent({
        category: "search page",
        action: "event upgrade button clicked (sticky to trial button)"
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

  const renderPopup = () => {
    return (
      <PopupContainer onClick={() => openUpgradeModal()} className="StickyPromotionBar__no-timer">
        <PopupTextContainer>
          <Emoji label="Start" symbol="🌟" />
          <p>
            {t("StickyPromotion.Text")} {trialDaysNormalizer(trialDaysPlan)}
          </p>
        </PopupTextContainer>
        <Button variant="primaryBig">{t("StickyPromotion.Button")}</Button>
      </PopupContainer>
    );
  };

  const renderBar = () => {
    return (
      <BarContainer onClick={() => openUpgradeModal()} className="StickyPromotionBar__timer">
        <PopupTextContainer className="StickyPromotionBar__text">
          <Emoji label="Clock" symbol="⏰" />
          <p>
            {t("StickyPromotion.Text")} {trialDaysNormalizer(trialDaysPlan)}
          </p>
        </PopupTextContainer>
        <CountdownTheme>
          <Countdown
            countdownEnds={() => setIsTheCountdownOver(true)}
            splitTime
            showDays={false}
            showHours={false}
            endDate={timer}
          />
        </CountdownTheme>
        <Button variant="primaryBig">{t("StickyPromotion.Button")}</Button>
      </BarContainer>
    );
  };

  if (!trialDaysPlan) return null;
  return <Fragment>{isTheCountdownOver ? renderPopup() : renderBar()}</Fragment>;
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(StickyPromotionBar);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/onboarding/StickyPromotionBar.js