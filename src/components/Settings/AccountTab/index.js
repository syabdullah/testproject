import "./style.css";

import { Col, ControlLabel, FormControl, FormGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";

import { setAlertMessage, signOutUser } from "../../../actions";
import { handleUpgradeRequest } from "../../../actions/upgrade.js";
import ApiCall from "../../../utils/apiCall";
import DisconnectModal from "./DisconnectModal";
import { showModal } from "../../../actions/ui";
import { transpilerPlanAPI, isCurrentPlanAnnual } from "../../../utils/features";

import { getPaymentSettings } from "../../../actions/settings";
import rightArrowIcon from "../../../assets/arrow-right.svg";
import productIcon from "../../../assets/product-icon2.svg";
import crownIcon from "../../../assets/crown-icon.svg";
import lockIcon from "../../../assets/lock-icon2.svg";
import alertIcon from "../../../assets/alert-icon.svg";
import logout from "../../../assets/sign-out-option.svg";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const AccountTabAnalyticWrapper = React.forwardRef((props, ref) => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  return <AccountTab ref={ref} {...props} track={track} />;
});
class AccountTab extends React.Component {
  static propTypes = {
    setAlertMessage: PropTypes.func.isRequired,
    registered: PropTypes.bool
  };

  state = {
    shopConnected: false,
    integratedStoreId: "",
    integratedStoreName: "",
    storeName: "",
    integratedStoreUrl: ["", null],
    isLoading: true,
    gettingPlans: true,
    isAnnual: false,
    plans: []
  };

  handleSignout = () => {
    this.props.showModal("SIGN_OUT", {
      signOut: () => this.props.signOutUser(),
      passwordSet: this.props.passwordSet
    });
  };

  handleShopConnect = () => {
    const { t } = this.props;
    // TODO: Connect the shop
    this.props.setAlertMessage(t("AccountTab.alertFeatureWillBeAddedSoon"), "error");
  };

  handleShopDisconnect = () => {
    const { t } = this.props;
    // TODO: Disconnect the shop
    this.props.setAlertMessage(t("AccountTab.alertFeatureWillBeAddedSoon"), "error");
  };

  componentDidMount() {
    const { t } = this.props;
    this.getStore();
    this.props.getPaymentSettings();
    this.getPlans();
    window.document.title = t("AccountTab.documentTitle");
  }

  updateStore = () => {
    const { t } = this.props;
    if (this.isValidUrl(this.state.integratedStoreUrl[0])) {
      return ApiCall.put("/store", {
        name: this.state.storeName,
        integrated_stores: [
          {
            id: this.state.integratedStoreId,
            url: this.state.integratedStoreUrl[0]
          }
        ]
      })
        .then(({ status, json }) => {
          localStorage.setItem("shop_url", this.state.integratedStoreUrl[0]);
          this.props.setAlertMessage(t("AccountTab.alertAccountSettingsUpdated"), "success");
        })
        .catch(({ status, json }) => {
          this.props.setAlertMessage(json.error, "error");
        });
    } else {
      return new Promise((resolve, reject) => {
        this.props.setAlertMessage(t("AccountTab.alertInvalidShopUrl"), "error");
        resolve();
      });
    }
  };

  getStore = () => {
    ApiCall.get("/store")
      .then(({ status, json }) => {
        this.setState({
          integratedStoreId: json.integrated_stores[0] && json.integrated_stores[0].id,
          integratedStoreName: json.integrated_stores[0] && json.integrated_stores[0].name,
          storeName: json.name,
          integratedStoreUrl: [json.integrated_stores[0] && json.integrated_stores[0].url, null]
        });
      })
      .catch(({ status, json }) => {
        this.props.setAlertMessage(json.error, "error");
      });
  };
  handleFormSubmit = () => {
    return this.updateStore();
  };

  getPlanId = ({ planName, isAnnual }) => {
    const plan =
      this.props.allPlans.find(plan => plan.name === planName && plan.annual === isAnnual) ||
      this.props.allPlans.find(plan => plan.name === "Basic");
    if (!plan) return;
    return plan.id;
  };

