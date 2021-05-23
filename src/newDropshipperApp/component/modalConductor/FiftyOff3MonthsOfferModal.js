// Libs
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import { showModal } from "../../../actions/ui";
import { trackDowngradeStep } from "../../module/downgradeStep";
import { createOffer } from "../../module/store/offers";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";
import { Button } from "../../spocketUI";
import { default as Loadable } from "../../../components/_Shared/commonLoadable";

// Images
import specialOfferFiftyOff from "../../images/special-offer-50-off.png";
import specialOfferFiftyOffMobile from "../../images/special-offer-image-mobile.png";
import badgePriceStarter from "../../images/badge-price-starter.svg";
import badgePricePro from "../../images/badge-price-pro.svg";
import badgePriceEmpire from "../../images/badge-price-empire.svg";
import badgePriceUnicorn from "../../images/badge-price-unicorn.svg";

// Style
import "./FiftyOff3MonthsOfferModal.css";

const FiftyOff3MonthsOfferModal = ({
  showModal,
  trackDowngradeStep,
  createOffer,
  isFetching,
  activeOffer,
  currentPlan
}) => {
  const getUserName = () => {
    const userName = localStorage.getItem("user_name");

    return userName ? `${userName}, ` : "";
  };

  const getOfferBadge = () => {
    let badgeImage;

    switch (currentPlan.name) {
      case "Starter":
        badgeImage = badgePriceStarter;
        break;
      case "Professional":
        badgeImage = badgePricePro;
        break;
      case "Empire":
        badgeImage = badgePriceEmpire;
        break;
      case "Unicorn":
        badgeImage = badgePriceUnicorn;
        break;
      default:
        break;
    }

    return badgeImage;
  };

  const getOfferHeaderText = () => {
    const title = <div>{getUserName()}we have a 50% off special offer for you!</div>;
    const text =
      "Sometimes to build a successful dropshipping business requires time, so we want to give you this special offer!";

    return (
      <div>
        {title}
        <span>{text}</span>
      </div>
    );
  };

  const getOfferImageCaption = () => {
    return "";
  };

  const getOfferButton = () => {
    return (
      <div>
        <Button
          variant="primaryBig"
          onClick={() => {
            createOffer({ offerType: activeOffer });
          }}
        >
          Get it now
        </Button>
      </div>
    );
  };

  const getDowngradeButton = () => {
    return (
      <div>
        <Button
          variant="text"
          onClick={() => {
            trackDowngradeStep("has_clicked_past_offer");
            showModal("DOWNGRADE_REASON_MODAL");
          }}
        >
          No, I want to continue with the downgrade
        </Button>
      </div>
    );
  };

  return (
    <ModalWrapper
      className="FiftyOff3MonthsOfferModal__container"
      backdropClassName="FiftyOff3MonthsOfferModal__backdrop"
    >
      <Loadable active={isFetching}>
        <ModalWrapper.Header>
          <div className="FiftyOff3MonthsOfferModal__title-container">
            <div className="FiftyOff3MonthsOfferModal__title">{getOfferHeaderText()}</div>
          </div>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <div className="FiftyOff3MonthsOfferModal__body-container">
            <div className="FiftyOff3MonthsOfferModal__wrapper">
              <img
                src={getOfferBadge()}
                className="FiftyOff3MonthsOfferModal__price-badge"
                alt="price badge"
              />
              <img
                src={specialOfferFiftyOff}
                alt="Special Offer"
                className="FiftyOff3MonthsOfferModal__main-image"
              />
              <img
                src={specialOfferFiftyOffMobile}
                alt="Special Offer"
                className="FiftyOff3MonthsOfferModal__main-image-mobile"
              />
            </div>
            <div className="FiftyOff3MonthsOfferModal__body-image-caption">{getOfferImageCaption()}</div>
            <div className="FiftyOff3MonthsOfferModal__footer-container">
              {getOfferButton()}
              {getDowngradeButton()}
            </div>
          </div>
        </ModalWrapper.Body>
      </Loadable>
    </ModalWrapper>
  );
};

function mapStateToProps(state) {
  const { currentSubscription } = state.settings;

  return {
    isFetching: state.store.offers.isFetching,
    activeOffer: "fifty_off_3_months",
    currentPlan: state.settings.currentPlan,
    currentSubscription: currentSubscription
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, trackDowngradeStep, createOffer }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiftyOff3MonthsOfferModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/FiftyOff3MonthsOfferModal.js