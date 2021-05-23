// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Modal, Col, Row, ControlLabel } from "react-bootstrap";
import { Button } from "../../../newDropshipperApp/spocketUI";
import "./style.css";
import { getPaymentSettings, updatePaymentSettings } from "../../../actions/settings";
import { isUpgrading } from "../../../actions/upgrade";
import { updatePaywallView } from "../../../actions/tracker";
import { withTranslation } from "react-i18next";

class UpdateCreditCardModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    updateCard: PropTypes.func.isRequired,
    renderModal: PropTypes.bool,
    includeSubtext: PropTypes.bool,
    stripeApiKey: PropTypes.string,
    type: PropTypes.string
  };

  state = {
    inProgress: false
  };

  /*eslint-disable */
  async componentDidMount() {
    await this.props.getPaymentSettings(this.props.type);
    await this.createStripeElement();
  }

  getPaymentFormId() {
    return `payment-form-${this.props.type}`;
  }

  getCardElementId() {
    return `card-element-${this.props.type}`;
  }

  getCardErrorsId() {
    return `card-errors-${this.props.type}`;
  }

  createStripeElement() {
    const stripeOptions = { apiVersion: "2019-12-03" };
    const stripe = Stripe(this.props.stripeApiKey, stripeOptions);
    const elements = stripe.elements();
    const card = elements.create("card");
    card.mount(`#${this.getCardElementId()}`);
    const self = this;

    card.addEventListener("change", event => {
      const displayError = document.getElementById(this.getCardErrorsId());
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });

    const form = document.getElementById(this.getPaymentFormId());
    form.addEventListener("submit", event => {
      if (!["/settings/payment"].includes(window.location.pathname))
        this.props.updatePaywallView({
          upgradeStep: "added_credit_card",
          eventId: this.props.eventId
        });
      self.setState({ inProgress: true });
      this.props.isUpgrading(true);
      event.preventDefault();

      stripe
        .handleCardSetup(this.props.intentToken, card, {
          payment_method_data: {}
        })
        .then(result => {
          if (result.error) {
            const errorElement = document.getElementById(this.getCardErrorsId());
            errorElement.textContent = result.error.message;
            self.setState({ inProgress: false });
            this.props.isUpgrading(false);
          } else {
            self.stripeTokenHandler(result.setupIntent.payment_method);
          }
        });
    });
  }

  stripeTokenHandler = token => {
    const form = document.getElementById(this.getPaymentFormId());
    const hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "stripeToken");
    hiddenInput.setAttribute("value", token);
    form.appendChild(hiddenInput);

    this.props.updatePaymentSettings(token, this.props.type).then(() => {
      this.props.hideButtons && this.props.afterSubmit();
      !this.props.hideButtons && this.props.isUpgrading(false);
      this.props.updateCard();
      this.props.closeFn();
    });
  };

  renderStripeField = () => {
    const { t } = this.props;

    return (
      <section className="Update_Credit_Card__container" data-cy="update-credit-card-modal">
        <Row className="pull-left">
          <Col md={12}>
            <ControlLabel>{t("UpdateCreditCardModal.Label.CreditCard")}</ControlLabel>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <form id={this.getPaymentFormId()}>
              <div id={this.getCardElementId()} className="mb-10" />
              <div id={this.getCardErrorsId()} className="mb-20 mt-20" />
              {!this.props.openCreditCardUpdate &&
                !this.props.hideButtons && (
                  <span className="credit_card__update__card">
                    <Button
                      className="pull-right btn btn-sm btn-success"
                      bsStyle={Object.keys(this.props.card).length ? "primary" : "success"}
                      bsSize="sm"
                      type="submit"
                      disabled={this.state.inProgress}
                    >
                      {Object.keys(this.props.card).length
                        ? t("UpdateCreditCardModal.Button.UpdateCard")
                        : t("UpdateCreditCardModal.Button.AddCreditCard")}
                    </Button>
                    <Button
                      className="pull-right btn btn-sm btn-default"
                      bsSize="sm"
                      onClick={this.props.closeFn}
                    >
                      {t("UpdateCreditCardModal.Button.Cancel")}
                    </Button>
                  </span>
                )}
            </form>
          </Col>
        </Row>
        {this.props.includeSubtext && (
          <Row>
            <Col md={12}>
              <p className="panel-text mt-20">
                {t("UpdateCreditCardModal.Label.TermsAndConditionsNote.One")}{" "}
                <a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer">
                  {t("UpdateCreditCardModal.Label.TermsAndConditionsNote.Two")}
                </a>{" "}
                {t("UpdateCreditCardModal.Label.TermsAndConditionsNote.Three")}
              </p>
            </Col>
          </Row>
        )}
      </section>
    );
  };

  /*===============================
  =            Renders            =
  ===============================*/
  render() {
    if (this.props.renderModal) {
      return (
        <Modal
          show={true}
          onHide={this.props.closeFn}
          bsSize="small"
          backdropClassName="update_credit_card__backdrop"
          dialogClassName="update_credit_card__dialog"
          animation={false}
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.t("UpdateCreditCardModal.Label.UpdateCardDetails")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">{this.renderStripeField()}</Modal.Body>
        </Modal>
      );
    } else {
      return this.renderStripeField();
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updatePaymentSettings,
      getPaymentSettings,
      isUpgrading,
      updatePaywallView
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    hasStripe: state.settings.stripeCustomerId,
    eventId: state.eventTracker.eventId
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateCreditCardModal)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/CreditCard/UpdateCreditCardModal.js