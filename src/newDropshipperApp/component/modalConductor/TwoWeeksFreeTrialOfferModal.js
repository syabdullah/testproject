// Libs
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

// Actions
import { showModal } from "../../../actions/ui";
import { trackDowngradeStep } from "../../module/downgradeStep";
import { createOffer } from "../../module/store/offers";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";
import { Button } from "../../spocketUI";
import { default as Loadable } from "../../../components/_Shared/commonLoadable";
import Countdown from "../../../components/_Shared/Countdown/Countdown";
import { Emoji } from "newDropshipperApp/component/Emoji";

// Images
import TwoWeeksFreeTrialOfferBackground from "../../images/TwoWeeksFreeTrialOffer.jpg";
import TwoWeeksFreeTrialOfferBackgroundMobile from "../../images/14-days-offer-mobile.jpg";
import packageBadge from "../../images/icon-package-badge.png";

// Utils
import { gaEvent } from "../../utils/trackEvents";

// Style
import "./TwoWeeksFreeTrialOfferModal.css";
import { CountdownContainer, CountdownTitle } from "./TwoWeeksFreeTrialOfferModalStyle";

const TwoWeeksFreeTrialOfferModal = ({ createOffer, isFetching, currentSubscription, showModal }) => {
  useEffect(() => {
    async function offer() {
      await createOffer({ offerType: "two_week_trial" });
    }
    offer();
  }, []);

  const trialOfferEndDate = () => {
    const { trial_end_at, updated_at } = currentSubscription;
    const anchorDate = trial_end_at ? trial_end_at : updated_at;
    const anchorDateDiff = moment(new Date()).diff(anchorDate, "days", true);

    const offerEndDateByAnchorDate = moment(anchorDate)
      .add(anchorDateDiff, "days")
      .add(14, "days")
      .format("MMMM Do");

    const offerEndDateByTrialEndAt = moment(trial_end_at)
      .add(14, "days")
      .format("MMMM Do");

    const offerEndDate = trial_end_at > new Date() ? offerEndDateByAnchorDate : offerEndDateByTrialEndAt;

    return {
      formatted: offerEndDate
    };
  };

  const getUserName = () => {
    const userName = localStorage.getItem("user_name");

    return userName ? `${userName}, ` : "";
  };

  const getOfferHeaderText = () => {
    const title = <div>{getUserName()}don't miss out on your FREE Spocket trial!</div>;

    return <div>{title}</div>;
  };

  const getOfferImageCaption = () => {
    return `This is a one-time offer. If you cancel before
    ${" " + trialOfferEndDate().formatted}, you won’t get charged.`;
  };

  const thirtyMinutesFromNow = () => {
    return moment()
      .add(30, "minutes")
      .valueOf();
  };

  const getBottomContents = () => {
    return (
      <Fragment>
        <img
          src={packageBadge}
          alt="Package Badge"
          className="TwoWeeksFreeTrialOfferModal__body-bottom-badge-image"
        />
        <div className="TwoWeeksFreeTrialOfferModal__body-bottom-text">
          With Spocket's fast shipping products from the US and Europe, your store gets a competitive edge to
          compete with the likes of Amazon.
        </div>
      </Fragment>
    );
  };

  const getOfferButton = () => {
    return (
      <div>
        <Button variant="primaryBig" onClick={() => goToPlanPage()}>
          Get it FREE now
        </Button>
      </div>
    );
  };

  const getCurrentPage = () => {
    return window.location.pathname.split("/")[1];
  };

  const goToPlanPage = () => {
    gaEvent({
      category: `${getCurrentPage()} page`,
      action: "Exit intent clicked"
    });

    showModal("UPGRADE_MODAL");
  };

  return (
    <ModalWrapper
      className="TwoWeeksFreeTrialOfferModal__container"
      backdropClassName="TwoWeeksFreeTrialOfferModal__backdrop"
    >
      <Loadable active={isFetching}>
        <ModalWrapper.Header>
          <div className="TwoWeeksFreeTrialOfferModal__title-container">
            <div className="TwoWeeksFreeTrialOfferModal__title">{getOfferHeaderText()}</div>
          </div>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <div className="TwoWeeksFreeTrialOfferModal__body-container">
            <div className="TwoWeeksFreeTrialOfferModal__wrapper">
              <img
                src={TwoWeeksFreeTrialOfferBackground}
                alt="Special Offer"
                className="TwoWeeksFreeTrialOfferModal__main-image"
              />
              <img
                src={TwoWeeksFreeTrialOfferBackgroundMobile}
                alt="Special Offer"
                className="TwoWeeksFreeTrialOfferModal__main-image-mobile"
              />
              <CountdownContainer>
                <CountdownTitle>
                  <Emoji label="Clock" symbol="⏰" />
                  Ends in
                </CountdownTitle>
                <Countdown splitTime endDate={thirtyMinutesFromNow()} />
              </CountdownContainer>
            </div>
            <div className="TwoWeeksFreeTrialOfferModal__body-image-caption">{getOfferImageCaption()}</div>
            <div className="TwoWeeksFreeTrialOfferModal__body-bottom-container">{getBottomContents()}</div>
            <div className="TwoWeeksFreeTrialOfferModal__footer-container">{getOfferButton()}</div>
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
)(TwoWeeksFreeTrialOfferModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/TwoWeeksFreeTrialOfferModal.js