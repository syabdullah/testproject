// Libs
import React from "react";

// Components
import ModalWrapper from "../../ModalWrapper";

// Images
import processing from "../../../../assets/time-left.svg";

// Style
import "./AfterConfirmCheckoutOrderModal.css";

function AfterConfirmCheckoutOrderModal() {
  return (
    <ModalWrapper size="small AfterConfirmCheckoutOrderModal__container">
      <ModalWrapper.Header>Bulk Checkout Confirmation</ModalWrapper.Header>
      <ModalWrapper.Body>
        <div className="AfterConfirmCheckoutOrderModal__title">
          <img src={processing} alt="processing" />
          Your orders are being processed.
        </div>
        <div className="AfterConfirmCheckoutOrderModal__subtitle">
          Your order statuses will update shortly, and tracking numbers will be added when the orders have
          been fulfilled.
        </div>
      </ModalWrapper.Body>
    </ModalWrapper>
  );
}

export default AfterConfirmCheckoutOrderModal;



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/AfterConfirmCheckoutOrderModal/AfterConfirmCheckoutOrderModal.js