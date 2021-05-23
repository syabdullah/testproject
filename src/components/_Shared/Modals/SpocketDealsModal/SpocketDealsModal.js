// React and Redux
import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";

// Components
import ModalWrapper from "../../ModalWrapper";

// Actions
import { showModal } from "../../../../actions/ui";

// Utils
import { openLink } from "../../../../newDropshipperApp/utils/openLink";
import { isSubscriptionOverdue } from "../../../../newDropshipperApp/utils/user";

// Style
import "./SpocketDealsModal.css";
import { Button } from "newDropshipperApp/spocketUI";

class SpocketDealsModal extends Component {
  render() {
    const { app, currentPlan, showModal } = this.props;
    return (
      <ModalWrapper size="spocket-deals__modal-size">
        <ModalWrapper.Header>
          <Row>
            <Col md={12}>
              <div className="spocket-deals__modal-header">
                <span className="spocket-deals__modal-header-text">
                  <img src={app.img} alt="App Logo" />
                  <div>
                    <div>{app.name}</div>
                    <div>{app.title}</div>
                  </div>
                </span>
                <Button
                  variant="brandBig"
                  onClick={() => {
                    if (currentPlan === "Basic") {
                    } else if (isSubscriptionOverdue()) {
                      showModal("CARD_DECLINE");
                    } else {
                      openLink(app.link);
                    }
                  }}
                >
                  Get the Deal
                </Button>
              </div>
              {app.coupon &&
                currentPlan !== "Basic" && (
                  <div className="spocket-deals__modal-header-coupon">
                    Use code "<strong>{app.coupon}</strong>"
                  </div>
                )}
            </Col>
          </Row>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <Row>
            <Col md={12} className="spocket-deals__modal-body">
              <div className="spocket-deals__modal-body-headine">{app.headine}</div>
              <div className="spocket-deals__modal-body-benefits">
                <div className="spocket-deals__modal-body-benefits-header">Benefits:</div>
                {app.benefits.map((benefit, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className="spocket-deals__modal-body-benefits-title"
                        dangerouslySetInnerHTML={{ __html: benefit.title }}
                      />
                      <div className="spocket-deals__modal-body-benefits-text">{benefit.text}</div>
                    </Fragment>
                  );
                })}
              </div>
            </Col>
          </Row>
        </ModalWrapper.Body>
      </ModalWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.ui.data.app,
    currentPlan: state.settings.currentPlan.name
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpocketDealsModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/SpocketDealsModal/SpocketDealsModal.js