  renderSwitchToAnnualPlanButton = planName => {
    const { t, currentPlan } = this.props;
    if (
      !isCurrentPlanAnnual() &&
      planName !== "Basic" &&
      planName !== "Starter" &&
      planName !== "Promotional"
    ) {
      return (
        <button
          onClick={() => {
            this.props.track(
              "upgrade__switch-to-annual--clicked",
              {
                current_plan_id: this.getPlanId({
                  planName: currentPlan ? currentPlan.name : "",
                  isAnnual: currentPlan ? currentPlan.annual : ""
                }),
                plan_clicked_id: this.getPlanId({ planName, isAnnual: true })
              },
              { refreshAttemptId: true }
            );
            this.showCreditCardModal(planName);
          }}
          disabled={!this.props.allPlans}
          className="plan_button account__purple_plan_button"
        >
          <p data-cy="switch-plan-button">{t("AccountTab.buttonSwitchToAnnualPlan")}</p>
          {planName === "Professional" && (
            <p className="account__purple_plan_button--discount">{t("AccountTab.off40Percent")}</p>
          )}
          {planName === "Empire" && (
            <p className="account__purple_plan_button--discount">{t("AccountTab.off30Percent")}</p>
          )}
          {planName === "Unicorn" && (
            <p className="account__purple_plan_button--discount">{t("AccountTab.off45Percent")}</p>
          )}
        </button>
      );
    } else {
      return null;
    }
  };

  renderSellMoreWEmpirePlanButton = planName => {
    const { t, currentPlan } = this.props;
    if (!isCurrentPlanAnnual()) {
      return (
        !["Empire", "Unicorn"].includes(planName) && (
          <button
            onClick={() => {
              this.showCreditCardModal("Empire");
              this.props.track(
                "upgrade__better-plan--clicked",
                {
                  current_plan_id: this.getPlanId({
                    planName: currentPlan ? currentPlan.name : "",
                    isAnnual: currentPlan ? currentPlan.annual : ""
                  }),
                  plan_clicked_id: this.getPlanId({ planName: "Empire", isAnnual: true })
                },
                { refreshAttemptId: true }
              );
            }}
            disabled={!this.props.allPlans}
            className="plan_button account__purple_plan_button"
            data-cy="sell-more-plan-button"
          >
            {t("AccountTab.sellMoreWithEmpirePlan")}{" "}
            <span className="icon pull-right">
              <img src={rightArrowIcon} alt="Right Arrow Icon" />
            </span>
          </button>
        )
      );
    } else {
      return null;
    }
  };

  showCreditCardModal(planName) {
    this.props.showModal("PLAN_UPGRADE_CREDIT_CARD", {
      onClick: () => this.upgradeToTier(planName),
      planName,
      allPlans: this.state.plans,
      isAnnual: true
    });
  }

  getPlans() {
    ApiCall.get("/stores/plans").then(({ json, status }) => {
      this.setState({ plans: transpilerPlanAPI(json.serialised_plans) }, () =>
        this.setState({ gettingPlans: false })
      );
    });
  }

