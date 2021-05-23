import ApiCall from "../utils/apiCall";
import CollectionApi from "../api/Collection";

import { setAlertMessage } from ".";
import { showModal } from "./ui";
import { browserHistory } from "react-router";
import ReactPixel from "react-facebook-pixel";
import { trackQuoraEvent } from "../utils/eventTracker";
import { trackAdsByRedux } from "../newDropshipperApp/utils/utm";
import { gaEvent } from "../newDropshipperApp/utils/trackEvents";

export const SETTINGS_UPDATED_ALL = "SETTINGS_UPDATED_ALL";
export const SETTINGS_UPDATED_PARTIAL = "SETTINGS_UPDATED_PARTIAL";
export const COLLECTIONS_SET = "COLLECTIONS_SET";
export const IS_DOWNGRADING = "IS_DOWNGRADING";
export const DROPSHIPPER_DATA_SUCCESS = "DROPSHIPPER_DATA_SUCCESS";
export const SET_COLLECTION_SEARCH = "SET_COLLECTION_SEARCH";
export const EMPIRE_PRORATION_PRICE_SUCCESS = "EMPIRE_PRORATION_PRICE_SUCCESS";
export const SET_DISABLED_INVOICING = "SET_DISABLED_INVOICING";

export function getSettings() {
  return function(dispatch) {
    return ApiCall.get("/api/settings").then(({ status, json }) => {
      dispatch(allSettingsUpdated(json));
    });
  };
}

export function getCollections(integratedStoreId) {
  return dispatch => {
    CollectionApi.index(integratedStoreId)
      .then(({ json, status }) => {
        dispatch(collectionsSet(json));
      })
      .catch(error => error);
  };
}

export function getPaymentSettings(type) {
  return function(dispatch) {
    const queryParam = type === "v2" ? "?account_source=new" : "";
    return ApiCall.get(`/stripe_integrations/payment_methods${queryParam}`).then(({ status, json }) => {
      if (json.length >= 1) {
        dispatch(partialSettingsUpdated({ stripeCustomerId: true }));
      }
      return { status, json };
    });
  };
}

export function getPricingRuleSettings() {
  return function(dispatch) {
    return ApiCall.get("/stores/pricing_rule").then(({ status, json }) => {
      dispatch(partialSettingsUpdated({ rules: json }));
    });
  };
}

export function updateSettings(values) {
  return function(dispatch) {
    return ApiCall.patch("/api/settings", values)
      .then(({ status, json }) => {
        setAlertMessage(json.message, "success", true);
        dispatch(partialSettingsUpdated(values));
      })
      .catch(({ status, json }) => {
        setAlertMessage(json.message, "error");
      });
  };
}

export function updatePaymentSettings(token, type) {
  return function(dispatch) {
    const queryParam = type === "v2" ? "?account_source=new" : "";
    return ApiCall.post(`/stripe_integrations/payment_methods${queryParam}`, {
      payment_method_id: token
    })
      .then(({ status, json }) => {
        if (status < 300) {
          dispatch(partialSettingsUpdated({ stripeCustomerId: true }));
        }
        dispatch(setAlertMessage("Your Card Has Been Updated Successfully!", "success"));
        // Facebook Pixel - conversion (AddPaymentInfo)
        ReactPixel.track("AddPaymentInfo");

        trackAdsByRedux({
          from: "facebook",
          action: "AddPaymentInfoUTM"
        });

        // Quora Pixel - conversion (AddPaymentInfo)
        trackQuoraEvent("AddPaymentInfo");

        // Google Analytics
        gaEvent({
          category: "Upgrade",
          action: "AddPaymentInfo"
        });

        trackAdsByRedux({
          from: "google",
          category: "Upgrade",
          action: "AddPaymentInfoUTM"
        });
      })
      .catch(error => {
        if (error.status) {
          dispatch(setAlertMessage(error.json.errors.stripe_card[0], "error"));
        } else {
          throw error;
        }
      });
  };
}

export function downgradePlan(cancelReason, storeId, abTest = "") {
  return function(dispatch) {
    dispatch(isDowngrading(true));
    return ApiCall.post(`/stores/${storeId}/plan_downgrade`, {
      cancel_reason: cancelReason,
      cancel_now: true
    })
      .then(() => {
        dispatch(showModal("DOWNGRADE_SUCCESS"));
        // Google Analytics
        gaEvent({
          category: "Billing",
          action: "Downgrade"
        });
        dispatch(isDowngrading(false));
      })
      .catch(error => {
        if (error.status) {
          dispatch(setAlertMessage("An error occurred while cancelled, please contact us!", "error"));
        } else {
          throw error;
        }
        dispatch(isDowngrading(false));
      });
  };
}

export function updateSettingsFromExternal(data) {
  return function(dispatch) {
    dispatch(partialSettingsUpdated(data));
  };
}

function collectionsSet(data) {
  return {
    type: COLLECTIONS_SET,
    data: data
  };
}

function allSettingsUpdated(data) {
  return {
    type: SETTINGS_UPDATED_ALL,
    data: data
  };
}

function partialSettingsUpdated(values) {
  // Needs to match the values in the Reducer!!
  return {
    type: SETTINGS_UPDATED_PARTIAL,
    values: values
  };
}

export function isDowngrading(isDowngrading) {
  return {
    type: IS_DOWNGRADING,
    payload: {
      isDowngrading: isDowngrading
    }
  };
}

export function fetchDropshipperData() {
  return function(dispatch) {
    return ApiCall.get("/data").then(({ status, json }) => {
      dispatch(fetchDropshipperDataSuceess(json));
    });
  };
}

function fetchDropshipperDataSuceess(data) {
  return {
    type: DROPSHIPPER_DATA_SUCCESS,
    data
  };
}

export function setCollectionSearch(status) {
  return {
    type: SET_COLLECTION_SEARCH,
    status
  };
}

export function updateTourStep(step, gotoPlanPage = false) {
  return function(dispatch) {
    return ApiCall.post("/update_step", { step }).then(({ json }) => {
      dispatch(fetchDropshipperDataSuceess(json));
      step === "finished" && gotoPlanPage && browserHistory.push("/settings/plan");
      step === "step_three" && browserHistory.push("/import");
    });
  };
}

export function fetchEmpireProrationPrice() {
  return function(dispatch) {
    return ApiCall.get("/empire_proration_price").then(({ json }) => {
      dispatch(fetchEmpireProrationPriceSuccess(json));
    });
  };
}

function fetchEmpireProrationPriceSuccess(data) {
  return {
    type: EMPIRE_PRORATION_PRICE_SUCCESS,
    data
  };
}

export function setDisabledInvoicing(invoicing) {
  return {
    type: SET_DISABLED_INVOICING,
    invoicing
  };
}



// WEBPACK FOOTER //
// ./src/actions/settings.js