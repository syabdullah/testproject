const initialState = {
  // Sample Order
  productVariation: { characteristics: {}, note: "", quantity: 0 },
  inputAddress: {
    first_name: "",
    last_name: "",
    line_one: "",
    line_two: "",
    country: "",
    province: "",
    city: "",
    zip: "",
    phone: ""
  },
  quantity: 0,
  // Onboarding Flow
  currentSales: {
    starting: false,
    beginner: false,
    intermediary: false,
    expert: false,
    value: ""
  },
  productsSell: {},
  productsShippedFrom: {},
  priceProducts: {}
};

const initialCurrentSales = {
  starting: false,
  beginner: false,
  intermediary: false,
  expert: false
};

const FormsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_VARIATION":
      return {
        ...state,
        productVariation: {
          ...state.productVariation,
          ...action.payload.values
        }
      };
    case "INPUT_ADDRESS":
      return {
        ...state,
        inputAddress: {
          ...state.inputAddress,
          ...action.payload.values
        }
      };
    case "CURRENT_SALES":
      return {
        ...state,
        currentSales: {
          ...initialCurrentSales,
          ...action.payload.values,
          value: action.payload.values[Object.keys(action.payload.values)[0]]
        }
      };
    case "PRODUCT_CATEGORIES":
      // If product are selected (true) set it to false (unselected)
      const keysProductCategories = Object.keys(action.payload.values)[0];
      if (state.productsSell[keysProductCategories]) {
        action.payload.values[keysProductCategories] = false;
      }

      return {
        ...state,
        productsSell: {
          ...state.productsSell,
          ...action.payload.values
        }
      };
    case "PRODUCT_SHIPPED_FROM":
      // If product are selected (true) set it to false (unselected)
      const keysProductsShipped = Object.keys(action.payload.values)[0];
      if (state.productsShippedFrom[keysProductsShipped]) {
        action.payload.values[keysProductsShipped] = false;
      }

      return {
        ...state,
        productsShippedFrom: {
          ...state.productsShippedFrom,
          ...action.payload.values
        }
      };
    case "PRODUCT_PRICE_RANGES":
      // If product are selected (true) set it to false (unselected)
      const keysProductPriceRanges = Object.keys(action.payload.values)[0];
      if (state.priceProducts[keysProductPriceRanges]) {
        action.payload.values[keysProductPriceRanges] = false;
      }

      return {
        ...state,
        priceProducts: {
          ...state.priceProducts,
          ...action.payload.values
        }
      };

    case "INFORMATIONS":
      return {
        ...state,
        ...action.payload.values
      };
    case "CLEAN":
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default FormsReducer;



// WEBPACK FOOTER //
// ./src/reducers/forms.js