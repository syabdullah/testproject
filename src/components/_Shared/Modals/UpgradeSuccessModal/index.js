// React and Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";
import { default as Loadable } from "../../commonLoadable";

// Components
import ModalWrapper from "../../ModalWrapper";

// Illustration
import congratulationIllustration from "../../../../assets/congratulation.svg";

// Actions
import { showModal } from "../../../../actions/ui";

// i18n
import { withTranslation } from "react-i18next";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

// Style
import "./style.css";
import { StyledButton } from "./UpgradeSuccessModal.style";

const UpgradeSuccessModalAnalyticsWrapper = props => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  return <UpgradeSuccessModal {...props} track={track} />;
};

class UpgradeSuccessModal extends Component {
  state = { loading: false };

  // Trigger the plan_upgraded analytics track
  componentDidMount() {
    this.props.track("upgrade__plan-upgraded");
    this.props.track("upgrade__success-congratulations-modal");
  }

  handleButtonClick = () => {
    this.setState({ loading: true });
    this.props.showModal("UPGRADE_REASON", {
      plan: this.props.dataModal.plan
    });
  };

  render() {
    const { features, alias } = this.props.dataModal.plan;
    const { t } = this.props;

    return (
      <ModalWrapper
        size="large Upgrade_Success_Modal__body"
        keyboard={false}
        onHide={() =>
          this.props.showModal("UPGRADE_SUCCESS", {
            plan: this.props.dataModal.plan
          })
        }
      >
        <Loadable active={this.state.loading}>
          <ModalWrapper.Body>
            <Row>
              <Col className="Upgrade_Success_Modal__body_left" md={5} sm={12}>
                <img src={congratulationIllustration} alt="" />
              </Col>
              <Col md={7} sm={12} className="Upgrade_Success_Modal__body_right">
                <Row>
                  <Col className="Upgrade_Success_Modal__title" md={12}>
                    {t("UpgradeSuccessModal.Col.One.A")} <br />{" "}
                    {t("UpgradeSuccessModal.Col.One.B", { alias })}
                  </Col>
                </Row>
                <Row>
                  <Col className="Upgrade_Success_Modal__subtitle" md={12}>
                    {t("UpgradeSuccessModal.Col.Two.A")} <br /> <br />
                    <span>
                      {t("UpgradeSuccessModal.Col.Two.B")}
                      <span className="Upgrade_Success_Modal__subtitle-features">
                        {features[0].name}, {features[1].name},{alias !== "Starter" && " Branded Invoicing"}{" "}
                        and {features[4].name}.
                      </span>
                      {t("UpgradeSuccessModal.Col.Two.C")}
                    </span>
                  </Col>
                </Row>
                <Row className="Upgrade_Success_Modal__feature_list">
                  <Col md={12} className="Upgrade_Success_Modal__button" data-cy="upgradeSucessModal">
                    <StyledButton variant="brandBig" onClick={this.handleButtonClick}>
                      {t("UpgradeSuccessModal.Button")}
                    </StyledButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalWrapper.Body>
        </Loadable>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}
function mapStateToProps(state) {
  return {
    dataModal: state.ui.data,
    subscriptionId: state.settings.currentSubscription.id
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpgradeSuccessModalAnalyticsWrapper)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/UpgradeSuccessModal/index.js