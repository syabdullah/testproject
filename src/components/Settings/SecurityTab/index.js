import { Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { changePassword, setAlertMessage } from "../../../actions";

class SecurityTab extends React.Component {
  static propTypes = {
    changePassword: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { t } = this.props;
    document.title = t("SecurityTab.Document.Title");
  }

  validate = values => {
    const { t } = this.props;
    const errors = {};
    // if (!values.currentPassword) {
    //   errors.currentPassword = "Please enter your current password";
    // }
    if (!values.password) {
      errors.password = t("SecurityTab.errorPleaseEnterAPassword");
    }
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = t("SecurityTab.errorPasswordsConfirmationNeeded");
    }
    if (values.password !== values.passwordConfirmation) {
      errors.password = t("SecurityTab.errorPasswordsDoNotMatch");
    }
    if (values.password.length < 8) {
      errors.password = t("SecurityTab.errorPasswordShort");
    }
    return errors;
  };

  handleFormSubmit = () => {
    const { t } = this.props;
    let values = {
      password: this.password.value,
      passwordConfirmation: this.passwordConfirmation.value //,
      // currentPassword: this.currentPassword.value
    };
    let errors = this.validate(values);
    if (Object.keys(errors).length === 0) {
      return this.props.changePassword(values).catch(error => {
        if (error.status && error.status === 403) {
          this.props.setAlertMessage(t("SecurityTab.alertIncorrectPassword"), "error");
        }
      });
    } else {
      if (errors.password) {
        this.props.setAlertMessage(errors.password, "error");
      }
      if (errors.passwordConfirmation) {
        this.props.setAlertMessage(errors.passwordConfirmation, "error");
      }
      return new Promise(resolve => resolve());
    }
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`${touched && error ? "has-error" : ""}`}>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <div className="help-block">{error}</div>}
    </fieldset>
  );

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{this.props.authenticationError}</div>;
    }
    return <div />;
  }

  render() {
    const { t } = this.props;
    return (
      <div className="">
        <h5 className="settings__subtitle header-tip">{t("SecurityTab.title")}</h5>
        <hr />
        <form>
          <Row className="mt-20">
            <Col xs={6} md={4}>
              <FormGroup className="mb-0">
                <ControlLabel>{t("SecurityTab.yourNewPassword")}</ControlLabel>
                <input
                  className="form-control security__input-fields"
                  type="password"
                  ref={i => (this.password = i)}
                />
              </FormGroup>
            </Col>
            <Col xs={6} md={4}>
              <FormGroup className="mb-0">
                <ControlLabel>{t("SecurityTab.repeatPassword")}</ControlLabel>
                <input
                  className="form-control security__input-fields"
                  type="password"
                  ref={i => (this.passwordConfirmation = i)}
                />
              </FormGroup>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePassword,
      setAlertMessage
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  };
}

export default withTranslation("translation", { withRef: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
      withRef: true
    }
  )(SecurityTab)
);



// WEBPACK FOOTER //
// ./src/components/Settings/SecurityTab/index.js