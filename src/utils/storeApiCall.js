import RequestMethodsBase from "./requestMethodsBase";

export default class StoreApiCall extends RequestMethodsBase {
  static API_URL = process.env.REACT_APP_API_URL;

  static getAddress() {
    return this.get("/stores/address").then(({ _status, json }) => json);
  }

  static saveAddress(params) {
    return this.put("/stores/address", params).then(({ _status, json }) => json);
  }

  static updateAddress(params) {
    return this.patch("/stores/address", params).then(({ _status, json }) => json);
  }

  static validateAddress(params) {
    return this.post("/stores/address/validate", params).then(({ _status, json }) => json);
  }

  /**
   * @param  {String} query
   * @param  {Hash}   params personalization params
   * @param  {String} params.current_sales
   * @param  {Array} params.categories
   * @param  {Array} params.ships_from
   * @param  {Array} params.price_range
   * @return {Promisse}
   */
  static personalization(params) {
    return this.put("/stores/personalization", params).then(({ _status, json }) => json);
  }
}



// WEBPACK FOOTER //
// ./src/utils/storeApiCall.js