import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

const BodyWrapper = ({ style, children }) => {
  return <Modal.Body style={style}>{children}</Modal.Body>;
};

BodyWrapper.propTypes = { style: PropTypes.object };

export default BodyWrapper;



// WEBPACK FOOTER //
// ./src/components/_Shared/ModalWrapper/BodyWrapper.js