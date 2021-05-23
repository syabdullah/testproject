import { store } from "../store/configureStore";
import { signOutUser } from "../actions/index";
import useMockdata from "utils/useMockdata";
const mockedEndpoints = ["/listings", "/import_list", "pushed_listing_customizations", "/suppliers"];
/* global $ */

/**
  Service to handle ajax requests to any api
  This service is not used directly, this is

  TODO:
  - Create Put, Post and Delete
 */
export default class RequestMethodsBase {
  /**
   * Make a get request to our api
   * @param  {String} url    path to resource without host
   * @param  {Hash} params   Query params
   * @return {Promisse}
   */
  static get(url, params, type) {
    // ! TEMPORARY IMPLEMENTATION OF MOCKDATA
    const isEndpointMocked = mockedEndpoints.find(string => url.includes(string));
    if (process.env.REACT_APP_ENV === "mockdata" && isEndpointMocked) {
      console.log("USING MOCKDATAAAAA");
      return useMockdata(url);
    } else {
      return fetch(this._mountUrlWithParams(url, params), {
        headers: this._buildHeaders(type)
      })
        .then(this._rejectBadResponse)
        .then(this._checkAuth)
        .then(this._jsonResponse)
        .catch(error => {
          if (window.location.pathname !== "/maintenance" && !error.status && !error.includes("TypeError")) {
            window.location.replace("/maintenance");
          } else {
            throw error;
          }
        });
    }
  }

  /**
   * Post request with stringified body.
   * @param  {String} url
   * @param  {Hash} data
   * @return {Promisse}
   */
  static post(url, data) {
    return fetch(this._mountUrlWithParams(url, {}), {
      method: "POST",
      headers: this._buildHeaders(),
      body: JSON.stringify(data)
    })
      .then(this._rejectBadResponse)
      .then(this._checkAuth)
      .then(this._jsonResponse);
  }

  static patch(url, data) {
    return fetch(this._mountUrlWithParams(url, {}), {
      method: "PATCH",
      headers: this._buildHeaders(),
      body: JSON.stringify(data)
    })
      .then(this._rejectBadResponse)
      .then(this._checkAuth)
      .then(this._jsonResponse);
  }

  static put(url, data) {
    return fetch(this._mountUrlWithParams(url, {}), {
      method: "PUT",
      headers: this._buildHeaders(),
      body: JSON.stringify(data)
    })
      .then(this._rejectBadResponse)
      .then(this._checkAuth)
      .then(this._jsonResponse);
  }

  /**
   * Make a delete request to our api
   * @param  {String} url    path to resource without host
   * @param  {Hash} params   Query params
   * @return {Promisse}
   */
  static delete(url, params) {
    return fetch(this._mountUrlWithParams(url, params), {
      headers: this._buildHeaders(),
      method: "DELETE"
    })
      .then(this._rejectBadResponse)
      .then(this._jsonResponse);
  }

  // private

  /**
   * Returns a rejected promise with a status and a message if the response
   * is invalid.
   * @param  {Response}
   * @return {Response} or new rejected promise
   */
  static _rejectBadResponse(response) {
    // Note: we might want to check for other statuses or conditions here
    if (response.status >= 500) {
      return Promise.reject({
        status: response.status,
        message: response.statusText,
        json: { message: response.body }
      });
    } else {
      return response;
    }
  }

  /**
   * Converts the response to json
   * @param  {Response}
   * @return {Object} status, json
   */
  static _jsonResponse(response) {
    if (response.status === 204) {
      return Promise.resolve({
        status: response.status,
        json: {}
      });
    }

    return response.json().then(json => {
      const body = { status: response.status, json };
      if (response.ok) {
        return body;
      } else {
        return Promise.reject(body);
      }
    });
  }

  /**
   * Check if the user is unauthorized and log them out if they are.
   * @param  {Response} response
   * @return {Response}
   */
  static _checkAuth(response) {
    if (response.status === 401) {
      store.dispatch(signOutUser());
      return Promise.reject({
        status: response.status,
        json: { message: "Your session has expired. Please log in." }
      });
    } else {
      return response;
    }
  }

  /**
   * Simple mount url request with query params
   * @param  {String} url
   * @param  {Hash} params
   * @return {String}
   */
  static _mountUrlWithParams(url, params = {}) {
    if (Object.keys(params).length) {
      const queryParams = $.param(params || "");
      return `${this.API_URL}${url}?${encodeURI(queryParams)}`;
    } else {
      return `${this.API_URL}${url}`;
    }
  }

  /**
   * Build headers for fetch request with autorizatoin token
   * @return {Headers}
   */
  static _buildHeaders(type = "json") {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("content-type", `application/${type}`);
    headers.append("Authorization", `Bearer ${this._token()}`);
    return headers;
  }

  /**
   * Token for api JWT autorization
   * @return {String}
   */
  static _token() {
    return localStorage.getItem("auth_token");
  }
}



// WEBPACK FOOTER //
// ./src/utils/requestMethodsBase.js