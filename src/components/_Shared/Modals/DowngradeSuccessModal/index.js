// React and Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";
import { browserHistory } from "react-router";

// Components
import ModalWrapper from "../../ModalWrapper";

// Illustration
import downgradeIllustration from "../../../../assets/downgrade-illustration.svg";

// Actions
import { closeModal } from "../../../../actions/ui";

// i18n
import { withTranslation } from "react-i18next";

// Style
import "./style.css";

class DowngradeSuccessModal extends Component {
  render() {
    const { t } = this.props;

    return (
      <ModalWrapper
        size="Downgrade_Success_Modal__size"
        onHide={() => {
          browserHistory.push("/settings/plan");
          window.location.reload();
        }}
      >
        <ModalWrapper.Header>
          <Row className="Downgrade_Success_Modal__header">
            <Col md={12}>{t("DowngradeSuccessModal.Header")}</Col>
          </Row>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <Row>
            <Col md={12} className="Downgrade_Success_Modal__illustration">
              <img src={downgradeIllustration} alt="Downgrade illustration" />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="Downgrade_Success_Modal__body">
              {t("DowngradeSuccessModal.Body")}
            </Col>
          </Row>
        </ModalWrapper.Body>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

export default withTranslation()(
  connect(
    null,
    mapDispatchToProps
  )(DowngradeSuccessModal)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/DowngradeSuccessModal/index.js