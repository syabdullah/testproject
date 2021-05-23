export const formatErrorMessage = e => {
  if (!e) {
    return "Unknown Error";
  }
  // Case the error is a standard Javascript Error (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error)
  if (e.message) {
    return e.message;
  }
  // Case the error comes from API/Backend
  if (e.json && e.json.errors) {
    const { errors } = e.json;
    if (typeof errors === "string" || errors instanceof String) {
      return errors;
    }
    if (Array.isArray(errors)) {
      return errors.join(", ");
    }
  }
  // Case the error is an object, but we don't know the format, we will encode it as JSON string
  return JSON.stringify(e);
};



// WEBPACK FOOTER //
// ./src/utils/formatErrorMessage.js