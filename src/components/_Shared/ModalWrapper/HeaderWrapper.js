import React from "react";
import { Modal } from "react-bootstrap";

const HeaderWrapper = ({ children }) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title>{children}</Modal.Title>
    </Modal.Header>
  );
};

export default HeaderWrapper;



// WEBPACK FOOTER //
// ./src/components/_Shared/ModalWrapper/HeaderWrapper.js