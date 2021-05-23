import RequestMethodsBase from "./requestMethodsBase";
export default class ApiCall extends RequestMethodsBase {
  static API_URL = process.env.REACT_APP_API_URL;
}
export class ApiBaseCall extends RequestMethodsBase {
  static API_URL = process.env.REACT_APP_BASE_API_URL;
}



// WEBPACK FOOTER //
// ./src/utils/apiCall.js