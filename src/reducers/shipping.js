import { SHIPPING_REQUEST } from "../actions/shipping.js";

const initialState = {
  shippingCountries: [],
  shippingText: "",
  shippingError: ""
};

export default function action(state = initialState, action) {
  switch (action.type) {
    case SHIPPING_REQUEST:
      return {
        ...state,
        shippingCountries: action.payload.shippingCountries,
        shippingText: action.payload.shippingText,
        shippingError: action.payload.shippingError
      };
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/shipping.js