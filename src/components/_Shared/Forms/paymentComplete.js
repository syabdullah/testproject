import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "./style.css";

// Based off of the PaymentCompleteModal

class PaymentComplete extends Component {
  render() {
    const { t } = this.props;

    if (this.props.order.paymentConfirmationRequired) {
      return (
        <div>
          <Row>
            <Col md={12}>
              <h5>
                <strong>{t("PaymentComplete.PaymentIncomplete")}</strong>
              </h5>
              <br />
              <p>{t("PaymentComplete.PaymentIncomplete.BankRequiresConfirmation.Note")}</p>
              <p>
                <strong>
                  <a href={this.props.order.paymentConfirmationUrl} target="_blank" rel="noreferrer">
                    {t("PaymentComplete.PaymentIncomplete.ConfirmationLink")}
                  </a>{" "}
                </strong>
              </p>
              <p> {t("PaymentComplete.PaymentIncomplete.Note")} </p>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row>
            <Col md={12}>
              <h5>
                <strong>{t("PaymentComplete.PaymentCompleted")}</strong>
              </h5>
              <br />
              <p>{t("PaymentComplete.PaymentCompleted.Note")}</p>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state) {
  return {
    form: state.forms,
    order: state.order
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentComplete)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Forms/paymentComplete.js