import ApiCall from "../utils/apiCall";

export default class CollectionApi extends ApiCall {
  /**
   * List of collection of the given integrated_store
   *
   * @returns {Promise} ex: [{id: 1, title: 'Acessories', ...}]
   */
  static index(integratedStoreID) {
    return this.get(`/integrated_stores/${integratedStoreID}/collections`);
  }
}



// WEBPACK FOOTER //
// ./src/api/Collection.js