// Libs
import ApiCall from "../utils/apiCall";
import { browserHistory } from "react-router";

// Actions
import { setAlertMessage } from "../actions";
import { showModal, closeModal } from "./ui";
import { getListingDetail } from "newDropshipperApp/module/shared/listings";
import { updatePaywallView } from "../actions/tracker";

// Module
import { createPlanCharge } from "../newDropshipperApp/module/store/planCharges";
import { createSubscription } from "../newDropshipperApp/module/store/subscriptions";

// Utils
import { postUpgradeTrackingEvents } from "../newDropshipperApp/utils/trackingEvents/upgradeEvents";

export const UPGRADE_URL = "UPGRADE_URL";
export const UPGRADE_ERROR = "UPGRADE_ERROR";
export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";
export const IS_UPGRADING = "IS_UPGRADING";
export const IS_ANNUAL = "IS_ANNUAL";
export const MODAL_UPGRADE_TYPE = "MODAL_UPGRADE_TYPE";

export function handleUpgradeRequest(planID, planName, tracker, plan, listing) {
  return function(dispatch, getState) {
    // State from Redux store
    const { paymentProvider, dropshipperData } = getState().settings;
    const { annualIsChecked } = getState().upgrade;
    const { eventId } = getState().eventTracker;

    // This function will be triggered after the upgrade.
    const showUpgradeSuccessModal = ({ subscriptionId }) => {
      postUpgradeTrackingEvents({ plan, subscriptionId, listing });

      localStorage.removeItem("landing_page_signup");

      dispatch(modalClose());
      dispatch(isUpgrading(false));

      if (plan.alias === "Promotional") {
        plan.alias = "Pro";
      }

      if ((paymentProvider === "shopify_payment" && !annualIsChecked) || paymentProvider === "wix_payment") {
        return;
      }
      // Post Upgrade Annual AB test
      else if (
        paymentProvider === "chargebee_payment" &&
        !annualIsChecked &&
        plan.trial_days - dropshipperData.trial_days_used > 0
      ) {
        dispatch(showModal("ANNUAL_PROMOTION_MODAL", { plan }));
      } else {
        dispatch(showModal("UPGRADE_SUCCESS", { plan }));
      }
    };

    // Building the requestPayload to be send to createPlanCharge() and createSubscription() actions
    const requestPayload = {
      plan_id: planID,
      tracking_plan_upgrade: {
        ...tracker
      }
    };

    dispatch(
      updatePaywallView({
        eventId,
        upgradeStep: "process_upgrade"
      })
    );

    if ((paymentProvider === "shopify_payment" && !annualIsChecked) || paymentProvider === "wix_payment") {
      dispatch(createPlanCharge(requestPayload));
    } else {
      dispatch(createSubscription(requestPayload, showUpgradeSuccessModal));
    }
  };
}

export function updatePlanChargeReason(upgradeReasons, upgradeComment) {
  return function(dispatch) {
    ApiCall.post(`/stores/update_plan_charge_reason`, {
      upgrade_reasons: upgradeReasons,
      upgrade_comment: upgradeComment
    })
      .then(async () => {
        dispatch(closeModal());

        const isPathnameSearchPage = window.location.pathname === "/search";
        const listingIDToBeAddedToImportList = localStorage.getItem("listing_id_to_be_added_to_import_list");

        if (listingIDToBeAddedToImportList) {
          localStorage.removeItem("listing_id_to_be_added_to_import_list");

          if (!isPathnameSearchPage) {
            browserHistory.push("/search");
          }

          try {
            const listingDetailsResult = await getListingDetail(listingIDToBeAddedToImportList);
            dispatch(showModal("LISTING_DETAIL_MODAL", { listing: listingDetailsResult.json }));
          } catch (err) {
            console.log(err); // failed to fetch
            // TODO: better error handling, follow up from https://github.com/spocket-co/dropshipper-app/pull/1410#discussion_r607343498
          }
        } else {
          !isPathnameSearchPage && browserHistory.push("/search");
        }
      })
      .catch(error => {
        dispatch(setAlertMessage(error.json.errors, "error"));
      });
  };
}

export function isAnnual(isAnnual) {
  return {
    type: IS_ANNUAL,
    payload: {
      annualIsChecked: isAnnual
    }
  };
}

export function isUpgrading(isUpgrading) {
  return {
    type: IS_UPGRADING,
    payload: {
      isUpgrading: isUpgrading
    }
  };
}

export function upgradeUrl(json) {
  return {
    type: UPGRADE_URL,
    payload: {
      url: json.confirmation_url
    }
  };
}

export function upgradeError(json) {
  return {
    type: UPGRADE_ERROR,
    payload: {
      error: json.message
    }
  };
}

export function openUpgradeModal(type) {
  return function(dispatch) {
    dispatch(modalOpen());
    dispatch(modalUpgradeType(type));
  };
}

export function modalUpgradeType(type) {
  return {
    type: MODAL_UPGRADE_TYPE,
    payload: {
      modalUpgradeType: type
    }
  };
}

export function modalOpen() {
  return {
    type: MODAL_OPEN,
    payload: {
      modalOpen: true
    }
  };
}

export function closeUpgradeModal() {
  return function(dispatch) {
    dispatch(modalClose());
  };
}

export function modalClose() {
  return {
    type: MODAL_CLOSE,
    payload: {
      modalOpen: false
    }
  };
}



// WEBPACK FOOTER //
// ./src/actions/upgrade.js