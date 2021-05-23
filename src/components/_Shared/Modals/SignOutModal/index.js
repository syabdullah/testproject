// React and Redux
import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import ModalWrapper from "../../ModalWrapper";
import SimpleSignOut from "./SimpleSignOut";
import NewPasswordSignOut from "./NewPasswordSignOut";

// Actions
import { closeModal } from "../../../../actions/ui";
import { changePassword } from "../../../../actions";

class SignOutModal extends Component {
  state = { formData: {}, errors: [] };

  handleInputChanged = e => {
    let data = this.state.formData;
    const inputName = e.target.name;
    const inputValue = e.target.value;
    data[inputName] = inputValue;

    this.setState({ formData: data });
  };

  handleSignOut = () => {
    this.props.closeModal();
    this.props.modalData.signOut();
  };

  savePassword = () => {
    const formData = this.state.formData;
    let errors = [];

    if (!formData.password) {
      errors.push("Please enter a password.");
    } else if (!formData.confirm_password) {
      errors.push("Please enter a password confirmation.");
    } else if (formData.password !== formData.confirm_password) {
      errors.push("Passwords do not match");
    } else if (formData.password.length < 8) {
      errors.push("Password must be 8 characters or longer");
    }

    this.setState({ errors });

    if (errors.length === 0) {
      this.props.changePassword(formData);
      this.handleSignOut();
    }
  };

  render() {
    return (
      <ModalWrapper size="small">
        {this.props.modalData.passwordSet ? (
          <SimpleSignOut closeModal={this.props.closeModal} signOut={this.handleSignOut} />
        ) : (
          <NewPasswordSignOut
            closeModal={this.props.closeModal}
            handleInputChanged={this.handleInputChanged}
            savePassword={this.savePassword}
            errors={this.state.errors}
          />
        )}
      </ModalWrapper>
    );
  }
}

function mapStateToProps(state) {
  return { modalData: state.ui.data };
}

export default connect(
  mapStateToProps,
  { closeModal, changePassword }
)(SignOutModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/SignOutModal/index.js