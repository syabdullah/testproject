import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { closeModal } from "../../../actions/ui";
import HeaderWrapper from "./HeaderWrapper";
import BodyWrapper from "./BodyWrapper";
import FooterWrapper from "./FooterWrapper";
import "./style.css";

const ModalWrapper = ({
  show = true,
  size,
  onHide,
  bsClass,
  keyboard,
  children,
  backdrop,
  className,
  closeModal,
  backdropClassName,
  closeModalLocalState
}) => {
  return (
    <Modal
      backdrop={backdrop}
      keyboard={keyboard}
      restoreFocus
      backdropClassName={backdropClassName ? backdropClassName : "Modal_Wrapper__backdrop"}
      dialogClassName={`${size} ${className}`}
      bsClass={bsClass}
      show={show}
      onHide={() => {
        closeModalLocalState ? closeModalLocalState() : closeModal();
        onHide && onHide();
      }}
    >
      {children}
    </Modal>
  );
};

ModalWrapper.Header = HeaderWrapper;
ModalWrapper.Body = BodyWrapper;
ModalWrapper.Footer = FooterWrapper;

ModalWrapper.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]).isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  onHide: PropTypes.func,
  bsClass: PropTypes.string,
  backdropClassName: PropTypes.string,
  backdrop: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keyboard: PropTypes.bool
};

ModalWrapper.defaultProps = {
  backdrop: true,
  keyboard: true
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeModal
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(ModalWrapper);



// WEBPACK FOOTER //
// ./src/components/_Shared/ModalWrapper/index.js