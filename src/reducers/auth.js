import {
  AUTH_USER,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  AUTH_MESSAGE_ERROR,
  AUTH_MESSAGE_SUCCESS,
  AUTH_MESSAGE_CLEAR,
  OPEN_RESET_MODAL,
  CLOSE_RESET_MODAL,
  REGISTER_SHOP,
  DEREGISTER_SHOP
} from "../actions";

const initialState = {
  authenticated: false,
  registered: false,
  error: null,
  resetModalIsOpen: false
};

export default function action(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SHOP:
      return {
        ...state,
        registered: true
      };
    case DEREGISTER_SHOP:
      return {
        ...state,
        registered: false
      };
    case OPEN_RESET_MODAL:
      return {
        ...state,
        resetModalIsOpen: true
      };
    case CLOSE_RESET_MODAL:
      return {
        ...state,
        resetModalIsOpen: false
      };
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false
      };
    case AUTH_USER:
      return {
        ...state,
        authenticated: true
      };
    case AUTH_MESSAGE_ERROR:
      return {
        ...state,
        message: action.payload.message,
        messageDelay: action.payload.delay,
        messageTime: action.payload.time,
        messageType: "error"
      };
    case AUTH_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        messageDelay: action.payload.delay,
        messageTime: action.payload.time,
        messageType: "success"
      };
    case AUTH_MESSAGE_CLEAR:
      return {
        ...state,
        message: null,
        messageDelay: null,
        messageTime: null,
        messageType: null
      };
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/auth.js