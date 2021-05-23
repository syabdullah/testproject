export function showModal(currentModal, data) {
  return dispatch => {
    dispatch({
      type: "SHOW_MODAL",
      payload: { currentModal, data }
    });
  };
}

export function closeModal() {
  return dispatch => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: { currentModal: null }
    });
  };
}



// WEBPACK FOOTER //
// ./src/actions/ui.js