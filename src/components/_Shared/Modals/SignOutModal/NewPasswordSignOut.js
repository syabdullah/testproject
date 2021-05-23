import React from "react";
import icon from "../../../../assets/orange-check-icon.svg";
import ModalWrapper from "../../ModalWrapper";
import NewPasswordForm from "../../NewPasswordForm";

import { StyledButton } from "./NewPasswordSignOut.style";
import { Button } from "newDropshipperApp/spocketUI";

const NewPasswordSignOut = ({ closeModal, handleInputChanged, savePassword, errors }) => {
  return (
    <div>
      <ModalWrapper.Header>
        <img src={icon} alt="logout" style={{ marginRight: "10px", marginTop: "-5px" }} />
        <span className="Sample_Order_Modal__title-modal">Hold Up!</span>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <NewPasswordForm handleInputChanged={handleInputChanged} />
        {errors.map(error => {
          return (
            <div key={error} className="help-block New-password__error">
              {error}
            </div>
          );
        })}
      </ModalWrapper.Body>
      <ModalWrapper.Footer>
        <Button variant="text" onClick={closeModal}>
          Cancel
        </Button>
        <StyledButton variant="primary" onClick={savePassword}>
          Save & Log out
        </StyledButton>
      </ModalWrapper.Footer>
    </div>
  );
};

export default NewPasswordSignOut;



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/SignOutModal/NewPasswordSignOut.js