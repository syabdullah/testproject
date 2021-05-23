import React from "react";
import PropTypes from "prop-types";
import { Modal, Row, Col } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { resetPassword, clearAuthMessage, openResetModal, closeResetModal } from "../../../actions";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

class PasswordModal extends React.Component {
  state = {
    modal: false
  };

  static propTypes = {
    openResetModal: PropTypes.func,
    closeResetModal: PropTypes.func,
    clearAuthMessage: PropTypes.func,
    resetPassword: PropTypes.func,
    actions: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    resetModalIsOpen: PropTypes.bool.isRequired,
    authMessage: PropTypes.string,
    authMessageDelay: PropTypes.number,
    authMessageType: PropTypes.string,
    authMessageTime: PropTypes.number
  };

  static defaultProps = {
    url: ""
  };

  handleFormSubmit = values => {
    this.props.actions.resetPassword(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`${touched && error ? "has-error" : ""}`}>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <div className="help-block">{error}</div>}
    </fieldset>
  );

  renderAuthenticationMessage() {
    if (this.props.authMessage) {
      return <div className="alert alert-danger">{this.props.authMessage}</div>;
    }
    return <div />;
  }

  openModal = () => {
    this.props.actions.clearAuthMessage();
    this.props.actions.openResetModal();
  };

  closeModal = () => {
    this.props.actions.clearAuthMessage();
    this.props.actions.closeResetModal();
  };

  render() {
    return (
      <div>
        <a role="button" onClick={() => this.openModal()}>
          Forgot Password?
        </a>
        <Modal show={this.props.resetModalIsOpen} onHide={() => this.closeModal()}>
          <Modal.Body>
            <p className="mb-20 text-center">
              <b>Type in your email and we will send you instructions on how to reset your password.</b>
            </p>
            {this.renderAuthenticationMessage()}
            <form className="sp-form" onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
              <Row>
                <Col xs={6} md={8}>
                  <Field name="email" type="text" component={this.renderField} label="Your Email" />
                </Col>
                <Col xs={6} md={4}>
                  <button action="submit" className="btn btn-primary btn-block">
                    Send
                  </button>
                </Col>
              </Row>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resetModalIsOpen: state.auth.resetModalIsOpen,
    authMessageType: state.auth.messageType,
    authMessageDelay: state.auth.messageDelay,
    authMessageTime: state.auth.messageTime,
    authMessage: state.auth.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        resetPassword,
        openResetModal,
        closeResetModal,
        clearAuthMessage
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "resetPassword",
    validate
  })(PasswordModal)
);



// WEBPACK FOOTER //
// ./src/components/Login/PasswordModal/index.js