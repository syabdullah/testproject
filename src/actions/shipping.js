import ApiCall from "../utils/apiCall";

export const SHIPPING_REQUEST = "SHIPPING_REQUEST";
export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSED = "MODAL_CLOSED";
const UNITED_STATES_CODE = 209;

export function processShippingRequest(country, zip, listing, importing = false) {
  return function(dispatch) {
    ApiCall.post(`/api/shipping/${listing}`, {
      country: country ? country : UNITED_STATES_CODE,
      postal_code: zip,
      importing: importing
    })
      .then(({ status, json }) => {
        let shippingCountries = null;
        let shippingText = null;
        let shippingError = null;
        if (json.countries) {
          shippingCountries = json.countries;
        }
        if (json.value) {
          shippingText = json.value;
          if (json.value !== "Free") {
            shippingText = "$" + shippingText;
          }
        } else {
          shippingError = json.error;
        }
        dispatch(shippingInformation(shippingCountries, shippingText, shippingError));
      })
      .catch(({ status, json }) => {
        dispatch(shippingInformation(null, null, json.error));
      });
  };
}

export function clearShippingRequest(shippingCountries = []) {
  return function(dispatch) {
    dispatch(shippingInformation(shippingCountries, "", ""));
  };
}

export function shippingInformation(shippingCountries = null, shippingText = null, shippingError = null) {
  return {
    type: SHIPPING_REQUEST,
    payload: {
      shippingCountries: shippingCountries,
      shippingText: shippingText,
      shippingError: shippingError
    }
  };
}



// WEBPACK FOOTER //
// ./src/actions/shipping.js