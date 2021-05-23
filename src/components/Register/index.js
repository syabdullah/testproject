import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { signupShop, exchangeToken } from "../../actions";
import PropTypes from "prop-types";
import qs from "qs";

class Register extends React.Component {
  static propTypes = {
    signupShop: PropTypes.func,
    location: PropTypes.object
  };

  register = () => {
    const registerCredentials = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    registerCredentials.action = registerCredentials["action"];
    this.props.exchangeToken(registerCredentials).then(({ status, json }) => {
      this.props.signupShop(json);
    });
  };

  // TODO: Show registration progress bar
  render() {
    return <div className="container">{this.register()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupShop, exchangeToken }, dispatch);
}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);



// WEBPACK FOOTER //
// ./src/components/Register/index.js