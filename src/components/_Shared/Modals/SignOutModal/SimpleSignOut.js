import React from "react";
import { Col, Row } from "react-bootstrap";

import { Button } from "newDropshipperApp/spocketUI";
import ModalWrapper from "../../ModalWrapper";
import icon from "../../../../assets/orange-check-icon.svg";
import { LogoutButton } from "./SimpleSignOut.style";

const SimpleSignOut = ({ closeModal, signOut }) => {
  return (
    <div>
      <ModalWrapper.Header>
        <img src={icon} alt="logout" style={{ marginRight: "10px", marginTop: "-5px" }} />
        <span className="Sample_Order_Modal__title-modal">Log Out?</span>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <Row>
          <Col md={12} className="">
            Are you sure you want to log out from Spocket?
          </Col>
        </Row>
      </ModalWrapper.Body>
      <ModalWrapper.Footer>
        <Button variant="text" onClick={closeModal}>
          Cancel
        </Button>
        <LogoutButton variant="primary" onClick={signOut}>
          Log out
        </LogoutButton>
      </ModalWrapper.Footer>
    </div>
  );
};

export default SimpleSignOut;



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/SignOutModal/SimpleSignOut.js