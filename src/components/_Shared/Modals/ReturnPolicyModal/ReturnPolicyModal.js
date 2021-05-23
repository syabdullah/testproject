// React and Redux
import React from "react";
import { connect } from "react-redux";

// Components
import ModalWrapper from "../../ModalWrapper";

// Style
import "./ReturnPolicyModal.css";

const ReturnPolicyModal = ({ return_policy }) => {
  return (
    <ModalWrapper>
      <ModalWrapper.Header>
        <div className="return-policy-modal__header">Return Policy</div>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <div className="return-policy-modal__body">{return_policy}</div>
      </ModalWrapper.Body>
    </ModalWrapper>
  );
};

function mapStateToProps(state) {
  return {
    return_policy: state.ui.data.return_policy || ""
  };
}

export default connect(mapStateToProps)(ReturnPolicyModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/ReturnPolicyModal/ReturnPolicyModal.js