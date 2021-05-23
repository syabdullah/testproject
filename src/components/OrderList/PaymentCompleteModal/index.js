// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import checkMark from "../../../assets/checked-1.svg";
import crossMark from "../../../assets/cross-mark-icon.svg";
import "./style.css";

import { showModal } from "../../../actions/ui";
import { featureFlagEnabled } from "../../../newDropshipperApp/utils/featureFlag";

// i18n
import { withTranslation } from "react-i18next";

class PaymentCompleteModal extends React.Component {
  static propTypes = {
    shown: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  };

  onModalClose = () => {
    this.props.close();

    const { hasReviewed, ordersCount } = this.props;
    if (hasReviewed === false && ordersCount === 0 && this.showForTestUser()) {
      setTimeout(
        () =>
          this.props.showModal("REVIEW_SPOCKET_MODAL", {
            type: "orderCheckout"
          }),
        2000
      );
    }
  };

  showForTestUser = () => {
    return featureFlagEnabled({
      name: "Review Modal",
      user: this.props.dropshipperData,
      featureFlags: this.props.featureFlags
    });
  };

  render() {
    const { t } = this.props;

    return (
      <Modal show={this.props.shown} onHide={this.onModalClose} className="PaymentComplete">
        <Modal.Header closeButton>
          {this.props.order.paymentConfirmationRequired ? (
            <img width="50px" src={crossMark} alt="Cross-mark" />
          ) : (
            <img width="50px" src={checkMark} alt="Check-mark" />
          )}
        </Modal.Header>
        <Modal.Body className="text-center">
          {this.props.order.paymentConfirmationRequired ? (
            <div>
              <h5>
                <strong>{t("PaymentCompleteModal.PaymentIncomplete")}</strong>
              </h5>
              <br />
              <p>{t("PaymentCompleteModal.PaymentIncomplete.BankRequiresConfirmation.Note")}</p>
              <p>
                <strong>
                  <a href={this.props.order.paymentConfirmationUrl} target="_blank" rel="noreferrer">
                    {t("PaymentCompleteModal.PaymentIncomplete.ConfirmationLink")}
                  </a>{" "}
                </strong>
              </p>
              <p>{t("PaymentCompleteModal.PaymentIncomplete.Note")}</p>
            </div>
          ) : (
            <div>
              <h5>
                <strong>{t("PaymentCompleteModal.PaymentCompleted")}</strong>
              </h5>
              <br />
              <p>{t("PaymentCompleteModal.PaymentCompleted.Note")}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order,
    currentPlan: state.settings.currentPlan,
    hasReviewed: state.store.information.account.review.created_at.length > 0,
    ordersCount: state.settings.dropshipperData.supplier_orders_count,
    featureFlags: state.featureFlags.featureFlags,
    dropshipperData: state.settings.dropshipperData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentCompleteModal)
);



// WEBPACK FOOTER //
// ./src/components/OrderList/PaymentCompleteModal/index.js