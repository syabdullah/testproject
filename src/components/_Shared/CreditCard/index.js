import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, ControlLabel, Row, FormControl } from "react-bootstrap";
import { Button } from "../../../newDropshipperApp/spocketUI";

import { getPaymentSettings } from "../../../actions/settings";
import UpdateCreditCardModal from "./UpdateCreditCardModal";
import { getSetupIntent } from "../../../newDropshipperApp/module/stripeIntegration/setupIntent";

import { withTranslation } from "react-i18next";

import "./style.css";
class CreditCard extends Component {
  static propTypes = {
    renderModal: PropTypes.bool,
    includeSubtext: PropTypes.bool,
    openCreditCardUpdate: PropTypes.bool,
    hideButtons: PropTypes.bool,
    handleStripeCardAssignment: PropTypes.func,
    stripeApiKey: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    stripeApiKey: process.env.REACT_APP_STRIPE_KEY,
    type: "v1"
  };

  state = {
    card: {},
    cardLoaded: false,
    isUpdateCreditCardModalOpen: false
  };

  async componentDidMount() {
    await this.getCreditCard();
  }

  getCreditCard() {
    this.props.getPaymentSettings(this.props.type).then(cards => {
      if (cards.json.length) {
        const card = cards.json.slice(-1)[0];
        this.updateCreditCard(card);
        this.setState({ cardLoaded: true });
        if (this.props.handleStripeCardAssignment) {
          this.props.handleStripeCardAssignment({
            cardId: card.id,
            last4: card.last4
          });
        }
      } else {
        this.getSetupIntent(this.props.type);
        this.updateCreditCard({});
        this.setState({ cardLoaded: true });
      }
    });
  }

  updateCreditCard(card) {
    this.setState({ card });
  }

  // Modals
  closeUpdateCreditCardModal() {
    this.setState({ isUpdateCreditCardModalOpen: false });
  }

  openUpdateCreditCardModal() {
    this.setState({ isUpdateCreditCardModalOpen: true });
    this.getSetupIntent(this.props.type);
  }

  getSetupIntent() {
    this.props.getSetupIntent(this.props.type).then(response => {
      this.setState({ token: response.json.token });
    });
  }

  renderUpdateCreditCardModal() {
    return (
      <UpdateCreditCardModal
        isOpen={this.state.isUpdateCreditCardModalOpen}
        closeFn={() => this.closeUpdateCreditCardModal()}
        card={this.state.card}
        updateCard={() => this.getCreditCard()}
        renderModal={this.props.renderModal}
        includeSubtext={this.props.includeSubtext}
        openCreditCardUpdate={this.props.openCreditCardUpdate}
        hideButtons={this.props.hideButtons}
        afterSubmit={this.props.afterSubmit}
        intentToken={this.state.token}
        stripeApiKey={this.props.stripeApiKey}
        type={this.props.type}
      />
    );
  }

  renderCreditCardUpdate() {
    const { renderModal, t } = this.props;
    if (this.state.isUpdateCreditCardModalOpen && !renderModal) {
      return false;
    }
    return (
      <div className="credit_card__update_container">
        <div className="credit_card__update_card_input">
          {this.props.hideLabel === false && (
            <ControlLabel className="">{t("CreditCard.Update.Label")}</ControlLabel>
          )}
          <FormControl
            type="text"
            disabled
            value={`${t("CreditCard.Update.InputValue")} ${this.state.card.last4}`}
          />
        </div>
        <div>
          <Button
            bsStyle="primary"
            bsSize="sm"
            className="credit_card__update_card_btn"
            onClick={() => this.openUpdateCreditCardModal()}
          >
            {t("CreditCard.Update.Button")}
          </Button>
        </div>
      </div>
    );
  }

  renderAddCreditCard() {
    const { renderModal, t, type } = this.props;
    if (this.state.isUpdateCreditCardModalOpen && !renderModal) {
      return false;
    }
    return (
      <div>
        <Row>
          <Col md={12}>
            <p data-cy="credit-card-text" className="panel-text">
              {t(
                type === "v2" ? "CreditCard.AddCreditCard.Text" : "CreditCard.AddCreditCardSubscription.Text"
              )}
            </p>
          </Col>
        </Row>
        <Row data-cy="add-credit-card-button">
          <Col md={6}>
            <Button bsStyle="success" bsSize="sm" onClick={() => this.openUpdateCreditCardModal()}>
              {t("CreditCard.AddCreditCard.Button")}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.cardLoaded &&
          !this.props.openCreditCardUpdate &&
          (Object.keys(this.state.card).length ? this.renderCreditCardUpdate() : this.renderAddCreditCard())}

        {(this.state.isUpdateCreditCardModalOpen || this.props.openCreditCardUpdate) &&
          this.renderUpdateCreditCardModal()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSetupIntent,
      getPaymentSettings
    },
    dispatch
  );
}

export default withTranslation()(
  connect(
    null,
    mapDispatchToProps
  )(CreditCard)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/CreditCard/index.js