// React and Redux
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

// Components
import Card from "./planCards/Card";

// Style
import "./PlanCards.css";

const PlanCards = ({
  abTests,
  cardData,
  currentPlan,
  upgradeToTier,
  isCurrentPlanAnnual,
  annualToggleIsChecked,
  isMobileUser
}) => {
  const { i18n } = useTranslation();
  /**
   * Shows the <Card /> that should be shown on each plan
   *
   * @returns  Array
   */
  const getCardsByCurrentPlan = () => {
    // Plan cards views
    // The order of plans into the array matters
    const planCards = ["Starter", "Professional", "Empire", "Unicorn"];
    const sortedPlans = [];

    // Pushing the filtered plans into sortedPlans array
    planCards.forEach(cardName => {
      return sortedPlans.push(...cardData.filter(plan => plan.name === cardName));
    });

    if (currentPlan === "Basic") {
      return sortedPlans;
    } else {
      return sortedPlans.slice(sortedPlans.findIndex(plan => plan.name === currentPlan), sortedPlans.length);
    }
  };

  /**
   * Return the purple <Card /> theme in a specific scenario
   *
   * @param  { String } index
   * @returns  String
   */
  const selectThemeCardByCurrentPlan = index => {
    const cardsLength = getCardsByCurrentPlan().length;
    const theme = "purple";

    if (cardsLength === 4 && index === 2) {
      return theme;
    } else if (cardsLength === 3 && index === 1) {
      return theme;
    } else if (cardsLength === 2 && index === 0) {
      return theme;
    } else if (cardsLength === 1) {
      return theme;
    }
  };

  /**
   * Check if the button should be disabled or not
   *
   * @param  { String } planName
   * @returns  Boolean
   */
  const shouldUpgradeButtonBeDisabled = planName => {
    // Semantic variables
    const isCurrentPlanEqualPlanCardName = currentPlan === planName;
    const isCurrentPlanMonthlyAndAnnualToggleIsNotChecked = !isCurrentPlanAnnual && !annualToggleIsChecked;

    // Conditions
    const firstCondition = isCurrentPlanEqualPlanCardName && isCurrentPlanMonthlyAndAnnualToggleIsNotChecked;

    const secondCondition = isCurrentPlanEqualPlanCardName && isCurrentPlanAnnual;

    const thirdCondition = planName === "Basic";

    // Comparing conditions
    return firstCondition || secondCondition || thirdCondition;
  };

  /**
   * Checking if cardPlan is an annual starter plan
   *
   * @param  { Object } plan
   * @returns  Boolean
   */
  const annualStarterPlan = plan => {
    return plan.name === "Starter" && annualToggleIsChecked;
  };

  /**
   * Checking if the current user plan is an annual starter plan
   *
   * @returns  Boolean
   */
  const isCurrentPlanAnnualStarter = () => {
    return currentPlan === "Starter" && isCurrentPlanAnnual;
  };

  const isReversePricingPlansAbTest = () => {
    const reversePricingPlans = abTests.find(abTest => abTest.name === "Reverse Pricing Plans");

    const reversePricingTestActive = reversePricingPlans !== undefined && reversePricingPlans.test;
    const isEnglish = i18n.language === "en";
    return reversePricingTestActive && isEnglish;
  };

  return (
    <Fragment>
      <div className={`plan-cards__container ${isReversePricingPlansAbTest() ? "plan-cards__reverse" : ""}`}>
        {cardData.length > 0 && (
          <Fragment>
            {getCardsByCurrentPlan().map((plan, index) => {
              // Embracing the <Card /> component into a variable to reuse it
              const cardPlan = (
                <Card
                  annualToggleIsChecked={annualToggleIsChecked}
                  disabledButton={shouldUpgradeButtonBeDisabled(plan.name)}
                  upgradeToTier={upgradeToTier}
                  theme={selectThemeCardByCurrentPlan(index)}
                  plan={plan}
                  isMobileUser={isMobileUser}
                />
              );

              return (
                /**
                 * 1 - Removing Starter Annual plan
                 * 2 - What will happen if a user is currently on the Starter Annual plan?
                 * We'll display it for them until they're not on it anymore.
                 */
                <Fragment>
                  {isCurrentPlanAnnualStarter() ? cardPlan : annualStarterPlan(plan) ? null : cardPlan}
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

PlanCards.propTypes = {
  annualToggleIsChecked: PropTypes.bool.isRequired,
  cardData: PropTypes.array.isRequired,
  currentPlan: PropTypes.string.isRequired,
  isCurrentPlanAnnual: PropTypes.bool.isRequired,
  upgradeToTier: PropTypes.func.isRequired,
  dropshipperData: PropTypes.object,
  featureFlags: PropTypes.string.isRequired,
  isMobileUser: PropTypes.bool
};

function mapStateToProps(state) {
  const { currentPlan } = state.settings;

  return {
    abTests: state.settings.dropshipperData.ab_tests,
    dropshipperData: state.settings.dropshipperData,
    featureFlags: state.featureFlags.featureFlags,
    currentPlan: currentPlan.name,
    cardData: state.store.plans.cardData || [],
    isCurrentPlanAnnual: currentPlan.annual,
    annualToggleIsChecked:
      currentPlan.name === "Empire" && currentPlan.annual ? true : state.upgrade.annualIsChecked
  };
}

export default connect(mapStateToProps)(PlanCards);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/PlanCards.js