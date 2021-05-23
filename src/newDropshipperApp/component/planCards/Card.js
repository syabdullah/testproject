// Libs
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import ReactPixel from "react-facebook-pixel";
import * as Sentry from "@sentry/browser";
import { IntercomAPI } from "react-intercom";
import { useTranslation } from "react-i18next";

// Icons
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import iconCheck from "../../images/icon-check.svg";

// Actions
import { updatePaywallView } from "../../../actions/tracker";

// Utils
import { trackQuoraEvent } from "../../../utils/eventTracker";
import { trackAdsByRedux } from "../../../newDropshipperApp/utils/utm";
import { getTranslatedPlans } from "utils/translatePlanNames";
import {
  checkEachStringLengthAndReturnClassName,
  checkLanguageAndReturnClassName
} from "utils/i18n/languageUtils";

// Static Data
import plansData from "newDropshipperApp/utils/staticData/plansData";

// Style
import "./Card.css";
import { gaEvent } from "../../utils/trackEvents";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const themes = {
  white: "plan-card__container-white-theme",
  purple: "plan-card__container-purple-theme plan-card__container-purple-theme-variant-type-b"
};

const Card = ({
  plan,
  theme,
  order,
  eventId,
  allPlans,
  currentPlan,
  isMobileUser,
  upgradeToTier,
  disabledButton,
  updatePaywallView,
  annualToggleIsChecked
}) => {
  /**
   * Function that returns monthly or yearly based in current plan <Card/>
   * We are using the selectedPlan() function to select the rigth "type" of plan
   *
   * ex: planType().discount -> plan.type[monthly || yearly].discount
   *
   * @returns  String
   */
  const selectedPlan = () => {
    if (plan.name === "Basic") {
      return "monthly";
    } else {
      return annualToggleIsChecked ? "yearly" : "monthly";
    }
  };

  const { t, i18n } = useTranslation();
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  // The sentence "5 MONTHS OFF" was creating layout issues, so we use an util to count the letters and add a class, if necessary
  // Save variable with both words and replace spaces
  const discountSentence = (t("Card.Title.PeriodPlural") + " " + t("Card.Title.Off")).replace(/\s/g, "*");
  // If string is too long, use util to get class name which will be used on the div
  const stringSizeClass = checkEachStringLengthAndReturnClassName(
    discountSentence,
    13,
    ["da", "es", "nl", "pt", "tr"],
    i18n.language
  );

  const planType = () => {
    return plan.type[selectedPlan()];
  };

  /**
   * Render tooltip component
   *
   * @returns  {ReactElement}
   */
  const tooltip = text => {
    return (
      <OverlayTrigger overlay={<Tooltip id="advances-tooltip-card">{text}</Tooltip>}>
        <span className="plan-card__information" />
      </OverlayTrigger>
    );
  };

  /**
   * Trigger the plan_clicked analytics track
   *
   * @param  { object } planClicked
   */
  const trackPlanClicked = planClicked => {
    const upgradeTrackProperties = {
      plan_clicked_id: getPlanId({ planName: planClicked.name, isAnnual: annualToggleIsChecked }),
      current_plan_id: getPlanId({ planName: currentPlan.name, isAnnual: annualToggleIsChecked })
    };
    track("upgrade__plan-card--clicked", upgradeTrackProperties);
  };

  /**
   * Trigger the upgrade plan function upgradeToTier() and some trackers
   *
   * @param  { object } plan
   * @returns  {null}
   */
  const onUpgradeClick = plan => {
    trackPlanClicked(plan);
    try {
      // Facebook Pixel
      ReactPixel.trackCustom(`buttonUpgrade${plan.name}`);
      trackAdsByRedux({
        from: "facebook",
        action: `buttonUpgrade${plan.name}UTM`
      });

      // Google Analytics
      gaEvent({
        category: "Upgrade",
        action: `buttonUpgrade${plan.name}`
      });

      window.location.pathname === "/settings/plan" &&
        gaEvent({
          category: "settings page",
          action: "Event upgrade button clicked (setting price plans)"
        });

      trackAdsByRedux({
        from: "google",
        category: "Upgrade",
        action: `buttonUpgrade${plan.name}UTM`
      });

      IntercomAPI(`Upgrade button clicked - ${plan.name}`);
      trackQuoraEvent("InitiateCheckout");
      updatePaywallView({
        eventId,
        planId: getPlanId({ planName: plan.name, isAnnual: annualToggleIsChecked }),
        upgradeStep: "viewed_single_plan"
      });
    } catch (err) {
      Sentry.addBreadcrumb({ category: "error", message: err, level: "error" });
    } finally {
      upgradeToTier(plan.name);
    }
  };

  // We receive the discount as a percentage, we need to convert it to a number of months and return the appropriate pluralized text
  const convertPercentageToMonths = percent => {
    const months = Math.round((percent * 12) / 100);
    const remainingText = months === 1 ? t("Card.Title.PeriodSingular") : t("Card.Title.PeriodPlural");
    return `${months} ${remainingText}`;
  };

  const getPlanId = ({ planName, isAnnual }) => {
    const plan =
      allPlans.find(plan => plan.name === planName && plan.annual === isAnnual) ||
      allPlans.find(plan => plan.name === "Basic");
    if (!plan) return;
    return plan.id;
  };

  // We need to extract numbers from strings to show information in different languages correctly
  const extractNumbers = string => {
    return string.replace(/\D/g, "");
  };

  const renderDescriptionVariantType = () => {
    const oneLinerByPlan = {
      Starter: t("Card.DescriptionVariantType.Starter"),
      Professional: t("Card.DescriptionVariantType.Professional"),
      Empire: t("Card.DescriptionVariantType.Empire"),
      Unicorn: t("Card.DescriptionVariantType.Unicorn")
    };

    // Only show the remaining trial days text when there is a planType().description
    const remainingTrialDays = extractNumbers(planType().description);

    // Get class if user has specific language
    const languageClass = checkLanguageAndReturnClassName(
      ["de", "es", "fr", "it", "pt", "nl", "tr"],
      i18n.language
    );

    return (
      <div
        className="plan-card__upgrade-description plan-card__upgrade-description-variant-type-b"
        data-cy="planDescription"
      >
        <span className={`plan-card-upgrade-one-liner ${languageClass}`}>{oneLinerByPlan[plan.name]}</span>
        <div className="plan-card__price-container">
          <div className="plan-card__upgrade-annual-strike">
            {annualToggleIsChecked &&
              plan.name === "Professional" && <s>$49/{t("Card.DescriptionVariantType.Period")}</s>}
            {annualToggleIsChecked &&
              plan.name === "Empire" && <s>$99/{t("Card.DescriptionVariantType.Period")}</s>}
            {annualToggleIsChecked &&
              plan.name === "Unicorn" && <s>$299/{t("Card.DescriptionVariantType.Period")}</s>}
          </div>

          <div className="plan-card__price">
            <span>$</span>
            {t("Card.DescriptionVariantType.PricePeriod", { value: extractNumbers(planType().price) })}
          </div>
        </div>
        {remainingTrialDays && (
          <div>
            {annualToggleIsChecked
              ? t("Card.DescriptionVariantType.AnnualDescription", { value: remainingTrialDays })
              : t("Card.DescriptionVariantType.MonthlyDescription", { value: remainingTrialDays })}
          </div>
        )}
        {renderButton()}
      </div>
    );
  };

  const renderButton = () => {
    const remainingTrialDays = extractNumbers(planType().description);
    // If user has remainingTrialDays, show Try it for free button, otherwise show Start now
    const monthlyButton = remainingTrialDays
      ? t("Card.DescriptionVariantType.Button.Try")
      : t("Card.DescriptionVariantType.Button.Start");
    // Yearly buttons are always Start now
    const buttonText = annualToggleIsChecked ? t("Card.DescriptionVariantType.Button.Start") : monthlyButton;
    return (
      <div>
        <button
          onClick={() => onUpgradeClick(plan)}
          disabled={disabledButton || isMobileUser}
          className="plan-card__upgrade-button plan-card__upgrade-button-variant-b"
          data-cy={plan.name !== "Basic" && "planUpgradeButton"}
        >
          {/* If the button is disabled it means that is current plan */}
          <span data-cy="plan-card-button">
            {disabledButton ? t("Card.DescriptionVariantType.CurrentPlan") : buttonText}
          </span>
        </button>
      </div>
    );
  };

  const renderFeaturesVariantType = () => {
    const staticPlanFeatures = plansData();
    const staticPlan = staticPlanFeatures.find(staticPlan => staticPlan.name === plan.name);
    const features = typeof staticPlan === "object" ? staticPlan.features : plan.features;

    return (
      <div className="plan-card__features-container plan-card__features-container-variant-b">
        {features.map(feature => (
          <div className="plan-card__feature">
            {feature.type === "special" && <img src={iconCheck} alt="check" />}
            <span className="plan-card__feature-text">
              <strong>{feature.text.highlight}</strong> {feature.text.description}
            </span>
            {feature.tootip && tooltip(feature.tootip)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Fragment>
      <div style={{ order: order }} className={`plan-card__container ${themes[theme]}`} data-cy="plan-card">
        {/* START - Title section */}
        <div className="plan-card__title">
          <div className="plan-card__title-plan">{getTranslatedPlans(plan.name)}</div>
          {annualToggleIsChecked &&
            planType().discount && (
              <div className={`plan-card__title-stamp ${stringSizeClass}`}>
                <p>
                  {convertPercentageToMonths(Number(plan.type.yearly.discount.split("%")[0]))}{" "}
                  {t("Card.Title.Off")}
                </p>
              </div>
            )}
        </div>
        {/* END - Title section */}

        {/* START - Button and description section */}
        <div className="plan-card__upgrade">
          {renderDescriptionVariantType()}
          {renderFeaturesVariantType()}
          {/* END - Button and description section */}
        </div>
      </div>
    </Fragment>
  );
};

Card.propTypes = {
  plan: PropTypes.object.isRequired,
  upgradeToTier: PropTypes.func.isRequired,
  annualToggleIsChecked: PropTypes.bool.isRequired,
  currentPlan: PropTypes.string.isRequired,
  theme: PropTypes.string,
  order: PropTypes.number
};

Card.defaultProps = {
  theme: "white",
  disabledButton: false
};

function mapStateToProps(state) {
  return {
    allPlans: state.store.plans.allPlans,
    eventId: state.eventTracker.eventId,
    currentPlan: state.settings.currentPlan
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updatePaywallView
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/planCards/Card.js