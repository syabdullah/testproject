// React and Redux
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";
import { browserHistory } from "react-router";
import { useTranslation } from "react-i18next";

// Components
import ModalWrapper from "../../ModalWrapper";
import Wistia from "../../../_Shared/Wistia";

// Actions
import { closeModal } from "../../../../actions/ui";

// Style
import "./WistiaModal.css";
import { Button } from "newDropshipperApp/spocketUI";

const information = t => ({
  what_is_spocket: {
    title: t("WistiaModal.WhatIsSpocket.Title"),
    text: t("WistiaModal.WhatIsSpocket.Text"),
    button: {
      text: t("WistiaModal.WhatIsSpocket.Button"),
      link: "/search"
    },
    wistiaId: "o9r124af6p"
  },
  discover_products: {
    title: t("WistiaModal.DiscoverProducts.Title"),
    text: t("WistiaModal.DiscoverProducts.Text"),
    button: {
      text: t("WistiaModal.DiscoverProducts.Button"),
      link: "/search"
    },
    wistiaId: "38cbrugfgf"
  },
  product_customization: {
    title: t("WistiaModal.ProductCustomization.Title"),
    text: t("WistiaModal.ProductCustomization.Text"),
    button: {
      text: t("WistiaModal.ProductCustomization.Button"),
      link: "/import"
    },
    wistiaId: "kats1pm9nk "
  },
  order_processing: {
    title: t("WistiaModal.OrderProcessing.Title"),
    text: t("WistiaModal.OrderProcessing.Text"),
    button: {
      text: t("WistiaModal.OrderProcessing.Button"),
      link: "/orders"
    },
    wistiaId: "tkcmsmi8f7 "
  },
  settings: {
    title: t("WistiaModal.Settings.Title"),
    text: t("WistiaModal.Settings.Text"),
    button: {
      text: t("WistiaModal.Settings.Button"),
      link: "/settings"
    },
    wistiaId: "5c3p390mrc "
  }
});

/**
 * To call this modal you need to pass the type props.
 * ex: showModal("WISTIA", { type: "what_is_spocket" })
 */
const WistiaModal = ({ dataModal, closeModal }) => {
  const { t } = useTranslation();
  const props = information(t)[dataModal.type];

  return (
    <ModalWrapper className="Wistia_Modal__container">
      <ModalWrapper.Header>
        <div className="Wistia_Modal__title">{props.title}</div>
      </ModalWrapper.Header>
      <ModalWrapper.Body>
        <Row>
          <Col md={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <Wistia videoId={props.wistiaId} />
            </div>
          </Col>
        </Row>
        <Row className="Wistia_Modal__content">
          <Col md={12}>
            <p>{props.text}</p>
          </Col>
        </Row>
        <Row className="Wistia_Modal__button">
          <Col md={12}>
            <Button
              variant="brandBig"
              onClick={() => {
                browserHistory.push(props.button.link);
                closeModal();
              }}
            >
              {props.button.text}
            </Button>
          </Col>
        </Row>
      </ModalWrapper.Body>
    </ModalWrapper>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}
function mapStateToProps(state) {
  return {
    dataModal: state.ui.data
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WistiaModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/WistiaModal/WistiaModal.js