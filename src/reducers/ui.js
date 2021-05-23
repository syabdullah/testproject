const initialState = {
  currentModal: null
};

const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        currentModal: action.payload.currentModal,
        data: action.payload.data
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        currentModal: action.payload.currentModal
      };
    default:
      return state;
  }
};

export default UiReducer;



// WEBPACK FOOTER //
// ./src/reducers/ui.js