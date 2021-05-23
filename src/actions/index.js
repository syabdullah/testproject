import { browserHistory } from "react-router";
import * as Sentry from "@sentry/browser";

import { updateSettingsFromExternal, fetchDropshipperData } from "./settings";
import ApiCall from "../utils/apiCall";
import { getPlans } from "../newDropshipperApp/module/store/plans";
import { updatePaymentProvider } from "../newDropshipperApp/module/updatePaymentProvider";
import ReactPixel from "react-facebook-pixel";
import { sendUtm } from "../newDropshipperApp/module/store/utm";
import { signupToPartnerStack } from "../newDropshipperApp/module/partnerStack/signup";
import Cookies from "js-cookie";
import { trackPinterestEvent, trackRedditEvent, trackQuoraEvent } from "../utils/eventTracker";
import { getFeatureFlags } from "../newDropshipperApp/module/featureFlags";
import { setPersonalization } from "../newDropshipperApp/module/store/personalization";

// Utils
import { trackAdsByCookie } from "../newDropshipperApp/utils/utm";
import { gaEvent } from "../newDropshipperApp/utils/trackEvents";
import { analytics } from "newDropshipperApp/utils/analytics";

export const SIGN_IN_USER = "SIGN_IN_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";
export const AUTH_MESSAGE_ERROR = "AUTH_MESSAGE_ERROR";
export const AUTH_MESSAGE_SUCCESS = "AUTH_MESSAGE_SUCCESS";
export const AUTH_MESSAGE_CLEAR = "AUTH_MESSAGE_CLEAR";
export const AUTH_USER = "AUTH_USER";
export const MESSAGE_SUCCESS = "MESSAGE_SUCCESS";
export const MESSAGE_INFO = "MESSAGE_INFO";
export const MESSAGE_ERROR = "MESSAGE_ERROR";
export const MESSAGE_CLEAR = "MESSAGE_CLEAR";
export const OPEN_RESET_MODAL = "OPEN_RESET_MODAL";
export const CLOSE_RESET_MODAL = "CLOSE_RESET_MODAL";
export const REGISTER_SHOP = "REGISTER_SHOP";
export const DEREGISTER_SHOP = "DEREGISTER_SHOP";
export const SET_ACTIVE_PLAN = "SET_ACTIVE_PLAN";
export const SET_ACTIVE_SUBSCRIPTION = "SET_ACTIVE_SUBSCRIPTION";
export const SET_STORE_AUTHORIZATION_KEY = "SET_STORE_AUTHORIZATION_KEY";
export const SET_PAYMENT_PROVIDER = "SET_PAYMENT_PROVIDER";
export const SET_ACTIVE_UPGRADE_TYPE = "SET_ACTIVE_UPGRADE_TYPE";

function updateSettingsFromCredentials(credentials) {
  let url = credentials.store_credential.store.name + ".shopify.com";
  let istore_id = null;

  const first_integrated_store = credentials.store_credential.store.integrated_stores
    ? credentials.store_credential.store.integrated_stores[0]
    : [];

  if (first_integrated_store && first_integrated_store.uid) {
    url = first_integrated_store.uid;
    istore_id = first_integrated_store.id;
  }
  return updateSettingsFromExternal({
    url: url,
    integratedStoreId: istore_id,
    storeId: credentials.store_credential.store.id,
    name: credentials.store_credential.dropshipper.name,
    displayName: credentials.store_credential.dropshipper.name,
    active: true,
    currency: credentials.store_credential.store.currency,
    dropshipperCreatedAt: credentials.store_credential.dropshipper.created_at
  });
}

function dispatchAuthError(dispatch, error) {
  if (error.json === undefined) {
    throw error;
  } else {
    dispatch(authMessageError(error.json.message, 0));
  }
}

function handleAuthError(dispatch) {
  return dispatchAuthError.bind(null, dispatch);
}

function trackEventDirectLandingPageEmail() {
  const urlParams = new URLSearchParams(window.location.search);

  /**
   * GH issue -> https://github.com/spocket-co/spocket/issues/5589
   *
   * If id === true, the event will send the action of 'Signup Variant'
   * If id === false, the event will send the action of 'Signup Control'
   * If id === null, we will send the action of 'Signup Original'
   */
  const id = urlParams.get("id");

  if (id === "true") {
    gaEvent({
      category: "Registration",
      action: "Signup Variant"
    });
  } else if (id === "false") {
    gaEvent({
      category: "Registration",
      action: "Signup Control"
    });
  } else if (id === null) {
    gaEvent({
      category: "Registration",
      action: "Signup Original"
    });
  }
}

