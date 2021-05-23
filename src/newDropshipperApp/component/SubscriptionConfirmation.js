// Libs
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import { Emoji } from "newDropshipperApp/component/Emoji";

// Style
import "./StickyBar.css";

const SubscriptionConfirmation = ({ confirmationUrl, subscriptionPending }) => {
  if (confirmationUrl && subscriptionPending) {
    return (
      <div className="sticky-bar__container">
        <Emoji label="Wave hand" symbol="⚠️ " />
        <a href={confirmationUrl} target="_blank" className="confirmation-link" rel="noreferrer">
          Please click to confirm your payment and start your subscription
        </a>
      </div>
    );
  }

  return null;
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  const subscription = state.settings.currentSubscription;
  return {
    confirmationUrl: subscription && subscription.confirmation_url,
    subscriptionPending: subscription && subscription.status === "pending"
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionConfirmation);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/SubscriptionConfirmation.js