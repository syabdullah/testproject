import React from "react";
import moment from "moment";
import { connect } from "react-redux";

import Countdown from "../_Shared/Countdown/Countdown";
import exclamationPurple from "../../assets/exclamation-purple.svg";
import exclamationOrange from "../../assets/exclamation-orange.svg";
import exclamationRed from "../../assets/exclamation-red.svg";
import premiumIcon from "../../assets/premium-icon.svg";
import productIcon from "../../assets/product-icon.svg";
import invoiceIcon from "../../assets/invoice-icon.svg";
// import discountIcon from "../../assets/discount-icon.svg";
import chatIcon from "../../assets/chat-icon.svg";

import { browserHistory } from "react-router";

import "./style.css";

const CardDeclineError = props => {
  const { currentSubscription } = props;
  const stepOne = currentSubscription && currentSubscription.retry_count === 1;
  const stepTwo = currentSubscription && currentSubscription.retry_count === 2;
  const stepThree = currentSubscription && currentSubscription.retry_count >= 3;

  function cardErrorBannerClass() {
    if (stepOne) {
      return "error-try-one";
    } else if (stepTwo) {
      return "error-try-two";
    } else if (stepThree) {
      return "error-try-three";
    }
  }

  function cardErrorBannerText() {
    if (stepOne) {
      return (
        <div className="text-lines">
          <span className="line-one">Oh no! We tried to process a charge but your card was declined.</span>
          <span className="line-two">
            Please contact your bank or update your card info to continue enjoying all our powerful premium
            features.
          </span>
        </div>
      );
    } else if (stepTwo) {
      return (
        <div className="text-lines">
          <span className="line-one">Hey! We retried the charge but your card was declined again.</span>
          <span className="line-two">
            Please contact your bank or update your card to avoid losing access to all our powerful premium
            features.
          </span>
        </div>
      );
    } else if (stepThree) {
      return (
        <div className="text-lines">
          <span className="line-one">Alert: We could not process your charge. Action Required!</span>
          <span className="line-two">Please contact your bank or update your card info ASAP.</span>
        </div>
      );
    }
  }

  function revertTextAndIcons() {
    if (stepThree) {
      return (
        <div className="revert-text-wrapper">
          <span className="or-basic-account">Or you will be reverted to the basic account with:</span>
          <ul className="benefits-list">
            <li className="benefits-list-text" key="No premium products">
              <img src={premiumIcon} alt="icon" className="revert-icon" />
              <span>No premium products</span>
            </li>
            <li className="benefits-list-text" key="25 products limit">
              <img src={productIcon} alt="icon" className="revert-icon" />
              <span>25 products limit</span>
            </li>
            {/* <li
              className="benefits-list-text"
              key="No extra discounted products"
            >
              <img src={discountIcon} alt="icon" className="revert-icon" />
              <span>No extra discounted products</span>
            </li> */}
            <li className="benefits-list-text" key="No branded invoices">
              <img src={invoiceIcon} alt="icon" className="revert-icon" />
              <span>No branded invoices</span>
            </li>
            <li className="benefits-list-text" key="No chat support">
              <img src={chatIcon} alt="icon" className="revert-icon" />
              <span>No chat support</span>
            </li>
          </ul>
        </div>
      );
    }
  }

  function cardErrorBannerIcon() {
    if (stepOne) {
      return exclamationPurple;
    } else if (stepTwo) {
      return exclamationOrange;
    } else if (stepThree) {
      return exclamationRed;
    }
  }

  if (currentSubscription && currentSubscription.overdue_reason && currentSubscription.next_try_at) {
    const formatedDate = moment(currentSubscription.next_try_at);
    const endDate = new Date(formatedDate).getTime();
    return (
      <div className={`CardDeclineError ${cardErrorBannerClass()}`}>
        <div className="CardDeclineError_wrapper">
          <div className="CardDeclineError_text_and_icon">
            <img src={cardErrorBannerIcon()} alt="icon" className="icon" />
            {cardErrorBannerText()}
          </div>
          <div className="button-countdown">
            <Countdown endDate={endDate} />
            <button
              onClick={() => {
                browserHistory.push("/settings/payment");
              }}
              className="update-card-btn"
            >
              Update Card
            </button>
          </div>
        </div>

        {revertTextAndIcons()}
      </div>
    );
  } else {
    return null;
  }
};

function mapStateToProps(state) {
  return { currentSubscription: state.settings.currentSubscription };
}

export default connect(
  mapStateToProps,
  {}
)(CardDeclineError);



// WEBPACK FOOTER //
// ./src/components/CardDeclineError/CardDeclineError.js