function trackEventConversions(credentials) {
  const {
    store_credential: { store }
  } = credentials;

  try {
    // BASIC - conversion
    window.gtag("event", "conversion", {
      send_to: "AW-862529334/ksfRCPaAyaIBELbOpJsD",
      value: 0.0,
      currency: "CAD",
      transaction_id: credentials.store_credential.store.id
    });
  } catch (err) {
    console.log(err);
  }

  try {
    // Facebook Pixel - conversion (Signup)
    ReactPixel.trackCustom("Signup");
    trackAdsByCookie({ from: "facebook", action: "SignupUTM" });

    // Pinterest Pixel - conversion (Signup)
    trackPinterestEvent("signup");

    // Reddit Pixel - conversion (Signup)
    trackRedditEvent("SignUp");

    // Quora Pixel - conversion (Signup)
    trackQuoraEvent("CompleteRegistration");

    // Segment - Identify user when they sign up (Signup)
    analytics.identify(store.id, { source: "web" });

    // Segment - conversion (Signup)
    analytics.track("signup_complete", { storeId: store.id, source: "web" });

    // Google Analytics
    const getRegistrationLabel = () => {
      const url = window.location.pathname;

      if (url === "/signup") {
        return "mark-case-study";
      } else if (url === "/winning-products-signup") {
        return "winning-products";
      } else {
        return "";
      }
    };

    gaEvent({
      category: "Registration",
      action: "Signup",
      label: getRegistrationLabel()
    });

    trackEventDirectLandingPageEmail();

    trackAdsByCookie({
      from: "google",
      category: "Registration",
      action: "SignupUTM"
    });
  } catch (err) {
    console.log(err);
  }
}

export function signupShop(credentials) {
  return function (dispatch, getState) {
    setupCredentialStorage(credentials);

    dispatch(signIn());

    if (credentials.store_credential) {
      dispatch(register());
    } else {
      dispatch(deregister());
    }
    dispatch(updateSettingsFromCredentials(credentials));

    if (credentials.action === "signed_up") {
      /**
       * 1 - If the integrated_store array is not empty, it means the user came from Shopify, Woocommerce, Bigcommerce or Wix.
       * 2- If the integrated_store array is empty, it means the user came from direct signup.
       * 3 - If the integrated_store does not exist, it means the user came from social auth.
       */
      const { integrated_stores } = credentials.store_credential.store;
      const integratedStoresLength = integrated_stores.length;

      credentials.topCategories && dispatch(setPersonalization({ categories: [credentials.topCategories] }));

      trackEventConversions(credentials);

      // If there is a spocket_utm cookie the sendUtm() will send it to our db
      dispatch(sendUtm());

      signupToPartnerStack();

      // If the cookie is set to Spocket, we do not run updatePaymentProvider,
      // and instead leave it as stripe_payment
      // If the store is from Wix, we must run updatePaymentProvider and set the
      // user to Wix Payments
      if (
        Cookies.get("location") !== "spocket.co" ||
        (integrated_stores && integratedStoresLength && integrated_stores[0].name === "wix")
      ) {
        dispatch(updatePaymentProvider());
      }

      // Its a direct signup (Email, Google or Facebook).
      // integrated_stores array does not exist, is not an array, or is empty
      if (!Array.isArray(integrated_stores) || !integratedStoresLength) {
        browserHistory.push("/search");
      } else {
        browserHistory.push("/search");
      }

      dispatch(
        messageSuccess(
          "Please confirm your email address using the link in the email we just sent you.",
          true
        )
      );
    } else {
      if (credentials.redirect_to !== undefined) {
        browserHistory.push(credentials.redirect_to);
      } else {
        browserHistory.push("/search");
      }
    }
  };
}

// it sends a token that expires quickly and
// receives a secondary and permanent token
export function exchangeToken(credentials) {
  return function (dispatch) {
    const { action, register_token } = credentials;
    return ApiCall.post("/exchange_token", {
      status: action,
      register_token
    });
  };
}

export function resetPassword(credentials) {
  return function (dispatch) {
    return ApiCall.get("/password/new", {
      email: credentials.email
    })
      .then(({ status, json }) => {
        dispatch(authMessageSuccess(json.message, 0));
        dispatch(closeResetModal());
      })
      .catch(handleAuthError(dispatch));
  };
}

