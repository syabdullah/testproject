// Libs
import React, { useEffect, Fragment, useContext } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import moment from "moment";

// Actions
import { showModal } from "../../../actions/ui";
import { getStore } from "../../../newDropshipperApp/module/store";
import { getAllOffers } from "../../../newDropshipperApp/module/store/offers";
import { trackDowngradeStep } from "../../../newDropshipperApp/module/downgradeStep";

// Components
import CreditCard from "../../_Shared/CreditCard";
import { Button } from "../../../newDropshipperApp/spocketUI";

// Context
import { UserContext } from "contexts/UserContext";

// Utils
import { isCurrentPlanAnnual, isCurrentPlanPaid } from "../../../utils/features";
import { setChurnReminder } from "../../../newDropshipperApp/module/store/churnReminder";
import { Trans, useTranslation } from "react-i18next";
import { ChargebeeCardManagement } from "../../../newDropshipperApp/component/ChargebeeCardManagement";
import { useSpocketAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const PaymentTab = ({
  getStore,
  getAllOffers,
  showModal,
  offerStatus,
  activeUpgradeType,
  trackDowngradeStep,
  currentSubscription,
  storeHasBeenPausedOnce,
  setChurnReminder,
  paymentProvider
}) => {
  const { t } = useTranslation();
  const { track, uuid } = useSpocketAnalytics();
  const userContext = useContext(UserContext);

  useEffect(() => {
    document.title = t("PaymentTab.Document.Title");
    getStore();
    getAllOffers();
  }, []);

  const trialOfferEndDate = () => {
    if (!offerStatus) {
      return {};
    }

    const { trial_end_at, updated_at } = currentSubscription;
    const currentDate = moment();
    const anchorDate = trial_end_at ? trial_end_at : updated_at;
    const anchorDateDiff = moment(offerStatus.created_at).diff(anchorDate, "days", true);

    const offerEndDateByAnchorDate = moment(anchorDate)
      .add(anchorDateDiff, "days")
      .add(60, "days")
      .format("MMMM Do");

    const offerEndDateByTrialEndAt = moment(trial_end_at)
      .add(60, "days")
      .format("MMMM Do");

    const offerEndDate =
      trial_end_at > offerStatus.created_at ? offerEndDateByTrialEndAt : offerEndDateByAnchorDate;

    return {
      formatted: offerEndDate,
      isOfferEnded: currentDate > offerEndDate
    };
  };

  const fiftyOffOfferEndDate = () => {
    if (!offerStatus) {
      return {};
    }

    const { updated_at } = currentSubscription;
    const currentDate = moment();
    const anchorDate = updated_at;
    const anchorDateDiff = moment(offerStatus.created_at).diff(anchorDate, "days", true);

    const offerEndDateByAnchorDate = moment(anchorDate)
      .add(anchorDateDiff, "days")
      .add(90, "days")
      .format("MMMM Do");

    const offerEndDate = offerEndDateByAnchorDate;

    return {
      formatted: offerEndDate,
      isOfferEnded: currentDate > offerEndDate
    };
  };

  const renderPauseStoreAccordion = () => {
    if (!isCurrentPlanAnnual() && activeUpgradeType === "stripe") {
      return (
        <div className="Settings__payment-tab-accordion-line Settings__payment-tab-accordion-container">
          <div className="Settings__payment-tab-accordion-line__title">
            {t("PaymentTab.AccordionItem.Label.PauseYourPlan")}
          </div>
          {storeHasBeenPausedOnce ? (
            <div>
              <div className="Settings__payment-tab-accordion-line__subtitle">
                {t("PaymentTab.AccordionItem.Label.StoreHasBeenPaused")}
              </div>

              <Button variant="basic" disabled>
                {t("PaymentTab.AccordionItem.Button.PauseYourPlan")}
              </Button>
            </div>
          ) : (
            <div>
              <div className="Settings__payment-tab-accordion-line__subtitle">
                {t("PaymentTab.AccordionItem.Tooltip.PauseStore")}
              </div>

              <Button
                variant="basic"
                onClick={() => {
                  trackDowngradeStep("has_clicked_to_pause_store");
                  showModal("PAUSE_STORE_MODAL");
                }}
              >
                {t("PaymentTab.AccordionItem.Button.PauseYourPlan")}
              </Button>
            </div>
          )}
        </div>
      );
    }
  };

  const isTheChurnOfferCreated = () => {
    return offerStatus && offerStatus.created_at.length > 0;
  };

  const isTheChurnOfferActive = () => {
    /**
     * isTheChurnOfferCreate === false; That means it was not redeemed yet.
     * offerStatus.resource_id === currentSubscription.id ; That means the store is under an
     * existing offer.
     * trialOfferEndDate().isOfferEnded === false; That means the offer date has expired.
     */

    return (
      isTheChurnOfferCreated() === true &&
      offerStatus &&
      offerStatus.resource_id === currentSubscription.id &&
      trialOfferEndDate().isOfferEnded === false
    );
  };

  const currentChurnOfferText = () => {
    if (offerStatus.offer_type === "churn_2_month_free") {
      return (
        <Fragment>
          You are under a <strong>60 days free trial</strong> plan if isn’t for for you, cancel before{" "}
          {trialOfferEndDate().formatted} and you won’t get charged.
        </Fragment>
      );
    } else if (offerStatus.offer_type === "fifty_off_3_months") {
      return (
        <Fragment>
          Your plan is <strong>50% off for the next 3 months.</strong> You'll be back to the full price plan
          after {fiftyOffOfferEndDate().formatted}.
        </Fragment>
      );
    }
  };

  const renderDowngradeAccordion = () => {
    return (
      <div className="Settings__payment-tab-accordion-line Settings__payment-tab-accordion-container">
        <div className="Settings__payment-tab-accordion-line__title">
          {t("PaymentTab.AccordionItem.Label.ChangeYourPlan")}
        </div>
        <div className="Settings__payment-tab-accordion-line__subtitle">
          {isTheChurnOfferActive() === true && currentChurnOfferText()}
        </div>
        <Button
          data-cy="downgrade-plan-button"
          variant="basic"
          onClick={() => {
            const downgradeAttemptId = uuid();
            track("plan_downgrade", { downgrade_attempt_id: downgradeAttemptId });
            userContext.setStoreInfo("downgradeAttemptId", downgradeAttemptId);
            trackDowngradeStep("has_clicked_to_close_store");
            showModal("CONFIRM_PASSWORD_MODAL", { downgradeAttemptId });
          }}
        >
          {t("PaymentTab.AccordionItem.Button.Downgrade")}
        </Button>
      </div>
    );
  };

  const renderRemindMeLaterAccordion = () => {
    if (activeUpgradeType === "wix") return;

    const { churn_reminder_enabled } = currentSubscription;
    if (churn_reminder_enabled) return;

    return (
      <div className="Settings__payment-tab-accordion-line Settings__payment-tab-accordion-container Settings__payment-tab-accordion-container-dark">
        <div className="Settings__payment-tab-accordion-line__title">
          {t("PaymentTab.AccordionItem.Label.RemindMeLater")}
        </div>
        <div className="Settings__payment-tab-accordion-line__subtitle">
          <Trans i18nKey="PaymentTab.AccordionItem.Tooltip.RemindMeLater">
            Keep my benefits and remind me{" "}
            <strong>{{ daysBefore: t("PaymentTab.AccordionItem.Tooltip.RemindMeLater.3DaysBefore") }}</strong>{" "}
            my membership renews
          </Trans>
        </div>

        <Button
          onClick={() => {
            setChurnReminder();
            showModal("REMIND_ME_LATER_STORE_MODAL");
          }}
        >
          {t("PaymentTab.AccordionItem.Button.RemindMeLater")}
        </Button>
      </div>
    );
  };

  const renderAccordion = () => {
    if (isCurrentPlanPaid() && !isCurrentPlanAnnual() && activeUpgradeType !== "wix") {
      return (
        <Fragment>
          <hr />
          <Accordion data-cy="change-your-plan">
            <AccordionItemWrap title={t("PaymentTab.AccordionItem.PauseChangeYourPlan")}>
              <div className="Settings__payment-tab-actions">
                {renderRemindMeLaterAccordion()}
                {renderPauseStoreAccordion()}
                {renderDowngradeAccordion()}
              </div>
            </AccordionItemWrap>
          </Accordion>
        </Fragment>
      );
    }
  };

  return (
    <div>
      <h5 className="settings__subtitle header-tip">
        {t("PaymentTab.Title.Billing")}
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="default-tooltip">{t("PaymentTab.Tooltip.Billing")}</Tooltip>}
        >
          <span className="info-tip">!</span>
        </OverlayTrigger>
      </h5>
      <hr />
      <h4>Credit card for Order Billing</h4>
      <CreditCard stripeApiKey={process.env.REACT_APP_STRIPE_KEY2} type="v2" />
      <hr />
      {paymentProvider === "chargebee_payment" && (
        <Fragment>
          <h4>Credit card for Subscription Billing</h4>
          <ChargebeeCardManagement />
          <hr />
        </Fragment>
      )}
      {renderAccordion()}
    </div>
  );
};

const AccordionItemWrap = ({ children, title }) => {
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>{title}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>{children}</AccordionItemPanel>
    </AccordionItem>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { showModal, getStore, getAllOffers, trackDowngradeStep, setChurnReminder },
    dispatch
  );
}

function mapStateToProps(state) {
  const { dropshipperData, activeUpgradeType, currentSubscription, paymentProvider } = state.settings;

  const offerStatus = state.store.offers.allOffers[0];

  return {
    currentSubscription: currentSubscription,
    activeUpgradeType: activeUpgradeType || "",
    offerStatus: offerStatus,
    allOffers: state.store.offers.allOffers,
    storeHasBeenPausedOnce: dropshipperData.has_been_paused_once || "",
    isTheChurnOfferCreated: offerStatus && offerStatus.created_at.length > 0,
    paymentProvider
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentTab);



// WEBPACK FOOTER //
// ./src/components/Settings/PaymentTab/index.js