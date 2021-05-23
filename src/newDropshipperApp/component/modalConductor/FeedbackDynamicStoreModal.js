// Libs
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { default as Loadable } from "../../../components/_Shared/commonLoadable";

// Actions
import { createReview } from "../../module/store/review";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";
import { Button } from "../../spocketUI";
import { Emoji } from "newDropshipperApp/component/Emoji";

// Images
import thankYouIllustration from "../../images/thank-you-illustration.svg";

// Utils
import { openLink } from "../../utils/openLink";
import { capitaLetter } from "../../utils/string";

// Style
import "./FeedbackDynamicStoreModal.css";

const storeLink = {
  shopify: "https://apps.shopify.com/spocket/reviews?rating=5#modal-show=ReviewListingModal",
  woocommerce: "https://wordpress.org/plugins/spocket/",
  bigcommerce: "https://www.bigcommerce.ca/apps/spocket/",
  wix: "https://www.wix.com/app-market/spocket-us-eu-dropshipping"
};

const FeedbackDynamicStoreModal = ({ createReview, isFetching }) => {
  const getStoreInfo = () => {
    const integratedStoreName = localStorage.getItem("integrated_store_name");

    return {
      link: storeLink[integratedStoreName],
      name: integratedStoreName
    };
  };
  return (
    <ModalWrapper
      className="FeedbackDynamicStoreModal__container"
      backdropClassName="FeedbackDynamicStoreModal__backdrop"
    >
      <Loadable active={isFetching}>
        <ModalWrapper.Body>
          <div className="FeedbackDynamicStoreModal__body">
            <img src={thankYouIllustration} alt="Thank you" />
            <div className="FeedbackDynamicStoreModal__title">
              <div>
                Thank you! <Emoji label="Love Emoji" symbol="♥️" />
              </div>
              <span>
                We’re so happy to know that you’re enjoying Spocket! Please take a moment to{" "}
                <a
                  href={getStoreInfo().link}
                  onClick={() => createReview({ value: 5 })}
                  target="_blank"
                  rel="noreferrer"
                >
                  share your experience
                </a>{" "}
                with other entrepreneurs on {capitaLetter(getStoreInfo().name)}.
              </span>
            </div>

            <Button
              onClick={() => {
                createReview({ value: 5 });
                openLink(getStoreInfo().link);
              }}
              variant="primaryBig"
            >
              Rate Spocket on {capitaLetter(getStoreInfo().name)}
            </Button>
          </div>
        </ModalWrapper.Body>
      </Loadable>
    </ModalWrapper>
  );
};

function mapStateToProps(state) {
  return {
    isFetching: state.store.review.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createReview }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackDynamicStoreModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/FeedbackDynamicStoreModal.js