  upgradeToTier(planName) {
    const { tracker, eventId } = this.props;
    const selectedPlan = this.state.plans.find(plan => plan.name === planName && plan.annual === true);

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

  renderPlanButtons(planName) {
    return (
      <div className="buttons-container">
        {this.renderSwitchToAnnualPlanButton(planName)}
        {this.renderSellMoreWEmpirePlanButton(planName)}
      </div>
    );
  }

  outputActiveUntil = (planName, cancelTime) => {
    const { t } = this.props;
    return (
      <div className="mt-5 plan_cancel_date">
        {planName} {t("AccountTab.planActiveUntil")}: {moment.utc(cancelTime).format("MMM Do, YYYY")}
      </div>
    );
  };

  outputPlan = () => {
    const planName = localStorage.getItem("active_plan_name");
    const { cancelTime, t } = this.props;
    switch (planName) {
      case "Basic":
      case "Starter":
      case "Professional":
      case "Special Offer":
      case "Promotional":
        return (
          <div>
            <p className="mt-10 mb-20">
              <span className="account__info-key">{t("AccountTab.yourPlan")}:</span>
              <span className="account__info-value">
                <strong data-cy="account-plan">{planName}</strong> <br />
                {cancelTime && this.outputActiveUntil(planName, cancelTime)}
              </span>
            </p>
            {this.renderPlanButtons(planName)}
          </div>
        );
      case "Unicorn":
      case "Empire":
        return (
          <div>
            <p className="mt-10 mb-20">
              <span className="account__info-key">{t("AccountTab.yourPlan")}:</span>
              <span className="account__info-value">
                <strong>{planName}</strong> <br />
                {cancelTime && this.outputActiveUntil(planName, cancelTime)}
              </span>
            </p>
            {this.renderPlanButtons(planName)}
          </div>
        );
      default:
        return <p>{t("AccountTab.accountNotActive")}</p>;
    }
  };

  isValidUrl(value) {
    return /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/gim.test(value);
  }

  handleFormChanges(e) {
    let listing = this.state.listing;
    listing[e.target.name] = e.target.value;

    this.setState({ listing });
  }

  updateInputValue(e) {
    if (e.target.name === "integratedStoreUrl") {
      if (this.isValidUrl(e.target.value)) {
        this.setState({ integratedStoreUrl: [e.target.value, null] });
      } else {
        this.setState({ integratedStoreUrl: [e.target.value, "error"] });
      }
    } else if (e.target.name === "storeName") {
      this.setState({ storeName: e.target.value });
    }
  }

  renderShopUrl = () => {
    const { t } = this.props;
    const { integratedStoreUrl, integratedStoreName } = this.state;
    // returns null if it's a wix store and has no valid url,
    // a valid url is something with a dot ., a non published store has a https://some-uid
    // but a published store has a valid url, http://some.valid.url.with.a.dot
    if (integratedStoreName === "wix" && !/\./.test(integratedStoreUrl[0])) {
      return null;
    }
    return (
      <FormGroup validationState={integratedStoreUrl[1]}>
        <ControlLabel className="mt-10 mb-10">{t("AccountTab.shopUrl")}</ControlLabel>
        <FormControl
          type="text"
          className="account__edit-url"
          name="integratedStoreUrl"
          value={integratedStoreUrl[0]}
          onChange={e => this.updateInputValue(e)}
        />
      </FormGroup>
    );
  };

  outputShopAssociation = () => {
    const { t } = this.props;
    const userEmail = localStorage.getItem("user_email");
    return (
      <div>
        {this.state.integratedStoreId && (
          <Row>
            <Col md={6}>
              <ControlLabel className="">{t("AccountTab.shopName")}</ControlLabel>
              <FormControl
                type="text"
                className="account__edit-url"
                name="storeName"
                value={this.state.storeName}
                onChange={e => this.updateInputValue(e)}
              />
              {this.renderShopUrl()}
            </Col>

            <Col md={6}>
              <ControlLabel className="">{t("AccountTab.email")}</ControlLabel>
              <FormControl
                type="text"
                className="account__edit-url"
                disabled
                name="userEmail"
                value={userEmail}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col md={12}>
            <div className="mt-10">
              {this.state.integratedStoreId && (
                <p className="info-block">
                  <span className="account__info-key">{t("AccountTab.defaultCurrency")}:</span>
                  <span className="account__info-value">
                    <strong>{this.props.currency && this.props.currency.toUpperCase()}</strong>
                  </span>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="advances-tooltip">{t("AccountTab.tooltipCurrency")}</Tooltip>}
                  >
                    <span className="info-tip account-tip">!</span>
                  </OverlayTrigger>
                </p>
              )}
              {!this.state.integratedStoreId && (
                <div className="mb-30">
                  <p className="mb-20">{t("AccountTab.shopNotConnectedYet")}</p>
                  <button
                    className="plan_button account__purple_plan_button"
                    data-test="plan-button"
                    onClick={() => this.props.showModal("CONNECT_STORE")}
                  >
                    {t("AccountTab.connectYourShop")}
                  </button>
                </div>
              )}

              {this.outputPlan()}

              <DisconnectModal active={this.props.active} onShopDisconnect={this.handleShopDisconnect} />
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  renderProductCountCards = () => {
    const { t } = this.props;
    return (
      <div className="product_counts_section">
        <h5 className="settings__subtitle header-tip" id="account-settings">
          {t("AccountTab.productsImported")}
        </h5>
        {this.outputProductCounts()}
      </div>
    );
  };

  renderProductLock = planName => {
    return planName === "Basic" && <img src={lockIcon} alt="lock" />;
  };

  renderPremiumProductLock = planName => {
    return (planName === "Basic" || planName === "Starter") && <img src={lockIcon} alt="lock" />;
  };

  renderTotalProductNumber = planName => {
    const { t } = this.props;
    return (
      (planName === "Starter" || planName === "Professional" || planName === "Empire") &&
      ` / ${this.props.product_list_total_count} ${t("AccountTab.total")}`
    );
  };

  renderTotalPremiumProductNumber = planName => {
    const { t } = this.props;
    return (
      (planName === "Professional" || planName === "Empire") &&
      ` / ${this.props.product_list_special_total_count} ${t("AccountTab.total")}`
    );
  };

  outputProductCounts = () => {
    const planName = localStorage.getItem("active_plan_name");
    const {
      product_list_count,
      product_list_special_count,
      import_list_count,
      import_list_special_count,
      t
    } = this.props;

    return (
      <div>
        <div className="product_counts_container">
          <div className="count_box">
            <div className="count_box_header">
              <div className="count_box_header_title">
                <img src={productIcon} alt="product" />
                {t("AccountTab.products")}
              </div>
              <div>{this.renderProductLock(planName)}</div>
            </div>
            <div className="count_content">
              {import_list_count + product_list_count}
              {this.renderTotalProductNumber(planName)}
            </div>
          </div>
          <div className="count_box">
            <div className="count_box_header">
              <div className="count_box_header_title">
                <img src={crownIcon} alt="crown" />
                {t("AccountTab.premiumProducts")}
              </div>
              <div>{this.renderPremiumProductLock(planName)}</div>
            </div>
            <div className="count_content">
              {import_list_special_count + product_list_special_count}
              {this.renderTotalPremiumProductNumber(planName)}
            </div>
          </div>
        </div>
        {this.returnCountAlert()}
      </div>
    );
  };

  returnCountAlert = () => {
    const {
      product_list_count,
      product_list_total_count,
      product_list_special_count,
      product_list_special_total_count
    } = this.props;

    if (
      product_list_count >= product_list_total_count ||
      product_list_special_count >= product_list_special_total_count
    ) {
      return (
        <div className="count_alert">
          <img src={alertIcon} className="mr-10" alt="alert" />
          {this.returnCountAlertText()}
        </div>
      );
    }
  };

  returnCountAlertText = () => {
    const {
      product_list_count,
      product_list_total_count,
      product_list_special_count,
      product_list_special_total_count,
      t
    } = this.props;

    if (
      product_list_count >= product_list_total_count &&
      product_list_special_count >= product_list_special_total_count
    ) {
      return t("AccountTab.limitReachedProductsAndPremium");
    } else if (product_list_count >= product_list_total_count) {
      return t("AccountTab.limitReachedProducts");
    } else if (product_list_special_count >= product_list_special_total_count) {
      return t("AccountTab.limitReachedPremium");
    }
  };

  render() {
    const { product_list_total_count, product_list_special_total_count, t } = this.props;

    return (
      <div>
        <h5 className="settings__subtitle header-tip" id="account-settings">
          {t("AccountTab.title")}
        </h5>
        <hr />
        {this.outputShopAssociation()}
        {product_list_special_total_count !== undefined &&
          product_list_total_count !== undefined &&
          this.renderProductCountCards()}
        <div className="mt-40">
          <button className="plan_button account__warning_plan_button" onClick={() => this.handleSignout()}>
            {t("AccountTab.signOut")}
            <img src={logout} alt="logout" />
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlertMessage,
      showModal,
      handleUpgradeRequest,
      getPaymentSettings,
      signOutUser
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    registered: state.auth.registered,
    active: state.settings.active,
    currency: state.settings.currency,
    shopName: state.settings.name,
    shopUrl: state.settings.url,
    url: state.upgrade.url,
    error: state.upgrade.error,
    tracker: {}, // state.sharedComponents.tracker, more info: https://vendchat.slack.com/archives/CDUQHQX0F/p1617657264290100?thread_ts=1617655866.286500&cid=CDUQHQX0F
    eventId: state.eventTracker.eventId,
    cancelTime: state.settings.currentSubscription && state.settings.currentSubscription.to_cancel_at,
    passwordSet: state.settings.dropshipperData.password_set,
    activeUpgradeType: state.settings.activeUpgradeType || "",
    storeHasBeenPausedOnce: state.settings.dropshipperData.has_been_paused_once || "",
    currentSubscription:
      state.settings.currentSubscription === "{}" ? "" : state.settings.currentSubscription,
    import_list_count: state.settings.dropshipperData.import_list_count,
    product_list_count: state.settings.dropshipperData.product_list_count,
    import_list_special_count: state.settings.dropshipperData.import_list_special_count,
    product_list_special_count: state.settings.dropshipperData.product_list_special_count,
    product_list_total_count: state.settings.dropshipperData.product_list_total_count,
    product_list_special_total_count: state.settings.dropshipperData.product_list_special_total_count,
    allPlans: state.store.plans.allPlans,
    currentPlan: state.settings.currentPlan
  };
}

export default withTranslation("translation", { withRef: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
      withRef: true
    }
  )(AccountTabAnalyticWrapper)
);



// WEBPACK FOOTER //
// ./src/components/Settings/AccountTab/index.js