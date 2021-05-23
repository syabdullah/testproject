/* eslint-disable no-undef */
import "./style.css";
// React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";
import { Toggle } from "newDropshipperApp/spocketUI/components/Toggle";
import { IntercomAPI } from "react-intercom";
import { withTranslation } from "react-i18next";

// Components
import { default as Loadable } from "../_Shared/commonLoadable";
import PlanCards from "newDropshipperApp/component/PlanCards";
import { AlertMessage } from "newDropshipperApp/spocketUI";

// Actions
import { setAlertMessage } from "actions";
import { showModal } from "actions/ui";
import { handleUpgradeRequest, isAnnual } from "actions/upgrade.js";
import { getPaymentSettings, fetchEmpireProrationPrice } from "actions/settings";

// Utils
import ApiCall from "utils/apiCall";
import {
  isCurrentPlanEmpire,
  transpilerPlanAPI,
  isCurrentPlanAnnual,
  isCurrentPlanProfessionalAnnual
} from "utils/features";
import { gaEvent } from "newDropshipperApp/utils/trackEvents";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const PlansWrapper = props => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  return <Plans {...props} track={track} />;
};

class Plans extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  state = {
    isLoading: true,
    gettingPlans: true,
    plans: []
  };

  componentWillUnmount() {
    window.location.pathname.includes("/settings") && this.props.isAnnual(false);
    IntercomAPI("trackEvent", "Exit: Plans page");
  }

  upgradeToTier(planName) {
    const { tracker, eventId } = this.props;
    const selectedPlan = this.state.plans.find(
      plan => plan.name === planName && plan.annual === this.props.annualIsChecked
    );

    // TODO: Improve this process so we don't have to call after setState
    this.setState(null, () => {
      this.props.handleUpgradeRequest(
        selectedPlan.id,
        selectedPlan.name,
        { ...tracker, event_id: eventId },
        selectedPlan
      );
    });
  }

  showCreditCardModal(planName) {
    this.props.showModal("PLAN_UPGRADE_CREDIT_CARD", {
      onClick: () => this.upgradeToTier(planName),
      planName,
      isAnnual: this.props.annualIsChecked,
      listing: this.props.dataModal === undefined ? undefined : this.props.dataModal.listing
    });
  }

  onPlanUpgradeButtonClick = planName => {
    gaEvent({
      category: "Upgrade",
      action: `Upgrade ${planName}`
    });
    this.showCreditCardModal(planName);
  };

  async componentDidMount() {
    const { location } = this.props;
    // Currently only used for one_month_trial
    if (location && location.query && ["one_month_trial"].includes(location.query.offer_type)) {
      await this.findOrCreateOffer(location.query.offer_type);
    }

    await this.props.getPaymentSettings();
    await this.getPlans();
    await this.props.fetchEmpireProrationPrice();
    this.setState({}, () => this.dataLayerPush());

    // TODO: `isAnnual()` is a bad name for a function that creates side effects. Prefix `is` (or `has`) is used for getters that return boolean values.
    isCurrentPlanAnnual() && this.props.isAnnual(true);
  }

  dataLayerPush = () => {
    window.dataLayer.push({ event: "optimize.activate" });
  };

  findPlanToUpgradeTo = planName => {
    return this.state.plans.find(plan => {
      return plan.name === planName;
    });
  };

  getPlans() {
    return ApiCall.get("/stores/plans").then(({ json, status }) => {
      this.setState({ plans: transpilerPlanAPI(json.serialised_plans) }, () =>
        this.setState({ gettingPlans: false })
      );
    });
  }

  findOrCreateOffer = async offer_type => {
    return ApiCall.post("/stores/offers", { offer_type });
  };

  findPlan(planName, isAnnual) {
    return this.state.plans.filter(plan => plan.name === planName && plan.annual === isAnnual);
  }

  // We receive the discount as a percentage, we need to convert it to a number of months and return the appropriate pluralized text
  convertPercentageToMonths = percent => {
    const months = Math.round((percent * 12) / 100);
    const remainingText =
      months === 1
        ? this.props.t("Plans.ToggleSection.DiscountSingular")
        : this.props.t("Plans.ToggleSection.DiscountPlural");
    return `${months} ${remainingText}`;
  };

  onToggleClick() {
    const isAnnualValue = !this.props.annualIsChecked;
    this.props.isAnnual(isAnnualValue);
    const selectedOption = isAnnualValue ? "annual" : "monthly";
    this.props.track("upgrade__settings-annual-monthly-toggle--clicked", { selected_option: selectedOption });
  }

  renderToggleSection() {
    if (isCurrentPlanEmpire() && isCurrentPlanAnnual()) {
      return null;
    } else {
      const { t, maxDiscountPercentage, annualIsChecked } = this.props;

      return (
        <Row>
          <Col md={12}>
            {maxDiscountPercentage && (
              <div className="plans__card_annual_plan">
                <span className="plans__card_annual_plan_regular_text">
                  {t("Plans.ToggleSection.Monthly")}
                </span>

                <span style={{ margin: "0 15px 0 15px" }}>
                  <Toggle onClick={() => this.onToggleClick()} initialState={annualIsChecked} />
                </span>

                <span className="plans__card_annual_plan_regular_text">
                  {t("Plans.ToggleSection.Yearly")}
                </span>
                <div className="plans__card_annual_plan_bold_text">
                  {t("Plans.ToggleSection.DiscountInitial")}{" "}
                  {` ${this.convertPercentageToMonths(maxDiscountPercentage)} `}
                  {t("Plans.ToggleSection.DiscountFinal")}
                </div>
              </div>
            )}
          </Col>
        </Row>
      );
    }
  }

  renderProrationCost = () => {
    const currentPlan = this.findPlan("Professional", true)[0] || {};
    if (isCurrentPlanProfessionalAnnual() && this.props.proratedEmpireCost.price_formatted) {
      return (
        <div className="proration-text">
          {this.props.t("Plans.ProrationCost.TextInitial")} {currentPlan.full_price}
          {this.props.t("Plans.ProrationCost.TextFinal")} {this.props.proratedEmpireCost.price_formatted}
        </div>
      );
    }
  };

  renderIconContainer(img, alt) {
    return (
      <div className="plan__section-icon-container">
        <img src={img} alt={alt} />
      </div>
    );
  }

  render() {
    const { activeUpgradeType, t } = this.props;
    //TODO add 'mock' to constants file and used constant for comparison
    const isMobileUser = activeUpgradeType === "mock";

    return (
      <Loadable active={this.state.gettingPlans} background="rgba(255, 255, 255, 0.95)">
        {isMobileUser && <AlertMessage text={t("Plans.MobileWarning")} backgroundColor="#FFBB00" />}
        {this.renderToggleSection()}
        {this.renderProrationCost()}
        {!this.state.gettingPlans && (
          <PlanCards upgradeToTier={this.onPlanUpgradeButtonClick} isMobileUser={isMobileUser} />
        )}
      </Loadable>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleUpgradeRequest,
      setAlertMessage,
      getPaymentSettings,
      showModal,
      isAnnual,
      fetchEmpireProrationPrice
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    url: state.upgrade.url,
    error: state.upgrade.error,
    tracker: {}, //state.sharedComponents.tracker, more info: https://vendchat.slack.com/archives/CDUQHQX0F/p1617657264290100?thread_ts=1617655866.286500&cid=CDUQHQX0F
    annualIsChecked: state.upgrade.annualIsChecked,
    eventId: state.eventTracker.eventId,
    proratedEmpireCost: state.settings.proratedEmpireCost,
    role: state.settings.dropshipperData.role,
    maxDiscountPercentage: state.store.plans.maxDiscountPercentage,
    dropshipperData: state.settings.dropshipperData,
    dataModal: state.ui.data,
    activeUpgradeType: state.settings.activeUpgradeType
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlansWrapper)
);



// WEBPACK FOOTER //
// ./src/components/Plans/index.js