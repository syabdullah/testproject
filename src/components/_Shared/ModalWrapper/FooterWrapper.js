import React from "react";
import { Modal } from "react-bootstrap";

const FooterWrapper = ({ children, style }) => {
  return <Modal.Footer style={style}>{children}</Modal.Footer>;
};

export default FooterWrapper;



// WEBPACK FOOTER //
// ./src/components/_Shared/ModalWrapper/FooterWrapper.js