// Libs
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import { showModal } from "../../../actions/ui";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";

// Images
import yayIllustrationBackground from "../../images/yay-illustration-bg.svg";
import checkmark from "../../images/icon-checkMark-green.svg";
import starNoGood from "../../images/star-no-good.svg";
import starBad from "../../images/star-bad.svg";
import starOkay from "../../images/star-okay.svg";
import starGood from "../../images/star-good.svg";
import starLoveIt from "../../images/star-love-it.svg";

// Style
import "./ReviewSpocketModal.css";

const rateStars = [
  { icon: starNoGood, text: "Not good" },
  { icon: starBad, text: "Bad" },
  { icon: starOkay, text: "Okay" },
  { icon: starGood, text: "Good" },
  { icon: starLoveIt, text: "Love it" }
];

const ReviewSpocketModal = ({ showModal, dataModal: { type } }) => {
  return (
    <ModalWrapper className="ReviewSpocketModal__container" backdropClassName="ReviewSpocketModal__backdrop">
      <ModalWrapper.Body>
        <div className="ReviewSpocketModal__body">
          <div className="ReviewSpocketModal__title">
            Congratulations!
            <span>
              <img src={checkmark} alt="checkmark" />

              {type === "pushProduct" && " Your product has been pushed to your store!"}
              {type === "orderCheckout" && " Your order has been placed!"}
              {type === "firstSearch" && " You are on your way to building your empire"}
            </span>
          </div>

          <div className="ReviewSpocketModal__body-review-box">
            <div className="ReviewSpocketModal__body-review-title">
              How was Spocket?
              <span>Rate your experience</span>
            </div>
            <div className="ReviewSpocketModal__stars-container">
              {rateStars.map((star, index) => {
                return (
                  <div
                    className="ReviewSpocketModal__star"
                    onClick={() => {
                      if (index === 4) {
                        showModal("FEEDBACK_DYNAMIC_STORE", {
                          starReviewValue: 5
                        });
                      } else {
                        showModal("FEEDBACK_FORM_MODAL", {
                          starReviewValue: index + 1
                        });
                      }
                    }}
                  >
                    <img src={star.icon} alt={star.text} />
                    <div>{star.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <img className="ReviewSpocketModal__img-bg" src={yayIllustrationBackground} alt="Background" />
      </ModalWrapper.Body>
    </ModalWrapper>
  );
};

function mapStateToProps(state) {
  return {
    dataModal: state.ui.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewSpocketModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/ReviewSpocketModal.js