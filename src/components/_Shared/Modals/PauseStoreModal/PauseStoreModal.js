// Libs
import React, { useState, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

// Actions
import { pauseStore } from "../../../../newDropshipperApp/module/store/pause";
import { fetchDropshipperData } from "../../../../actions/settings";

// Components
import ModalWrapper from "../../ModalWrapper";
import { default as Loadable } from "../../../_Shared/commonLoadable";

// Images
import pauseStoreBanner from "../../../../newDropshipperApp/images/pause-store.png";
import pauseStoreConfirmationBanner from "../../../../newDropshipperApp/images/pause-store-confirmation.png";
import checkIcon from "../../../../newDropshipperApp/images/check-icon-purple.svg";

// Style
import "./PauseStoreModal.css";
import { Button } from "newDropshipperApp/spocketUI";

function PauseStoreModal({ pauseStore, fetchDropshipperData, storeHasBeenPausedOnce }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitPauseStore = async () => {
    setIsSubmitting(true);
    try {
      await pauseStore();
      await fetchDropshipperData();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };
  const { t } = useTranslation();

  return (
    <ModalWrapper size="md pause-store-modal-size">
      <Loadable active={isSubmitting}>
        <ModalWrapper.Header>
          <div className="pause-store-modal__header">
            {storeHasBeenPausedOnce ? (
              <Fragment>
                <img src={pauseStoreConfirmationBanner} alt="Pause Store" />
                <img
                  className="pause-store-modal__check-img"
                  src={checkIcon}
                  alt="Pause Store Confirmation Check "
                />
              </Fragment>
            ) : (
              <img src={pauseStoreBanner} alt="Pause Store Confirmation" />
            )}
          </div>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <div className="pause-store-modal__container">
            {storeHasBeenPausedOnce ? (
              <p>{t("PauseStoreModal.Description.StorePaused")}</p>
            ) : (
              <Fragment>
                <div className="pause-store-modal__title">{t("PauseStoreModal.Title.PauseYourStore")}</div>
                <p>{t("PauseStoreModal.Description.PauseYourStore")}</p>
                <footer>
                  <Button variant="brandBig" disabled={isSubmitting} onClick={() => submitPauseStore()}>
                    {t("PauseStoreModal.Button.PauseStore")}
                  </Button>
                </footer>
              </Fragment>
            )}
          </div>
        </ModalWrapper.Body>
      </Loadable>
    </ModalWrapper>
  );
}

function mapStateToProps(state) {
  return {
    storeHasBeenPausedOnce: state.settings.dropshipperData.has_been_paused_once || false
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pauseStore, fetchDropshipperData }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PauseStoreModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/PauseStoreModal/PauseStoreModal.js