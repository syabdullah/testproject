// Libs
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment-timezone";

// Components
import ModalWrapper from "../../ModalWrapper";

// Actions
import { closeModal } from "../../../../actions/ui";
import StoreApiCall from "../../../../utils/storeApiCall";
import { verifyAuth } from "../../../../actions/index";

// Images
import spocketLogo from "../../../../assets/spocket-logo-no-text.svg";

// Utils
import { openLink } from "../../../../newDropshipperApp/utils/openLink";

// Style
import "./RatingCaptureModal.css";
import { useTranslation } from "react-i18next";

const shopifyUrl = "https://apps.shopify.com/spocket/reviews?rating=5#modal-show=ReviewListingModal";

const wooCommerceUrl = "https://wordpress.org/plugins/spocket/";

const bigcommerceUrl = "https://www.bigcommerce.ca/apps/spocket/";

const wixUrl = "https://www.wix.com/app-market/spocket-us-eu-dropshipping";

const facebookUrl = "https://www.facebook.com/pg/spocketofficial/reviews/";

const ecwid = "https://www.ecwid.com/apps/featured/spocket";

const squarespace = "https://www.squarespace.com/extensions/details/spocket";

const RatingCaptureModal = ({ closeModal, verifyAuth, dataModal }) => {
  const { t } = useTranslation();
  let url = null;

  switch (dataModal.integratedStoreName) {
    case "shopify":
      url = shopifyUrl;
      break;
    case "woocommerce":
      url = wooCommerceUrl;
      break;
    case "bigcommerce": // TODO: Update when BigCommerce app is live
      url = bigcommerceUrl;
      break;
    case "wix":
      url = wixUrl;
      break;
    case "squarespace":
      url = squarespace;
      break;
    case "ecwid":
      url = ecwid;
      break;
    default:
      url = facebookUrl;
  }

  const starsClassName = [5, 4, 3, 2, 1];

  const storeApiCallPersonalization = review_value => {
    return StoreApiCall.personalization({
      has_clicked_to_review_at: moment.tz(new Date().getTime(), "GMT").format(),
      review_value
    }).then(() => {
      verifyAuth();
    });
  };

  return (
    <Fragment>
      <ModalWrapper size="RatingCaptureModal__size" backdrop="static" keyboard={false}>
        <ModalWrapper.Header />
        <ModalWrapper.Body>
          <div className="RatingCaptureModal__body">
            <img src={spocketLogo} alt="Spocket Logo" />

            <div className="RatingCaptureModal__title">
              {t("RatingCaptureModal.EnjoyingSpocket")}
              <span>{t("RatingCaptureModal.TapAStar")}</span>
            </div>
            <div className="RatingCapture__stars">
              {starsClassName.map(star => {
                return (
                  <span
                    className={`RatingCapture__${star}`}
                    key={star}
                    onClick={() => {
                      star === 5 && openLink(url);
                      storeApiCallPersonalization(star);
                      closeModal();
                    }}
                  />
                );
              })}
            </div>
          </div>
        </ModalWrapper.Body>
      </ModalWrapper>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    dataModal: state.ui.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal, verifyAuth }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatingCaptureModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/RatingCaptureModal/RatingCaptureModal.js