import {
  UPGRADE_URL,
  UPGRADE_ERROR,
  MODAL_OPEN,
  MODAL_CLOSE,
  IS_UPGRADING,
  IS_ANNUAL,
  MODAL_UPGRADE_TYPE
} from "../actions/upgrade.js";

const initialState = {
  modalOpen: false,
  url: "",
  error: "",
  isUpgrading: false,
  annualIsChecked: false
};

export default function action(state = initialState, action) {
  switch (action.type) {
    case UPGRADE_URL:
      return {
        ...state,
        url: action.payload.url
      };
    case UPGRADE_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    case MODAL_OPEN:
      return {
        ...state,
        modalOpen: true
      };
    case MODAL_UPGRADE_TYPE:
      return {
        ...state,
        modalUpgradeType: action.payload.modalUpgradeType
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false
      };
    case IS_UPGRADING:
      return {
        ...state,
        isUpgrading: action.payload.isUpgrading
      };
    case IS_ANNUAL:
      return {
        ...state,
        annualIsChecked: action.payload.annualIsChecked
      };
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/upgrade.js