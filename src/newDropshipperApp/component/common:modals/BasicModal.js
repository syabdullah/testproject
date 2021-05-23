import React, { useEffect, useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Portal } from "./utility/Portal";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00000050;
  opacity: 0;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  & .modal-content {
    transform: translateY(100px);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }
  &.active {
    transition-duration: 250ms;
    transition-delay: 0ms;
    opacity: 1;
    & .modal-content {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
  }
`;

const Content = styled.div`
  position: relative;
  padding: 24px;
  min-width: 390px;
  box-sizing: border-box;
  max-height: 80%;
  max-width: 80%;
  background-color: white;
  border-radius: 8px;
`;

const CloseModalButton = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 0 5px;
  font-weight: 300;
  font-size: 21px;
  cursor: pointer;
  color: #00000020;
  :hover {
    color: #00000050;
  }
`;

export const BasicModal = props => {
  // set up active state
  const [active, setActive] = useState(false);
  // get spread props out variables
  const { open, onClose, locked, children, withCloseButton, className } = props;
  // Make a reference to the backdrop
  const backdrop = useCallback(
    node => {
      // when transition ends set active state to match open prop
      const transitionEnd = () => setActive(open);
      // when esc key press close modal unless locked
      const keyHandler = e => !locked && [27].indexOf(e.which) >= 0 && onClose();
      // when clicking the backdrop close modal unless locked
      const clickHandler = e => !locked && e.target === node && onClose();
      // const clickHandler = (e) => console.log(!locked, e.target === node, onClose());
      if (node !== null) {
        node.addEventListener("click", clickHandler);
        node.addEventListener("transitionend", transitionEnd);
        window.addEventListener("keyup", keyHandler);
      }
      // on unmount remove listeners
      return () => {
        if (node) {
          node.removeEventListener("click", clickHandler);
          node.removeEventListener("transitionend", transitionEnd);
        }
        window.removeEventListener("keyup", keyHandler);
      };
    },

    [open, locked, onClose]
  );

  useEffect(
    () => {
      // if open props is true add inert to #root
      // and set active state to true
      if (open) {
        window.setTimeout(() => {
          document.activeElement.blur();
          setActive(open);
          document.querySelector("#root").setAttribute("inert", "true");
        }, 10);
      }

      // on unmount remove listeners
      return () => {
        document.querySelector("#root").removeAttribute("inert");
      };
    },
    [open, locked]
  );

  const blurFilterSupported = CSS.supports("backdrop-filter: blur(25px)");
  const classes = `${active && open && "active"} ${className}`;

  return (
    <Fragment>
      {(open || active) && (
        <Portal>
          <Backdrop ref={backdrop} className={classes} blurFilterSupported={blurFilterSupported}>
            <Content className="modal-content">
              {children}
              {withCloseButton && <CloseModalButton onClick={onClose}>×</CloseModalButton>}
            </Content>
          </Backdrop>
        </Portal>
      )}
    </Fragment>
  );
};

BasicModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  locked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  withCloseButton: PropTypes.bool
};

BasicModal.defaultProps = {
  open: false,
  onClose: () => {},
  locked: false,
  withCloseButton: false
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/common/modals/BasicModal.js