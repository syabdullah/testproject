import React from "react";
import ModalWrapper from "../../ModalWrapper";
import InputAddress from "../../Forms/inputAddress";

const InputAddressModal = () => {
  return (
    <ModalWrapper>
      <ModalWrapper.Header>Address</ModalWrapper.Header>
      <ModalWrapper.Body>
        <InputAddress />
      </ModalWrapper.Body>
    </ModalWrapper>
  );
};

export default InputAddressModal;



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/InputAddressModal/index.js