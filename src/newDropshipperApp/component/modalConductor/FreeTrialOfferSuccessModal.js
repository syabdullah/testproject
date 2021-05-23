// Libs
import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import { closeModal } from "../../../actions/ui";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";
import { Button } from "../../spocketUI";

// Images
import yayIllustration from "../../images/yay-illustration.svg";

// Style
import "./FreeTrialOfferSuccessModal.css";

const FreeTrialOfferSuccessModal = ({ closeModal }) => {
  return (
    <ModalWrapper
      onHide={() => browserHistory.push("/search")}
      className="FreeTrialOfferSuccessModal__container"
      backdropClassName="FreeTrialOfferSuccessModal__backdrop"
    >
      <ModalWrapper.Header>
        <div className="FreeTrialOfferSuccessModal__title-container">
          <div className="FreeTrialOfferSuccessModal__title">
            Congratulations, you are now on a 60 days free trial!
          </div>
        </div>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <div className="FreeTrialOfferSuccessModal__body-container">
          <img src={yayIllustration} alt="Special Offer" />
          <div className="FreeTrialOfferSuccessModal__footer-container">
            <Button
              onClick={() => {
                browserHistory.push("/search");
                closeModal();
              }}
              variant="primaryBig"
            >
              Continue
            </Button>
          </div>
        </div>
      </ModalWrapper.Body>
    </ModalWrapper>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}
export default connect(
  null,
  mapDispatchToProps
)(FreeTrialOfferSuccessModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/FreeTrialOfferSuccessModal.js