// React & Redux
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import PropTypes from "prop-types";
import DocumentTitle from "react-document-title";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";

// Actions
import { signInUser } from "../../actions";

// Components
import Divider from "../../newDropshipperApp/component/Divider";
import SocialButton from "../../newDropshipperApp/component/SocialButton";
import PasswordModal from "./PasswordModal";

// Assets
import logo from "../../newDropshipperApp/images/spocket-logo.svg";

// Style
import "./style.css";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Please enter a password.";
  }
  return errors;
};

class Login extends React.Component {
  static propTypes = {
    signInUser: PropTypes.func.isRequired,
    authMessage: PropTypes.string,
    authMessageDelay: PropTypes.number,
    authMessageType: PropTypes.string,
    authMessageTime: PropTypes.number,
    resetModalIsOpen: PropTypes.bool.isRequired
  };

  state = {
    emailErrorDisplayed: false
  };

  componentDidMount = () => {
    // After component has mounted change state to avoid showing the "This email already exists." error again
    this.setState({ emailErrorDisplayed: true });
  };

  handleFormSubmit = credentials => {
    this.props.signInUser(credentials);
  };

  renderQueryEmailError = input => {
    // If user used auto-signup with an existing email, we should display an error message on email input
    const shouldDisplay =
      !this.state.emailErrorDisplayed &&
      this.props.initialValues.email && // Only show error if there is an email saved on store
      input.name === "email"; // Only show error on email input
    if (shouldDisplay)
      return (
        <div className="help-block" data-cy="existing-email-error">
          This email already exists. Please login.
        </div>
      );
  };

  renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <fieldset className={`${touched && error ? "has-error" : ""}`}>
      <input {...input} placeholder={placeholder} type={type} data-cy={`login-${type}`} />
      {touched && error && <div className="help-block">{error}</div>}
      {this.renderQueryEmailError(input)}
    </fieldset>
  );

  renderAuthenticationMessage() {
    if (!this.props.resetModalIsOpen && this.props.authMessage) {
      if (this.props.authMessageType === "success") {
        return <div className="alert alert-success">{this.props.authMessage}</div>;
      }
      return (
        <div data-cy="login-error" className="alert alert-danger">
          {this.props.authMessage}
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div className="centered">
        <DocumentTitle title="Login - Spocket" />
        <div className="raised-card">
          <img src={logo} className="logo mb-20" alt="logo" />
          {this.renderAuthenticationMessage()}
          <form className="sp-form" onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" component={this.renderField} type="text" placeholder="Email" />
            <Field name="password" component={this.renderField} type="password" placeholder="Password" />
            <button
              style={{ marginTop: "10px", marginBottom: "10px" }}
              action="submit"
              className="btn btn-primary btn-block mt-20 mb-20"
              data-cy="login-button"
            >
              Log In
            </button>
          </form>
          <PasswordModal />
          <div className="Login__social-buttons">
            <Divider>or</Divider>
            <SocialButton type="google">Log in with Google</SocialButton>
            <SocialButton type="facebook">Log in with Facebook</SocialButton>
          </div>
        </div>

        <p className="mt-40">
          Don&lsquo;t have an account?{" "}
          <Link to="/signup" data-cy="sign-up">
            Sign up now.
          </Link>
        </p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signInUser
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    authMessageType: state.auth.messageType,
    authMessageDelay: state.auth.messageDelay,
    authMessageTime: state.auth.messageTime,
    authMessage: state.auth.message,
    resetModalIsOpen: state.auth.resetModalIsOpen,
    initialValues: {
      email: state.signUp.email
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "login",
    validate
  })(Login)
);



// WEBPACK FOOTER //
// ./src/components/Login/index.js