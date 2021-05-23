// Libs
import React, { Fragment, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Sentry from "@sentry/browser";

// Components
import { Button } from "../spocketUI";
import ModalWrapper from "../../components/_Shared/ModalWrapper";
import { default as Loadable } from "../../components/_Shared/commonLoadable";

// Actions
import { updatePaywallView } from "../../actions/tracker";
import { isAnnual, handleUpgradeRequest } from "../../actions/upgrade";
import { createPayPalCharge } from "../module/store/paypal/paymentSubscribe";
import { createWixCharge } from "../module/store/wix/paymentSubscribe";
import { setAlertMessage } from "../../actions";

// Assets
import visa from "../images/visa.svg";
import lock from "../images/icon-lock.svg";
import master from "../images/mastercard.svg";
import paypal from "../images/icon-paypal.svg";
import checkmark from "../images/icon-checkmark.svg";
import radioSelected from "../images/radio-selected.svg";
import chartIcon from "../../assets/chart-small-icon.svg";
import radioUnselected from "../images/radio-unselected.svg";
import americanExpress from "../images/icon-american-express.svg";
import checkGreyIcon from "../../assets/check-grey-icon.svg";
import padlockGreyIcon from "../../assets/padlock-grey-icon.svg";

// Utils
import { addDaystoLongDateFormat } from "../../utils/date";
import { getTranslatedPlans } from "../../utils/translatePlanNames";
import { formatErrorMessage } from "../../utils/formatErrorMessage";

// Hooks
import { useChargebeeCard } from "../../hooks/useChargebeeCard";
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

// Styles
import "./UpgradeConfirmationModal.css";
import { ChargebeeCardInput } from "./ChargebeeCardInput";

const DEFAULT_PAYMENT_PROVIDER = "chargebee_payment";

const ChargebeeAgreements = styled.div`
  margin-top: 16px;
`;

const ChargebeeCheckbox = styled.div`
  margin-top: 16px;
  overflow: auto;
  .inputWrapper {
    float: left;
    width: 20px;
  }
  .textWrapper {
    float: left;
    width: calc(100% - 20px);
    label {
      margin-top: 4px;
      font-size: 12px;
      font-weight: 300;
    }
  }
`;

const UpgradeConfirmationModal = ({
  eventId,
  tracker,
  isAnnual,
  allPlans,
  isUpgrading,
  usedTrialDays,
  paymentProvider,
  annualIsChecked,
  stripeCustomerId,
  createPayPalCharge,
  createWixCharge,
  proratedEmpireCost,
  isCurrentPlanAnnual,
  handleUpgradeRequest,
  stripeTaxRates,
  dataModal: { planName, isAnnual: isPlanClickedAnnual, listing },
  setAlertMessage
}) => {
  const { t } = useTranslation();
  const monthlyIsChecked = !annualIsChecked;
  const { track: upgradeTrack } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  const isShopifyAnnual = paymentProvider === "shopify_payment" && annualIsChecked;

  // Chargebee
  const chargebeeCard = useChargebeeCard();
  const [isChargebeeCardEditing, setChargebeeCardIsEditing] = useState(false);
  const [agreementPolicyChecked, setAgreementPolicyChecked] = useState(false);
  const [agreementTermsChecked, setAgreementTermsChecked] = useState(false);

  const selectedPlan = (annual = annualIsChecked) => {
    return allPlans.find(plan => {
      return plan.name === planName && plan.annual === annual;
    });
  };

  const taxRates = annual => {
    // returns an empty array if it's not a stripe payment provider
    if (paymentProvider !== "chargebee_payment") return [];
    if (stripeTaxRates === undefined) return [];

    let { price_plan } = selectedPlan(annual);

    // if the plan is annual let's return the price paid per month
    if (annual) price_plan = price_plan / 12;

    return stripeTaxRates.map(taxRate => {
      const value = price_plan * (taxRate.percentage / 100);
      return parseFloat(value.toFixed(2));
    });
  };

  const fullMonthlyPlanPrice = price_plan => {
    // sums all taxes
    const totalTaxRates = taxRates(false).reduce((total, num) => total + num, 0);
    return (price_plan + totalTaxRates).toFixed(2);
  };

  const fullYearlyPlanPrice = price_plan => {
    // sums all taxes
    const totalTaxRates = taxRates(true).reduce((total, num) => total + num, 0);
    // but since the taxRates function returns the monthly price we need to multiply it
    // by 12 ( months)
    return (price_plan + totalTaxRates * 12).toFixed(2);
  };

  const createCreditCardEventSubmit = () => {
    if (paymentProvider === "chargebee_payment" || isShopifyAnnual) {
      if (isChargebeeCardEditing || chargebeeCard.currentPaymentMethod === null) {
        return chargebeeCard
          .createPaymentMethod()
          .then(() => {
            const eventName =
              chargebeeCard.currentPaymentMethod === null
                ? "upgrade__no-credit-card-added"
                : "upgrade__existing-credit-card-added";
            upgradeTrack(eventName);
            upgradeTrack("upgrade__plan--submit", {
              subscription_type: "chargebee"
            });
            return upgradeToTier();
          })
          .catch(e => {
            const errMessage = formatErrorMessage(e);
            Sentry.captureException(`Chargebee Card Error - ${errMessage}`);
            upgradeTrack("upgrade__credit-card--error", { error: errMessage });
            const alertMessage =
              e.message === "Invalid Form"
                ? "Please make sure to correctly fill the fields and try again"
                : "Internal error";
            setAlertMessage(alertMessage, "error");
          });
      } else {
        upgradeTrack("upgrade__plan--submit", {
          subscription_type: "chargebee"
        });
      }
      return upgradeToTier();
    } else if (paymentProvider === "wix_payment") {
      upgradeTrack("upgrade__plan--submit", {
        subscription_type: "wix"
      });
      return createWixCharge(selectedPlan().id);
    } else if (paymentProvider === "stripe_payment") {
      upgradeTrack("upgrade__plan--submit", {
        subscription_type: "paypal"
      });
      return createPayPalCharge(selectedPlan().id);
    } else if (paymentProvider === "shopify_payment") {
      upgradeTrack("upgrade__plan--submit", {
        subscription_type: "shopify"
      });
    }
    return upgradeToTier();
  };

  const upgradeToTier = () => {
    handleUpgradeRequest(
      selectedPlan().id,
      selectedPlan().name,
      { ...tracker, event_id: eventId },
      selectedPlan(),
      listing
    );
  };

  const hideItForShopifyPayment = component => {
    if ((paymentProvider === "shopify_payment" && !annualIsChecked) || paymentProvider === "wix_payment") {
      return null;
    } else {
      return component;
    }
  };

  const renderHeaderModal = () => {
    return (
      <Fragment>
        <ModalWrapper.Header>
          <div className="UpgradeConfirmationModal__header">
            <img src={chartIcon} alt="chart" />
            <p className="UpgradeConfirmationModal__header--text">
              {t("UpgradeConfirmationModal.Header.Title")}
              {getTranslatedPlans(planName)}
            </p>
          </div>
        </ModalWrapper.Header>
      </Fragment>
    );
  };

  const renderMonthlyTab = () => {
    const { price } = selectedPlan(false);
    return (
      <div className="UpgradeConfirmationModal__billing-tab">
        <div className="UpgradeConfirmationModal__billing-tab-info">
          <img src={!annualIsChecked ? radioSelected : radioUnselected} alt="radio" />
          <div>
            {t("UpgradeConfirmationModal.MonthlyTab.RateType")}
            <span>
              {price}
              {t("UpgradeConfirmationModal.MonthlyTab.RateFrequency")}
            </span>
            <div className="UpgradeConfirmationModal__billing-tab-info-tax-rates">
              {renderTaxRates(false)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthlyPanel = () => {
    const { trial_days } = selectedPlan(false);
    const trialDays = trial_days - usedTrialDays;

    return bulletPoints(trialDays);
  };

  const bulletPoints = trialDays => {
    return (
      <div className="UpgradeConfirmationModal__monthly-info">
        <div>
          {trialDays > 0 && (
            <Fragment>
              <img src={checkmark} alt="checkmark" />
              {t("UpgradeConfirmationModal.BulletPoints.Trial.Initial")}
              <strong>
                {t("UpgradeConfirmationModal.BulletPoints.Trial.BeforeNumber")} {trialDays}{" "}
                {t("UpgradeConfirmationModal.BulletPoints.Trial.AfterNumber")}
              </strong>
              {t("UpgradeConfirmationModal.BulletPoints.Trial.Final")}
            </Fragment>
          )}
        </div>

        <div>
          {trialDays > 0 ? (
            <Fragment>
              <img src={checkmark} alt="checkmark" />
              {t("UpgradeConfirmationModal.BulletPoints.FirstBill")}
              <strong> {addDaystoLongDateFormat(trialDays, t("Config.MomentJs.Locale"), true)}</strong>
            </Fragment>
          ) : (
            <Fragment>
              <img src={checkmark} alt="checkmark" />
              {t("UpgradeConfirmationModal.BulletPoints.FirstBillNoTrial")}
            </Fragment>
          )}
        </div>

        <div>
          <Fragment>
            <img src={checkmark} alt="checkmark" />
            {t("UpgradeConfirmationModal.BulletPoints.Recurrence")}
          </Fragment>
        </div>
      </div>
    );
  };

  const renderYearlyTab = () => {
    const { price, discount_percentage } = selectedPlan(true);

    return (
      <div className="UpgradeConfirmationModal__billing-tab">
        <div className="UpgradeConfirmationModal__billing-tab-info">
          <img src={annualIsChecked ? radioSelected : radioUnselected} alt="radio" />
          <div>
            {t("UpgradeConfirmationModal.YearlyTab.RateType")}
            <span>
              {price}
              {t("UpgradeConfirmationModal.YearlyTab.RateFrequency")}
            </span>
            <div className="UpgradeConfirmationModal__billing-tab-info-tax-rates">{renderTaxRates(true)}</div>
          </div>
        </div>

        <div className="UpgradeConfirmationModal__yearly-discount">
          {discount_percentage > 0 &&
            `${discount_percentage}% ${t("UpgradeConfirmationModal.YearlyTab.Discount")}`}
        </div>
      </div>
    );
  };

  const renderTaxRates = annual => {
    return taxRates(annual).map(taxRate => {
      return (
        <span>
          + ${taxRate.toFixed(2)}/{annual ? t("UpgradeConfirmationModal.TaxRates.Period") : ""}{" "}
          {t("UpgradeConfirmationModal.TaxRates.Text")}
        </span>
      );
    });
  };

  const renderYearlyPanel = () => {
    const { price, price_plan: yearlyPlanPrice, discount_percentage } = selectedPlan(true);
    const { price_plan: monthlyPlanPrice } = selectedPlan(false);
    const finalMonthlyPlanPrice = fullMonthlyPlanPrice(monthlyPlanPrice);
    const finalYearlyPlanPrice = fullYearlyPlanPrice(yearlyPlanPrice);

    return (
      <Fragment>
        {planName !== "Starter" && (
          <Fragment>
            <div className="UpgradeConfirmationModal__yearly-info">
              <div className="UpgradeConfirmationModal__yearly-info-details">
                {t("UpgradeConfirmationModal.YearlyPanel.PayNow")}
                <span>
                  {price}
                  {t("UpgradeConfirmationModal.YearlyPanel.PerMonth")}
                </span>
                <span className="UpgradeConfirmationModal__yearly-info-tax-rates">
                  {renderTaxRates(true)}
                </span>
              </div>
              <div className="UpgradeConfirmationModal__yearly-info-total">
                {proratedEmpireCost.price_formatted
                  ? proratedEmpireCost.price_formatted
                  : `$${finalYearlyPlanPrice}`}
              </div>
            </div>
            <div className="UpgradeConfirmationModal__yearly-saving">
              <strong>
                {t("UpgradeConfirmationModal.YearlyPanel.Savings")}$
                {parseInt(finalMonthlyPlanPrice * 12 - finalYearlyPlanPrice, 10)}
                {t("UpgradeConfirmationModal.YearlyPanel.Period")}
              </strong>
              {", "}
              {t("UpgradeConfirmationModal.YearlyPanel.EquivalentInitial")}
              <strong>
                {" "}
                {discount_percentage}
                {t("UpgradeConfirmationModal.YearlyPanel.EquivalentFinal")}
              </strong>
            </div>
            <div className="UpgradeConfirmationModal__yearly-warning">
              <ul>
                <li>{t("UpgradeConfirmationModal.YearlyPanel.Warning.Trial")}</li>
                <li>{t("UpgradeConfirmationModal.YearlyPanel.Warning.Charge")}</li>
              </ul>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };

  const renderCreditCardTab = () => {
    return (
      <Tab>
        <div className="UpgradeConfirmationModal__payment-tab">
          <img src={radioSelected} alt="radioSelected" />
          <div className="UpgradeConfirmationModal__payment-tab-info">
            {t("UpgradeConfirmationModal.CreditCardTab.Info")}
            <div className="UpgradeConfirmationModal__payment-tab-cards">
              <img src={visa} alt="Visa" />
              <img src={master} alt="Master" />
              <img src={americanExpress} alt="American Express" />
            </div>
          </div>
        </div>
      </Tab>
    );
  };

  const renderPayPalTab = () => {
    if (paymentProvider === "shopify_payment" && monthlyIsChecked) {
      return null;
    }
    const selected = paymentProvider === "stripe_payment";
    return (
      <Tab data-selected={selected} data-cy="paypal-tab">
        <div
          onClick={() => {
            upgradeTrack("upgrade__plan--submit", {
              subscription_type: "paypal"
            });
            createPayPalCharge(selectedPlan().id);
          }}
          className="UpgradeConfirmationModal__payment-tab"
        >
          <img src={selected ? radioSelected : radioUnselected} alt="Radio Unselected" />
          <div className="UpgradeConfirmationModal__payment-tab-info">
            {t("UpgradeConfirmationModal.PayPalTab.Info")}
            <img src={paypal} alt="paypal" />
          </div>
        </div>
      </Tab>
    );
  };

  const renderPaymentSectionTitle = () => {
    if (
      paymentProvider === "stripe_payment" ||
      !((paymentProvider === "shopify_payment" && !annualIsChecked) || paymentProvider === "wix_payment")
    ) {
      return (
        <div className="UpgradeConfirmationModal__section-name  mt-30">
          <span>2</span>
          {t("UpgradeConfirmationModal.PaymentSection.Details")}
          <img src={lock} alt="lock" />
        </div>
      );
    }
  };

  const renderCheckoutButton = () => {
    const { trial_days } = selectedPlan(false);
    const trialDays = trial_days - usedTrialDays;

    return (
      <Button
        variant="primaryBig"
        onClick={() => createCreditCardEventSubmit()}
        disabled={
          (paymentProvider === "chargebee_payment" || isShopifyAnnual) &&
          (!agreementPolicyChecked || !agreementTermsChecked)
        }
      >
        {annualIsChecked === false && trialDays > 0 ? (
          <span>{t("UpgradeConfirmationModal.CheckoutButton.FreeTrial")}</span>
        ) : (
          `${t("UpgradeConfirmationModal.CheckoutButton.Upgrade")}${
            planName === "Professional" ? "Pro" : planName
          }`
        )}
      </Button>
    );
  };

  const renderFooter = () => {
    return (
      <Fragment>
        <div className="UpgradeConfirmationModal__footer_information">
          <div>
            <img src={checkGreyIcon} alt="Check Icon" />
            <span>
              <div>{t("UpgradeConfirmationModal.FooterTestA.Info1.Top")}</div>
              <div>{t("UpgradeConfirmationModal.FooterTestA.Info1.Bottom")}</div>
            </span>
          </div>
        </div>
        <div className="UpgradeConfirmationModal__footer_information">
          <div>
            <img src={padlockGreyIcon} alt="Padlock Icon" />
            <span>
              <div>{t("UpgradeConfirmationModal.FooterTestA.Info2.Top")}</div>
              <div>{t("UpgradeConfirmationModal.FooterTestA.Info2.Bottom")}</div>
            </span>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderChargebeeAgreements = () => (
    <ChargebeeAgreements>
      <ChargebeeCheckbox>
        <div className="inputWrapper">
          <input
            id="agreement-policy"
            type="checkbox"
            className="form-check-input"
            value={agreementPolicyChecked}
            onClick={() => setAgreementPolicyChecked(!agreementPolicyChecked)}
          />
        </div>
        <div className="textWrapper">
          <label className="form-check-label" for="agreement-policy">
            By clicking the “Claim my free trial” button below, you agree to our{" "}
            <a
              rel="noopener noreferrer"
              href="https://help.spocket.co/en/articles/3018492-what-is-spocket-s-plan-subscription-refund-policy"
              target="_blank"
            >
              Refund
            </a>{" "}
            &{" "}
            <a
              rel="noopener noreferrer"
              href="https://help.spocket.co/en/articles/2644101-how-do-i-cancel-my-subscription"
              target="_blank"
            >
              Cancellation Policy
            </a>, and allow{" "}
            <strong>
              Spocket Inc. automatically continue your membership and charge the monthly subscription fee to
              your payment method until you cancel. You may cancel at any time during the free trial period to
              avoid future charges.
            </strong>
          </label>
        </div>
      </ChargebeeCheckbox>
      <ChargebeeCheckbox>
        <div className="inputWrapper">
          <input
            id="agreement-terms"
            type="checkbox"
            className="form-check-input"
            value={agreementTermsChecked}
            onClick={() => setAgreementTermsChecked(!agreementTermsChecked)}
          />
        </div>
        <div className="textWrapper">
          <label className="form-check-label" for="agreement-terms">
            <strong>
              I agree to{" "}
              <Link target="_blank" to="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link target="_blank" to="/privacy">
                Privacy Policy
              </Link>
            </strong>
          </label>
        </div>
      </ChargebeeCheckbox>
    </ChargebeeAgreements>
  );

  const renderPaymentProviderCard = () => {
    const cardInputsMap = {
      chargebee_payment: (
        <div>
          <ChargebeeCardInput
            card={chargebeeCard}
            isEditing={isChargebeeCardEditing}
            setIsEditing={isEditing => {
              setChargebeeCardIsEditing(isEditing);
              if (isEditing) {
                upgradeTrack("upgrade__existing-credit-card-update-btn--clicked");
              }
            }}
          />
          {renderChargebeeAgreements()}
        </div>
      )
    };
    return cardInputsMap[paymentProvider] || cardInputsMap[DEFAULT_PAYMENT_PROVIDER];
  };

  const renderCreditCardTabPanel = () => {
    if (paymentProvider === "wix_payment") {
      return null;
    }
    return (
      <TabPanel>
        <div className="UpgradeConfirmationModal__credit-card-info">{renderPaymentProviderCard()}</div>
      </TabPanel>
    );
  };

  const renderModalFooter = () => {
    return (
      <div className="UpgradeConfirmationModal__footer">
        {renderCheckoutButton()}
        {paymentProvider !== "chargebee_payment" && (
          <div className="UpgradeConfirmationModal__agreement">
            {t("UpgradeConfirmationModal.Agreement.Intro")}
            <Link target="_blank" to="/terms">
              {t("UpgradeConfirmationModal.Agreement.Terms")}
            </Link>
            ,{" "}
            <Link target="_blank" to="/privacy">
              {t("UpgradeConfirmationModal.Agreement.Privacy")}
            </Link>
            ,{" "}
            <a
              href="https://help.spocket.co/en/articles/3018492-what-is-spocket-s-plan-subscription-refund-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {t("UpgradeConfirmationModal.Agreement.Refund")}
            </a>
            {t("UpgradeConfirmationModal.Agreement.Middle")}
            <a
              href="https://help.spocket.co/en/articles/2644101-how-do-i-cancel-my-subscription"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {t("UpgradeConfirmationModal.Agreement.Cancelation")}
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <ModalWrapper
      size="small"
      className="UpgradeConfirmationModal__container"
      backdropClassName="UpgradeConfirmationModal__backdrop"
    >
      <Loadable active={isUpgrading || false}>
        {/* START -  Header Modal */}
        {renderHeaderModal()}
        {/* End -  Header Modal */}

        <ModalWrapper.Body>
          {/* START -  Billing Section */}
          <div className="UpgradeConfirmationModal__section-name">
            <span>1</span>
            {t("UpgradeConfirmationModal.Body.Title")}
          </div>
          <Tabs
            selectedIndex={+annualIsChecked}
            onSelect={tabIndex => {
              const isAnnualValue = !!tabIndex;
              isAnnual(isAnnualValue);
              const selectedOption = isAnnualValue ? "annual" : "monthly";
              upgradeTrack("upgrade__annual-monthly-toggle--clicked", { selected_option: selectedOption });
            }}
            className="UpgradeConfirmationModal__billing-section"
          >
            <TabList>
              <Tab disabled={isCurrentPlanAnnual || isPlanClickedAnnual}>{renderMonthlyTab()}</Tab>
              {planName !== "Starter" && <Tab>{renderYearlyTab()}</Tab>}
            </TabList>

            <TabPanel />
            <TabPanel>{renderYearlyPanel()}</TabPanel>
          </Tabs>
          {/* END -  Billing Section */}

          {!annualIsChecked && renderMonthlyPanel()}

          {/* START -  Payment Section */}

          <Fragment>
            {renderPaymentSectionTitle()}
            <Tabs selectedIndex={0} className="UpgradeConfirmationModal__payment-section">
              <TabList>
                {/* START -  Credit Card Tab */}
                {(paymentProvider === "chargebee_payment" || isShopifyAnnual) &&
                  hideItForShopifyPayment(renderCreditCardTab())}
                {/* END -  Credit Card Tab */}

                {/* START -  PayPal Tab */}
                {["stripe_payment", "chargebee_payment", "shopify_payment"].includes(paymentProvider) &&
                  renderPayPalTab()}
                {/* END -  PayPal Tab */}
              </TabList>

              {(paymentProvider === "chargebee_payment" || isShopifyAnnual) &&
                hideItForShopifyPayment(renderCreditCardTabPanel())}
            </Tabs>
          </Fragment>
          {renderModalFooter()}
          {/* END -  Payment Section */}
        </ModalWrapper.Body>
      </Loadable>
      {renderFooter()}
    </ModalWrapper>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlertMessage,
      isAnnual,
      handleUpgradeRequest,
      updatePaywallView,
      createPayPalCharge,
      createWixCharge
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { store, upgrade, eventTracker, settings } = state;

  return {
    dataModal: state.ui.data,
    isUpgrading:
      store.planCharges.isFetching ||
      store.subscriptions.isFetching ||
      upgrade.isUpgrading ||
      store.paypal.paymentSubscribe.isFetching,
    annualIsChecked: state.ui.data.isAnnual ? true : upgrade.annualIsChecked,
    allPlans: store.plans.allPlans,
    tracker: {}, // sharedComponents.tracker, more info: https://vendchat.slack.com/archives/CDUQHQX0F/p1617657264290100?thread_ts=1617655866.286500&cid=CDUQHQX0F
    eventId: eventTracker.eventId,
    paymentProvider: settings.paymentProvider,
    proratedEmpireCost: settings.proratedEmpireCost,
    usedTrialDays: settings.dropshipperData.trial_days_used,
    isCurrentPlanAnnual: state.settings.currentPlan.annual,
    stripeCustomerId: state.settings.stripeCustomerId,
    stripeTaxRates: settings.dropshipperData.stripe_tax_rates
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpgradeConfirmationModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/UpgradeConfirmationModal.js