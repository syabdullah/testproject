// React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";

// Components
import ModalWrapper from "../../ModalWrapper";
import CreditCard from "../../../_Shared/CreditCard";

// Actions
import { closeModal } from "../../../../actions/ui";
// Icons
import moneyIcon from "../../../../assets/money-icon.svg";

// Style
import "./style.css";

class CreditCardModal extends Component {
  static propTypes = {
    stripeApiKey: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    stripeApiKey: process.env.REACT_APP_STRIPE_KEY,
    type: "v1"
  };

  render() {
    return (
      <ModalWrapper size="small Credit_Card_modal__size">
        <ModalWrapper.Header>
          <img src={moneyIcon} alt="Money icon" style={{ marginRight: "15px" }} />
          Credit Card Details
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <Col md={12}>
            <Row>
              <div style={{ marginBottom: "25px" }}>
                <CreditCard type={this.props.type} stripeApiKey={this.props.stripeApiKey} />
              </div>
            </Row>
          </Col>
        </ModalWrapper.Body>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(CreditCardModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/CreditCardModal/index.js