export function changePassword(credentials) {
  return function (dispatch) {
    return ApiCall.patch("/", {
      current_password: credentials.currentPassword,
      password: credentials.password,
      password_confirmation: credentials.passwordConfirmation
    }).then(() => {
      dispatch(signOutUser());
    });
  };
}
export function signInUser(credentials, emailAuthTokenUrl) {
  return function (dispatch) {
    return ApiCall.post("/sign_in", {
      email: credentials.email,
      password: credentials.password,
      auth_token: credentials.auth_token
    })
      .then(({ status, json }) => {
        const {
          store_credential: { store }
        } = json;

        dispatch(authMessageClear());
        setupCredentialStorage(json);
        dispatch(updateSettingsFromCredentials(json));
        dispatch(signIn());
        dispatch(register());
        dispatch(verifyAuth());
        const redirectUrlAfterSignin = localStorage.getItem("redirect_to_url_after_signin");
        if (emailAuthTokenUrl && !redirectUrlAfterSignin) {
          browserHistory.push(emailAuthTokenUrl);
          // This is a workaround to verify if it's a Supplier of the week email.
          emailAuthTokenUrl.includes("supplier_name") && window.location.reload();
        } else {
          redirectUrlAfterSignin
            ? browserHistory.push(redirectUrlAfterSignin)
            : browserHistory.push("/search");
        }
        localStorage.removeItem("redirect_to_url_after_signin");

        // Segment - Identify user when they sign up (Signup)
        analytics.identify(store.id, { source: "web" });
        // Segment - conversion (Signup)
        analytics.track("login_complete", { storeId: store.id, source: "web" });
      })
      .catch(error => {
        credentials.auth_token ? browserHistory.push("/login") : dispatchAuthError(dispatch, error);
      });
  };
}

export function signOutUser(redirect = true) {
  return function (dispatch) {
    return ApiCall.delete("/sign_out").then(({ status, json }) => {
      clearCredentialStorage();
      dispatch(deregister());
      dispatch(signOut());
      window.OneSignal && window.OneSignal.logoutEmail();
      if (redirect) browserHistory.push("/login");
    });
  };
}

export function verify() {
  return function (dispatch) {
    dispatch(verifyAuth());
    dispatch(verifyShop());
    dispatch(getFeatureFlags());
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return ApiCall.get("/verify")
      .then(({ json }) => {
        setupCredentialStorage(json);
        dispatch(getPlans());
        dispatch(updateSettingsFromCredentials(json));
        dispatch(auth());
        dispatch(fetchDropshipperData());
        dispatch(setActivePlan(json.store_credential.store.active_plan));
        dispatch(setActiveSubscription(json.active_subscription));
        dispatch(setStoreAuthorizationKey(json.store_authorization_key));
        dispatch(setPaymentProvider(json.store_credential.store.payment_provider));
        dispatch(setActiveUpgradeType(json.store_credential.store.active_upgrade_type));

        if (localStorage.getItem("force_upgrade") === "true") {
          browserHistory.push("/settings/plan");
        }
      })
      .catch(error => {
        if (error.status) {
          clearCredentialStorage();
          dispatch(signOut());
          browserHistory.push("/login");
        } else {
          throw error;
        }
      });
  };
}

export function verifyShop() {
  return function (dispatch) {
    if (localStorage.getItem("shop_id") === null) {
      dispatch(deregister());
    } else {
      dispatch(register());
    }
  };
}

export function setAlertMessage(message, type, delay = false, goalsTheme = false) {
  return function (dispatch) {
    switch (type) {
      case "success":
        dispatch(messageSuccess(message, delay, goalsTheme));
        break;
      case "info":
        dispatch(messageInfo(message, delay));
        break;
      case "error":
        dispatch(messageError(message, delay));
        break;
      default:
        break;
    }
  };
}

export function connectToStore(storeName, provider) {
  return function (dispatch) {
    return ApiCall.post(`/auth/${provider}/initiate`, {
      store_name: storeName
    }).then(({ status, json }) => {
      dispatch(messageSuccess("Redirecting..."));
      window.location = json.url;
    });
  };
}

// Manage Local Storage
// TODO: put this into redux

