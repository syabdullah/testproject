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

// i18n
import { useTranslation } from "react-i18next";

// Style
import "./FiftyOff3MonthsOfferSuccessModal.css";

const FiftyOff3MonthsOfferSuccessModal = ({ closeModal }) => {
  const { t } = useTranslation();

  return (
    <ModalWrapper
      onHide={() => browserHistory.push("/search")}
      className="FiftyOff3MonthsOfferSuccessModal__container"
      backdropClassName="FiftyOff3MonthsOfferSuccessModal__backdrop"
    >
      <ModalWrapper.Header>
        <div className="FiftyOff3MonthsOfferSuccessModal__title-container">
          <div className="FiftyOff3MonthsOfferSuccessModal__title">
            {t("FiftyOff3MonthsOfferSuccessModal.Header")}
          </div>
        </div>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <div className="FiftyOff3MonthsOfferSuccessModal__body-container">
          <img src={yayIllustration} alt="Special Offer" />
          <div className="FiftyOff3MonthsOfferSuccessModal__footer-container">
            <Button
              onClick={() => {
                browserHistory.push("/search");
                closeModal();
              }}
              variant="primaryBig"
            >
              {t("FiftyOff3MonthsOfferSuccessModal.Button")}
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
)(FiftyOff3MonthsOfferSuccessModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/FiftyOff3MonthsOfferSuccessModal.js