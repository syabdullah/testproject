import { Row, Col, Table, Label, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAlertMessage } from "../../../actions";
import styled from "styled-components";

import ConfirmationModal from "./ConfirmationModal";
import CustomerModal from "./CustomerModal";
import OrderLine from "./OrderLine";
import ShippingDetailsModal from "./ShippingDetailsModal";
import { isThereAnyPendingOrder } from "../orderBulkSection";
import warningIcon from "../../../assets/warning-icon.svg";

import { Checkbox } from "newDropshipperApp/spocketUI";
// i18n
import { withTranslation } from "react-i18next";

const StyledCheckBox = styled(Checkbox)`
  background-color: white;
  padding: 0px;
`;

class Order extends React.Component {
  static propTypes = {
    integratedStoreOrder: PropTypes.object.isRequired,
    onProcessOrder: PropTypes.func.isRequired,
    onOpenDiscountedCTA: PropTypes.func.isRequired
  };

  state = {
    confirmationModalShow: false,
    confirmationModalLines: [],
    shippingDetailsShow: false,
    shippingDetails: {}
  };

  confirmationModalToggle = () => {
    this.setState({ confirmationModalShow: !this.state.confirmationModalShow });
  };

  confirmationModalClose = () => {
    this.setState({ confirmationModalShow: false });
  };

  confirmationModalOpen = supplierOrder => {
    this.setState({
      confirmationModalShow: true,
      supplierOrder: supplierOrder,
      confirmationModalLines: supplierOrder.item_lines
    });
  };

  shippingDetailsToggle = () => {
    this.setState({ shippingDetailsShow: !this.state.shippingDetailsShow });
  };

  shippingDetailsOpen = shippingDetails => {
    this.setState({
      shippingDetailsShow: true,
      shippingDetails: shippingDetails
    });
  };

  shippingDetailsClose = () => {
    this.setState({ shippingDetailsShow: false });
  };

  onProcessOrder = () => {
    const self = this;
    this.setState({ confirmationModalShow: false }, () => {
      self.props.onProcessOrder(self.props.integratedStoreOrder.id);
    });
  };

  returnValidProductCount = () => {
    let validProductCount = 0;
    this.props.integratedStoreOrder.lines.forEach(line => {
      if (line.tracked) {
        validProductCount++;
      }
    });
    return validProductCount;
  };

  returnOrderStatus = () => {
    let orderStyle;
    switch (this.props.integratedStoreOrder.status) {
      case "paid":
        orderStyle = "success";
        break;
      case "failed":
        orderStyle = "danger";
        break;
      case "invalid":
        orderStyle = "danger";
        break;
      case "deleted":
        orderStyle = "danger";
        break;
      case "pending":
      default:
        orderStyle = "warning";
        break;
    }
    return orderStyle;
  };

  renderItemLines = () => {
    return this.props.integratedStoreOrder.supplier_orders.map(supplier_order => {
      let index = 0;

      return supplier_order.item_lines.map(line => {
        index++;

        return (
          <OrderLine
            key={index}
            index={index}
            line={line}
            onConfirm={this.confirmationModalOpen}
            openShippingDetails={this.shippingDetailsOpen}
            integratedStoreOrderId={this.props.integratedStoreOrder.id}
            supplierOrder={supplier_order}
            rowSpan={supplier_order.item_lines.length}
            displayCheckoutButton={index === 1}
            linesToConfirm={supplier_order.item_lines}
            paymentConfirmationUrl={this.props.integratedStoreOrder.confirmation_url}
            isPremium={
              this.props.integratedStoreOrder.has_premium_listings ||
              this.props.integratedStoreOrder.has_discounted_listings
            }
            onOpenDiscountedCTA={this.props.onOpenDiscountedCTA}
            isSampleOrder={this.props.integratedStoreOrder.is_sample_order}
          />
        );
      });
    });
  };

  getCannotBePaidReasons() {
    const { integratedStoreOrder } = this.props;
    const cannotBePaidReasons = [];

    integratedStoreOrder.supplier_orders.forEach(supplierOrder => {
      if (supplierOrder.cannot_be_paid_reasons.length > 0) {
        cannotBePaidReasons.push(...supplierOrder.cannot_be_paid_reasons);
      }
    });

    return cannotBePaidReasons;
  }

