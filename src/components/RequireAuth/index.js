// React and Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { browserHistory } from "react-router";

// Action
import { verify } from "../../actions";
import { signInUser, signOutUser } from "../../actions";

// Utils
import { isAuthenticated } from "../../utils/features";

export default AuthenticatedComponent => {
  class Auth extends Component {
    constructor(props) {
      super(props);
      const authToken = this.props.location.query.auth_token;
      const currentToken = isAuthenticated();

      if ((authToken && authToken !== currentToken) || currentToken === null) {
        if (authToken) {
          this.authTokenLogin();
        } else {
          this.accessDenied();
        }
      } else {
        this.props.verify();
      }
    }

    accessDenied() {
      this.saveUrlToRedirectAfterLogin();
      browserHistory.push("/login");
    }

    async authTokenLogin() {
      const { query, pathname } = this.props.location;

      let queryStrings = "";

      Object.keys(query)
        .filter(key => key !== "auth_token")
        .forEach((key, index) => {
          queryStrings += `${index === 0 ? "?" : "&"}${key}=${query[key]}`;
        });

      this.props.signInUser({ auth_token: query.auth_token }, pathname + queryStrings);
    }

    saveUrlToRedirectAfterLogin() {
      const currentLocation = browserHistory.getCurrentLocation().pathname;

      if (currentLocation !== "/login") {
        localStorage.setItem("redirect_to_url_after_signin", currentLocation);
      }
    }

    render() {
      return isAuthenticated() ? <AuthenticatedComponent {...this.props} /> : null;
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ verify, signInUser, signOutUser }, dispatch);
  }

  return connect(
    null,
    mapDispatchToProps
  )(Auth);
};



// WEBPACK FOOTER //
// ./src/components/RequireAuth/index.js