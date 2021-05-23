import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import ApiCall from "../../../utils/apiCall";
import { default as Loadable } from "../commonLoadable";
import React, { Component } from "react";
import { setAlertMessage } from "../../../actions";
import tooltip from "../../../assets/tooltip.svg";
import { withTranslation } from "react-i18next";
import "./style.css";

class OrderReview extends Component {
  state = {
    subtotal: "",
    shipping: "",
    tax: "",
    total: "",
    isLoading: true
  };

  componentDidMount() {
    this.paymentRequest();
  }

  paymentRequest() {
    const form = this.props.form;
    const address = form.inputAddress;

    ApiCall.post("/stores/orders/sample/payment_request", {
      integrated_store_id: localStorage.getItem("integrated_store_id"),
      listing_id: form.listingSelected.id,
      variation_id: form.productSelected.id,
      quantity: form.quantity,
      phone_number: address.phone,
      address: {
        ...address
      }
    })
      .then(({ status, json }) => {
        this.setState({
          subtotal: json.subtotal,
          shipping: json.shipping,
          taxes_and_fees: json.taxes_and_fees,
          total: json.total,
          isLoading: false
        });
        this.props.handleOrderReviewLoaded(true);
      })
      .catch(error => {
        this.setState({ isLoading: false });
        this.props.setAlertMessage(error.json.errors, "error");
      });
  }

  render() {
    const { form, t } = this.props;
    return (
      <div>
        <Row>
          <Col md={12}>
            <label>{t("OrderReview.OrderDetails")}</label>
            <p>
              <span className="Order_Review__product pull-left">{form.listingSelected.title}</span>
              <span className="pull-right">{t("OrderReview.Unit", { count: form.quantity })}</span>
              <br />
              <sub className="Order_Review__characteristics">{form.characteristics}</sub>
              <br />
              <span style={{ marginTop: "15px" }} className="Order_Review__product pull-left">
                {form.productVariation.note}
              </span>
            </p>
          </Col>

          <Col md={12} className="mt-20">
            <label>{t("OrderReview.ShippingAddress")}</label>
            <p>
              {form.inputAddress.first_name} {form.inputAddress.last_name}
              <br />
              {form.inputAddress.line_one} <br />
              {form.inputAddress.city}, {form.inputAddress.province}
              <br />
              {form.inputAddress.country} {form.inputAddress.zip}
              <br />
              {form.inputAddress.phone}
            </p>
          </Col>

          <Col md={12} className="mt-20">
            <label>{t("OrderReview.PaymentMethod")}</label>
            <p>{t("OrderReview.Placeholder.CreditCard", { last4: form.card.last4 })}</p>
          </Col>

          <Col md={12} className="mt-20">
            <Loadable active={this.state.isLoading} background="rgba(255, 255, 255, 0.75)">
              <label>{t("OrderReview.Amounts")}</label>
              <p>
                {t("OrderReview.Subtotal")} ({t("OrderReview.ItemWithCount", { count: form.quantity })}){" "}
                <strong className="pull-right">{this.state.subtotal}</strong>
              </p>
              <p>
                {t("OrderReview.ShippingCost")} <strong className="pull-right">{this.state.shipping}</strong>
              </p>
              <p>
                {t("OrderReview.TransactionFees")}{" "}
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="fees-tooltip">{t("OrderReview.TransactionFees.ToolTips")}</Tooltip>}
                >
                  <img src={tooltip} alt="tooltip" class="info-tip-line" />
                </OverlayTrigger>
                <strong className="pull-right">{this.state.taxes_and_fees}</strong>
              </p>
              <hr />
              <p className="Order_Review__total">
                <strong>{t("OrderReview.OrderTotal")}</strong>
                <strong className="pull-right">{this.state.total}</strong>
              </p>
            </Loadable>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlertMessage
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    form: state.forms
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderReview)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Forms/orderReview.js