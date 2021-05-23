import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

import ModalWrapper from "../../ModalWrapper";
import exclamationRed from "../../../../assets/exclamation-red.svg";
import { closeModal } from "../../../../actions/ui";
import { Button } from "newDropshipperApp/spocketUI";
import "./CardDeclineModal.css";

const InputAddressModal = ({ closeModal }) => {
  return (
    <ModalWrapper>
      <ModalWrapper.Header>
        <div className="card-decline-modal__title">
          <img src={exclamationRed} alt="Exclamation icon" />
          Your current subscription payment is overdue
        </div>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <div className="card-decline-modal__body">
          The credit card we have on file rejected the charge for your Spocket subscription. Paid features
          will be blocked until we're able to confirm payment. Please update your credit card as soon as
          possible.
        </div>
        <div className="card-decline-modal__footer">
          <Button
            variant="warning"
            onClick={() => {
              browserHistory.push("/settings/payment");
              closeModal();
            }}
          >
            Update your card
          </Button>
        </div>
      </ModalWrapper.Body>
    </ModalWrapper>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(InputAddressModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/CardDeclineModal/CardDeclineModal.js