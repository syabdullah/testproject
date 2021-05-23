import {
  SETTINGS_UPDATED_ALL,
  COLLECTIONS_SET,
  SETTINGS_UPDATED_PARTIAL,
  IS_DOWNGRADING,
  DROPSHIPPER_DATA_SUCCESS,
  SET_COLLECTION_SEARCH,
  EMPIRE_PRORATION_PRICE_SUCCESS,
  SET_DISABLED_INVOICING
} from "../actions/settings.js";

import {
  SET_ACTIVE_PLAN,
  SET_ACTIVE_SUBSCRIPTION,
  SET_STORE_AUTHORIZATION_KEY,
  SET_PAYMENT_PROVIDER,
  SET_ACTIVE_UPGRADE_TYPE
} from "../actions";

const initialState = {
  active: false,
  advanced: false,
  collections: [],
  country: "",
  currency: "",
  displayName: "",
  name: "",
  stripeCustomerId: false,
  url: "",
  rules: {},
  isDowngrading: false,
  currentPlan: {},
  dropshipperData: { isFetching: true, disabled_invoicing: true, ab_tests: [] },

  currentSubscription: {},
  collectionSearched: false,
  storeAuthorizationKey: null,
  proratedEmpireCost: {}
};

export default function action(state = initialState, action) {
  const data = action.data;
  switch (action.type) {
    case SETTINGS_UPDATED_ALL:
      return {
        ...state,
        active: data.active,
        advanced: data.advanced,
        country: data.country,
        currency: data.currency,
        displayName: data.display_name,
        name: data.name,
        stripeCustomerId: data.stripe_customer_id,
        url: data.url,
        rules: {}
      };
    case SETTINGS_UPDATED_PARTIAL:
      const values = action.values;
      return {
        ...state,
        ...values
      };
    case COLLECTIONS_SET:
      return {
        ...state,
        collections: data
      };
    case IS_DOWNGRADING:
      return {
        ...state,
        isDowngrading: action.payload.isDowngrading
      };
    case SET_ACTIVE_PLAN:
      return {
        ...state,
        currentPlan: action.plan
      };
    case SET_ACTIVE_SUBSCRIPTION:
      return {
        ...state,
        currentSubscription: action.subscription
      };
    case SET_STORE_AUTHORIZATION_KEY:
      return {
        ...state,
        storeAuthorizationKey: action.storeAuthorizationKey
      };
    case SET_PAYMENT_PROVIDER:
      return {
        ...state,
        paymentProvider: action.paymentProvider
      };
    case SET_ACTIVE_UPGRADE_TYPE:
      return {
        ...state,
        activeUpgradeType: action.activeUpgradeType
      };
    case EMPIRE_PRORATION_PRICE_SUCCESS:
      return {
        ...state,
        proratedEmpireCost: action.data
      };
    case DROPSHIPPER_DATA_SUCCESS:
      return {
        ...state,
        dropshipperData: { ...action.data, isFetching: false }
      };
    case SET_COLLECTION_SEARCH:
      return {
        ...state,
        collectionSearched: action.status
      };
    case SET_DISABLED_INVOICING:
      return {
        ...state,
        dropshipperData: {
          ...state.dropshipperData,
          disabled_invoicing: action.invoicing
        }
      };
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/settings.js