// React & Redux
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

// Libs
import moment from "moment-timezone";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useTranslation } from "react-i18next";

// Components
import Steps from "./onboarding/Steps";
import Promotion from "./onboarding/Promotion";
import StickyPromotionBar from "./onboarding/StickyPromotionBar";

const Onboarding = ({ currentPlan, trialDaysUsed, trialDaysPlan }) => {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  useScrollPosition(({ currPos }) => {
    setScrollY(currPos.y);
  });

  const getEndTime = () => {
    const date = moment
      .tz(localStorage.getItem("created_at"), "America/Los_Angeles")
      .add(30, "m")
      .format();
    return new Date(date).getTime();
  };

  const renderSteps = () => {
    return <Steps title={t("Onboarding.Steps.Title")} subtitle={t("Onboarding.Steps.Subtitle")} />;
  };

  const renderPromotion = () => {
    if (trialDaysUsed < trialDaysPlan) {
      return (
        <Fragment>
          <Promotion timer={getEndTime()} trialDaysPlan={trialDaysPlan - trialDaysUsed} />
          {scrollY < -200 && (
            <StickyPromotionBar timer={getEndTime()} trialDaysPlan={trialDaysPlan - trialDaysUsed} />
          )}
        </Fragment>
      );
    } else {
      return <Fragment>{trialDaysPlan === 0 && renderSteps()}</Fragment>;
    }
  };

  // They see the upgrade banner
  // If they are upgraded, they see the onboarding process
  const renderOnboarding = () => {
    if (currentPlan !== "Basic") {
      return renderSteps();
    } else {
      return renderPromotion();
    }
  };

  return <Fragment>{renderOnboarding()}</Fragment>;
};

function mapStateToProps(state) {
  return {
    currentPlan: state.settings.currentPlan.name,
    trialDaysUsed: state.settings.dropshipperData.trial_days_used,
    trialDaysPlan: state.store.plans.trialDaysPlan
  };
}

export default connect(
  mapStateToProps,
  null
)(Onboarding);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Onboarding.js