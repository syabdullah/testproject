// React and Redux
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Components
import ModalWrapper from "../../ModalWrapper";

// Illustration
import infoIcon from "../../../../assets/grey-info-icon.svg";
// import mailIcon from "../../../../assets/grey-mail-icon.svg";
import facebookIcon from "../../../../assets/grey-facebook-icon.svg";

// Icons
import tutorialSpocketIcon from "../../../../assets/tutorial-icon-1.png";
import tutorialProductIcon from "../../../../assets/tutorial-icon-2.png";
import tutorialCustomizationIcon from "../../../../assets/tutorial-icon-3.png";
import tutorialOrderIcon from "../../../../assets/tutorial-icon-4.png";

// Actions
import { closeModal, showModal } from "../../../../actions/ui";

// Utils
import { openLink } from "../../../../newDropshipperApp/utils/openLink";

// Style
import "./TutorialModal.css";

const TutorialModal = ({ showModal }) => {
  const { t } = useTranslation();
  return (
    <ModalWrapper className="Tutorial_Modal__container">
      <ModalWrapper.Header>
        <div className="Tutorial_Modal__title">{t("TutorialModal.Title")}</div>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <div className="Tutorial_modal__videos">
          <Row onClick={() => showModal("WISTIA", { type: "what_is_spocket" })}>
            <Col md={12} className="Tutorial_Modal__video_line">
              <img src={tutorialSpocketIcon} alt="Tutorial Spocket Icon" />
              <div>
                <div>{t("TutorialModal.WhatIsSpocket")}</div>
                <div>01:30</div>
              </div>
            </Col>
          </Row>
          <Row onClick={() => showModal("WISTIA", { type: "discover_products" })}>
            <Col md={12} className="Tutorial_Modal__video_line">
              <img src={tutorialProductIcon} alt="Tutorial Product Icon" />
              <div>
                <div>{t("TutorialModal.DiscoverProducts")}</div>
                <div>01:18</div>
              </div>
            </Col>
          </Row>
          <Row onClick={() => showModal("WISTIA", { type: "product_customization" })}>
            <Col md={12} className="Tutorial_Modal__video_line">
              <img src={tutorialCustomizationIcon} alt="Tutorial Customization Icon" />
              <div>
                <div>{t("TutorialModal.ProductCustomization")}</div>
                <div>02:04</div>
              </div>
            </Col>
          </Row>
          <Row onClick={() => showModal("WISTIA", { type: "order_processing" })}>
            <Col md={12} className="Tutorial_Modal__video_line">
              <img src={tutorialOrderIcon} alt="Tutorial Order Icon" />
              <div>
                <div>{t("TutorialModal.OrderProcessing")}</div>
                <div>01:02</div>
              </div>
            </Col>
          </Row>
          <div
            onClick={() => showModal("WISTIA", { type: "settings" })}
            className="Tutorial_Modal__video_last-line"
          >
            <div md={12} className="Tutorial_Modal__video_line">
              <img src={tutorialOrderIcon} alt="Tutorial Order Icon" />
              <div>
                <div>{t("TutorialModal.Settings")}</div>
                <div>02:11</div>
              </div>
            </div>
          </div>
        </div>
        <div className="Tutorial_modal__options">
          <div
            onClick={() =>
              openLink(
                "https://help.spocket.co/spocket-for-dropshippers?utm_source=SpocketApp&utm_medium=Get_Help_Navigation"
              )
            }
          >
            <img src={infoIcon} alt="Info Icon" />
            {t("TutorialModal.GetHelp")}
          </div>
          {/* <div
              onClick={() =>
                openInNewTab("mailto:support@spocket.co?Subject=Hello", "_top")
              }
            >
              <img src={mailIcon} alt="Mail Icon" />
              Email Us
            </div> */}
          <div onClick={() => openLink("http://bit.ly/2TETzDb")}>
            <img src={facebookIcon} alt="" />
            {t("TutorialModal.JoinTheCommunity")}
          </div>
        </div>
      </ModalWrapper.Body>
    </ModalWrapper>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal, showModal }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(TutorialModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/TutorialModal/TutorialModal.js