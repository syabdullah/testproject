import { MESSAGE_SUCCESS, MESSAGE_INFO, MESSAGE_ERROR, MESSAGE_CLEAR } from "../actions";

const initialState = {
  message: "",
  messageType: ""
};

export default function action(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        messageDelay: action.payload.delay,
        messageTime: action.payload.time,
        messageType: "success",
        goalsTheme: action.payload.goalsTheme
      };
    case MESSAGE_INFO:
      return {
        ...state,
        message: action.payload.message,
        messageDelay: action.payload.delay,
        messageTime: action.payload.time,
        messageType: "info"
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        message: action.payload.message,
        messageDelay: action.payload.delay,
        messageTime: action.payload.time,
        messageType: "error"
      };
    case MESSAGE_CLEAR:
      return {
        ...state,
        message: "",
        messageType: ""
      };
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/message.js