  renderVacationAlert() {
    const {
      integratedStoreOrder: { formatted_vacation_dates }
    } = this.props;

    if (formatted_vacation_dates.length > 0) {
      const { supplier_alias, vacation_message } = formatted_vacation_dates[0];
      return (
        <div className="Order__vacation-alert">
          <Alert bsStyle="warning">
            <img src={warningIcon} alt="Warning" />
            <strong>{supplier_alias} </strong>
            <span dangerouslySetInnerHTML={{ __html: vacation_message }} />
          </Alert>
        </div>
      );
    }
  }

  integrationName() {
    switch (localStorage.getItem("integrated_store_name")) {
      case "shopify":
        return "Shopify";
      case "woocommerce":
        return "WooCommerce";
      case "bigcommerce":
        return "BigCommerce";
      case "spocket":
        return "Spocket";
      case "wix":
        return "Wix";
      default:
        return "";
    }
  }

  render() {
    const orderStyle = this.returnOrderStatus();
    const orderDate = new Date(this.props.integratedStoreOrder.created_at);
    const {
      t,
      integratedStoreOrder: { status }
    } = this.props;

    return (
      <div className="card mt-30">
        {this.renderVacationAlert()}
        <Row>
          <Col xs={12} sm={6} md={3} lg={3}>
            <div className="panel-head orders-inner Orders__bulk-section" data-cy="order-list-label">
              {this.getCannotBePaidReasons().length === 0 &&
              isThereAnyPendingOrder(this.props.integratedStoreOrder) ? (
                <StyledCheckBox
                  checked={this.props.integratedStoreOrder.isChecked || false}
                  name={this.props.integratedStoreOrder.id}
                  onChange={e => this.props.onCheck(this.props.integratedStoreOrder.id, e.target.checked)}
                />
              ) : (
                <Fragment>
                  {isThereAnyPendingOrder(this.props.integratedStoreOrder) && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="cannot-be-paid-reasons-tooltip">
                          {this.getCannotBePaidReasons().map(message => {
                            return <p key={message}>{message}. </p>;
                          })}
                        </Tooltip>
                      }
                    >
                      <span>
                        <StyledCheckBox
                          checked={false}
                          onChange={e => {
                            this.getCannotBePaidReasons().forEach(message => {
                              this.props.setAlertMessage(message, "error");
                            });
                          }}
                        />
                      </span>
                    </OverlayTrigger>
                  )}
                </Fragment>
              )}
              {t("Order.Label.OrderNumber")}: {this.props.integratedStoreOrder.order_number}
            </div>
          </Col>
          <Col xs={12} sm={6} md={2} lg={3}>
            <p className="panel-head orders-inner">
              {t("Order.Label.Date")}: {orderDate.toLocaleDateString()}
            </p>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "15px" }}>
            <span className="panel-head orders-inner">
              {t("Order.Label.OrderStatus", { integrationName: this.integrationName() })}
            </span>
            <Label bsStyle={orderStyle}>{t(`order.status.${status}`)}</Label>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3}>
            <CustomerModal
              buyer={this.props.integratedStoreOrder.customer ? this.props.integratedStoreOrder.customer : {}}
            />
          </Col>
        </Row>
        <hr />
        <div className="orders-box">
          <Table>
            <thead>
              <tr>
                <th />
                <th>{t("Order.Table.Th.Product")}</th>
                <th>{t("Order.Table.Th.Qty")}</th>
                <th>{t("Order.Table.Th.UnitPrice")}</th>
                <th>{t("Order.Table.Th.CheckoutDate")}</th>
                <th className="text-center">{t("Order.Table.Th.Action")}</th>
              </tr>
            </thead>
            <tbody>{this.renderItemLines()}</tbody>
          </Table>
        </div>
        <ConfirmationModal
          show={this.state.confirmationModalShow}
          toggle={this.confirmationModalToggle}
          close={this.confirmationModalClose}
          submit={this.onProcessOrder}
          lines={this.state.confirmationModalLines}
          supplierOrder={this.state.supplierOrder}
          notes={this.props.integratedStoreOrder.note}
          orderId={this.props.integratedStoreOrder.id}
        />
        <ShippingDetailsModal
          show={this.state.shippingDetailsShow}
          toggle={this.shippingDetailsToggle}
          close={this.shippingDetailsClose}
          shippingDetails={this.state.shippingDetails}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage }, dispatch);
}

export default withTranslation()(
  connect(
    null,
    mapDispatchToProps
  )(Order)
);



// WEBPACK FOOTER //
// ./src/components/OrderList/Order/index.js