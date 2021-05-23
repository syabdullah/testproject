import { combineReducers } from "redux";
import AuthReducer from "./auth";
import MessageReducer from "./message";
import ShippingReducer from "./shipping";
import UpgradeReducer from "./upgrade";
import SettingsReducer from "./settings";
import UiReducer from "./ui";
import FormsReducer from "./forms";
import EventTrackerReducer from "./tracker";
import { reducer as FormReducer } from "redux-form";

// New Dropshipper App

import salesAnalysis from "../newDropshipperApp/module/analytics/salesAnalysis";
import topSellingProducts from "../newDropshipperApp/module/analytics/topSellingProducts";
import plans from "../newDropshipperApp/module/store/plans";
import planCharges from "../newDropshipperApp/module/store/planCharges";
import paymentSubscribe from "../newDropshipperApp/module/store/paypal/paymentSubscribe";
import paymentSuccess from "../newDropshipperApp/module/store/paypal/paymentSuccess";
import order from "../newDropshipperApp/module/store/order";
import subscriptions from "../newDropshipperApp/module/store/subscriptions";
import signUp from "../newDropshipperApp/module/signup";
import setLoginEmail from "../newDropshipperApp/module/signup";
import thinkificSignin from "../newDropshipperApp/module/thinkific/signin";
import updatePaymentProvider from "../newDropshipperApp/module/updatePaymentProvider";
import stripeIntegrationAccount from "../newDropshipperApp/module/stripeIntegration/account";
import sendInviteEmail from "../newDropshipperApp/module/sendInviteEmail";
import utm from "../newDropshipperApp/module/store/utm";
import listingsCategory from "../newDropshipperApp/module/shared/listingsCategory";
import supplier from "../newDropshipperApp/module/suppliers";
import featureFlags from "../newDropshipperApp/module/featureFlags";
import personalization from "../newDropshipperApp/module/store/personalization";
import promotion from "../newDropshipperApp/module/store/promotion";
import collections from "../newDropshipperApp/module/suppliers/collections";
import pause from "../newDropshipperApp/module/store/pause";
import pay from "../newDropshipperApp/module/store/orders/pay";
import verifyPassword from "../newDropshipperApp/module/password/verify";
import store from "../newDropshipperApp/module/store";
import downgradeStep from "../newDropshipperApp/module/downgradeStep";
import notifications from "../newDropshipperApp/module/feeds";
import todaysSales from "../newDropshipperApp/module/todaysSales";
import offers from "../newDropshipperApp/module/store/offers";
import review from "../newDropshipperApp/module/store/review";
import aliases from "../newDropshipperApp/module/suppliers/aliases";

const rootReducer = combineReducers({
  form: FormReducer,
  message: MessageReducer,
  forms: FormsReducer,
  shipping: ShippingReducer,
  upgrade: UpgradeReducer,
  auth: AuthReducer,
  settings: SettingsReducer,
  eventTracker: EventTrackerReducer,
  ui: UiReducer,
  analytics: combineReducers({
    salesAnalysis,
    topSellingProducts
  }),
  signUp: signUp,
  setLoginEmail: setLoginEmail,
  store: combineReducers({
    information: store,
    plans,
    planCharges,
    subscriptions,
    paypal: combineReducers({ paymentSubscribe, paymentSuccess }),
    personalization,
    promotion,
    pause,
    orders: combineReducers({ pay }),
    offers,
    review
  }),
  thinkific: thinkificSignin,
  updatePaymentProvider: updatePaymentProvider,
  payment: stripeIntegrationAccount,
  sendInviteEmail: sendInviteEmail,
  utm: utm,
  order,
  shared: combineReducers({ listingsCategory }),
  supplier: combineReducers({
    landingPage: supplier,
    collections,
    aliases
  }),
  featureFlags,
  verifyPassword,
  downgradeStep,
  notifications,
  todaysSales
});

export default rootReducer;



// WEBPACK FOOTER //
// ./src/reducers/index.js