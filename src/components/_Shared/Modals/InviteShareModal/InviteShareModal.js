// React and Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col, Row } from "react-bootstrap";
import { WithContext as ReactTags } from "react-tag-input";

import { default as Loadable } from "../../commonLoadable";
import ModalWrapper from "../../ModalWrapper";

import checkIcon from "../../../../assets/icon-check.svg";
import { sendInviteEmail, resetInviteSent } from "../../../../newDropshipperApp/module/sendInviteEmail";

import "./InviteShareModal.css";

class InviteShareModal extends Component {
  state = { emailAddresses: [], emailToSave: "" };

  componentDidMount() {
    this.props.resetInviteSent();
  }

  emailAlreadyExists = email => {
    const emailAddresses = this.state.emailAddresses.map(item => item.text);
    return emailAddresses.includes(email);
  };

  isValidEmail = email => {
    return email.match(/\S+@\S+\.\S+/);
  };

  handleInputChange = email => {
    if (this.isValidEmail(email)) {
      this.setState({ emailToSave: email });
    }
  };

  handleEmailDelete = indexToDelete => {
    const emailAddresses = [...this.state.emailAddresses];
    emailAddresses.splice(indexToDelete, 1);
    this.setState({ emailAddresses });
  };

  handleEmailAddition = email => {
    let emailAddresses = this.state.emailAddresses;

    if (!this.emailAlreadyExists(email) && this.isValidEmail(email)) {
      emailAddresses = emailAddresses.concat({ text: email });
    }
    this.setState({ emailAddresses, emailToSave: "" });
  };

  sendInvite = () => {
    const emailToSave = this.state.emailToSave;
    let emailAddresses = this.state.emailAddresses.map(item => item.text);

    if (this.isValidEmail(emailToSave)) {
      emailAddresses = emailAddresses.concat(emailToSave);
    }

    this.props.sendInviteEmail(emailAddresses);
  };

  render() {
    const { emailAddresses } = this.state;
    const userName = localStorage.user_name;
    return (
      <ModalWrapper size="small">
        {this.props.emailSent ? (
          <Loadable active={this.props.submitting}>
            <ModalWrapper.Header />
            <ModalWrapper.Body>
              <Row>
                <div className="invite-sent-message">
                  <img src={checkIcon} alt="invite sent" />
                  <p>Invitations Sent!</p>
                </div>
              </Row>
            </ModalWrapper.Body>
          </Loadable>
        ) : (
          <Loadable active={this.props.submitting}>
            <ModalWrapper.Header>Share your store and get feedback</ModalWrapper.Header>
            <ModalWrapper.Body>
              <div>
                <Row className="email-input-wrapper">
                  <Col md={12}>
                    <h5>Email addresses:</h5>
                    <ReactTags
                      autofocus={true}
                      tags={emailAddresses}
                      maxLength="42"
                      handleAddition={this.handleEmailAddition}
                      handleDelete={this.handleEmailDelete}
                      handleInputChange={this.handleInputChange}
                      draggable={false}
                      placeholder="Add new email"
                      delimiters={[9, 13, 188]}
                      classNames={{
                        tags: "tags-container",
                        tagInput: "tag-input-container",
                        tagInputField: "form-control input-sm",
                        tag: "tag-style",
                        remove: "remove-btn"
                      }}
                    />
                    <hr />
                  </Col>
                </Row>
                <Row className="message-wrapper">
                  <Col md={12}>
                    <h5>Message:</h5>
                    <p>
                      <strong>{userName} needs your feedback to build a better online store</strong>
                    </p>
                    <p>
                      <span>
                        I've been using Spocket to build my online store and make money. Can you check out my
                        store and give me feedback on how to improve it?
                      </span>
                    </p>
                    <p>
                      <span>{userName}</span>
                    </p>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <button
                      className="btn btn-primary send-invite-btn"
                      disabled={emailAddresses.length === 0}
                      onClick={this.sendInvite}
                    >
                      Send Invite ({emailAddresses.length})
                    </button>
                  </Col>
                </Row>
              </div>
            </ModalWrapper.Body>
          </Loadable>
        )}
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendInviteEmail, resetInviteSent }, dispatch);
}

function mapStateToProps(state) {
  return {
    submitting: state.sendInviteEmail.submitting,
    emailSent: state.sendInviteEmail.emailSent
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteShareModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/InviteShareModal/InviteShareModal.js