export function setupCredentialStorage(credentials) {
  const store_credential = credentials.store_credential;
  const dropshipper = store_credential.dropshipper;
  const store = store_credential.store;
  const integratedStore = store.integrated_stores ? store.integrated_stores[0] : "";

  /*eslint-disable */
  // CUSTOMER.IO SCRIPT
  // Only send this when a user is logged in
  _cio.identify({
    id: dropshipper.id,
    email: dropshipper.email,
    created_at: dropshipper.created_at
  });
  /* eslint-enable */

  const expiresAt = JSON.stringify(10800 + new Date().getTime());
  localStorage.setItem("expires", expiresAt);
  localStorage.setItem("auth_token", credentials.auth_token);
  localStorage.setItem("auth_cable_token", credentials.auth_cable_token);

  localStorage.setItem("role", store_credential.role);

  localStorage.setItem("user_id", store_credential.id);
  localStorage.setItem("user_name", dropshipper.name);
  localStorage.setItem("user_email", dropshipper.email);
  localStorage.setItem("created_at", dropshipper.created_at);
  localStorage.setItem("progress", store_credential.store.progress);
  localStorage.setItem("force_upgrade", store_credential.force_upgrade);

  localStorage.setItem("shop_id", store.id);
  localStorage.setItem("shop_age", store.age);
  localStorage.setItem("shop_url", integratedStore ? integratedStore.url : "");
  localStorage.setItem("integrated_store_id", integratedStore ? integratedStore.id : "");
  localStorage.setItem("integrated_store_name", integratedStore ? integratedStore.name : "");

  const active_plan = store.active_plan;
  localStorage.setItem("annual_plan", active_plan.annual);
  localStorage.setItem("active_plan_name", active_plan.name);
  localStorage.setItem("active_plan_supported_features", JSON.stringify(active_plan.features));

  /* Add user data to Sentry user context info */
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    Sentry.configureScope(scope => {
      scope.setUser({
        user_id: localStorage.getItem("user_id"),
        user_name: localStorage.getItem("user_name"),
        user_email: localStorage.getItem("user_email"),
        shop_id: localStorage.getItem("shop_id"),
        shop_url: localStorage.getItem("shop_url")
      });
    });
  }
}

export function clearCredentialStorage() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("role");
  localStorage.removeItem("active_plan_name");
  localStorage.removeItem("active_plan_supported_features");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");
  localStorage.removeItem("expires");
  localStorage.removeItem("shop_id");
  localStorage.removeItem("shop_url");
  localStorage.removeItem("shop_age");
  localStorage.removeItem("integrated_store_id");
  localStorage.removeItem("announcement_closed");
  localStorage.removeItem("landing_page_signup");
  localStorage.removeItem("language");
}

export function setActivePlan(plan) {
  return {
    type: SET_ACTIVE_PLAN,
    plan
  };
}

export function setActiveSubscription(subscription) {
  return {
    type: SET_ACTIVE_SUBSCRIPTION,
    subscription
  };
}

export function setStoreAuthorizationKey(storeAuthorizationKey) {
  return {
    type: SET_STORE_AUTHORIZATION_KEY,
    storeAuthorizationKey
  };
}

export function setPaymentProvider(paymentProvider) {
  return {
    type: SET_PAYMENT_PROVIDER,
    paymentProvider
  };
}
export function setActiveUpgradeType(activeUpgradeType) {
  return {
    type: SET_ACTIVE_UPGRADE_TYPE,
    activeUpgradeType
  };
}

export function clearAuthMessage() {
  return function (dispatch) {
    dispatch(authMessageClear());
  };
}

export function clearAlertMessage() {
  return function (dispatch) {
    dispatch(messageClear());
  };
}

// Action Creators

export function openResetModal() {
  return {
    type: OPEN_RESET_MODAL
  };
}

export function closeResetModal() {
  return {
    type: CLOSE_RESET_MODAL
  };
}

export function signIn() {
  return {
    type: SIGN_IN_USER
  };
}

export function register() {
  return {
    type: REGISTER_SHOP
  };
}

export function deregister() {
  return {
    type: DEREGISTER_SHOP
  };
}

export function auth() {
  return {
    type: AUTH_USER
  };
}

export function authMessageSuccess(message, delay) {
  return {
    type: AUTH_MESSAGE_SUCCESS,
    payload: {
      message: message,
      delay: delay,
      time: Date.now()
    }
  };
}

export function authMessageError(message, delay) {
  return {
    type: AUTH_MESSAGE_ERROR,
    payload: {
      message: message,
      delay: delay,
      time: Date.now()
    }
  };
}

export function signOut() {
  return {
    type: SIGN_OUT_USER
  };
}

export function messageSuccess(message, delay, goalsTheme) {
  return {
    type: MESSAGE_SUCCESS,
    payload: {
      message: message,
      delay: delay,
      goalsTheme: goalsTheme,
      time: Date.now()
    }
  };
}

export function messageInfo(message, delay) {
  return {
    type: MESSAGE_INFO,
    payload: {
      message: message,
      delay: delay,
      time: Date.now()
    }
  };
}

export function messageError(message, delay) {
  return {
    type: MESSAGE_ERROR,
    payload: {
      message: message,
      delay: delay,
      time: Date.now()
    }
  };
}

export function authMessageClear() {
  return {
    type: AUTH_MESSAGE_CLEAR
  };
}

export function messageClear() {
  return {
    type: MESSAGE_CLEAR
  };
}



// WEBPACK FOOTER //
// ./src/actions/index.js