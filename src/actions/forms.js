export function updateForm(formName, values) {
  return dispatch => {
    dispatch({
      type: formName,
      payload: { values }
    });
  };
}

export function cleanForm() {
  return dispatch => {
    dispatch({
      type: "CLEAN"
    });
  };
}



// WEBPACK FOOTER //
// ./src/actions/forms.js