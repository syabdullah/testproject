import ApiCall from "../utils/apiCall";

export default class StoreLogoAPI extends ApiCall {
  /**
   * Store Logo
   *
   * @returns {Promise}
   */
  static index() {
    return this.get(`/stores/logo`);
  }

  /**
   * Create image listing
   * @param params.attachment base64 of the image
   * @returns {Promise} as the just saved image
   */
  static save(params) {
    return this.post(`/stores/logo`, params);
  }

  /**
   * Destroy the given image
   *
   * @returns {Promise} ex: status 204
   */
  static destroy(id) {
    return this.delete(`/stores/logo`);
  }
}



// WEBPACK FOOTER //
// ./src/api/StoreLogoAPI.js