// Libs
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { default as Loadable } from "../../../components/_Shared/commonLoadable";

// Actions
import { createReview } from "../../module/store/review";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";
import { Button, Input } from "../../spocketUI";

// Style
import "./FeedbackFormModal.css";

const FeedbackFormModal = ({ createReview, isFetching, dataModal: { starReviewValue } }) => {
  const [feedback, setFeedback] = useState("");

  const isFeedbackValid = value => {
    if (value.length <= 3000) {
      setFeedback(value);
    }
  };

  return (
    <ModalWrapper className="FeedbackFormModal__container" backdropClassName="FeedbackFormModal__backdrop">
      <Loadable active={isFetching}>
        <ModalWrapper.Body>
          <div className="FeedbackFormModal__body">
            <div className="FeedbackFormModal__title">
              Thank you for rating Spocket!
              <span>Tell us about your experience. Anything that could be improved?</span>
            </div>
            <Input
              style={{ resize: "none" }}
              as="textarea"
              rows="5"
              placeholder="Your feedback (Optional)"
              onChange={e => isFeedbackValid(e.target.value)}
            />
            <Button
              onClick={() => createReview({ value: starReviewValue, feedbackText: feedback })}
              variant="primaryBig"
            >
              Send Feedback
            </Button>
          </div>
        </ModalWrapper.Body>
      </Loadable>
    </ModalWrapper>
  );
};

function mapStateToProps(state) {
  return {
    dataModal: state.ui.data,
    isFetching: state.store.review.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createReview }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackFormModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/FeedbackFormModal.js