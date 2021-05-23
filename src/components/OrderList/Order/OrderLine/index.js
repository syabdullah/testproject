// React and Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

// Libs
import { IntercomAPI } from "react-intercom";
import * as Sentry from "@sentry/browser";
import ReactPixel from "react-facebook-pixel";

// Components
import InvoiceUtils from "../../../../utils/invoiceUtils";
import { Button } from "../../../../newDropshipperApp/spocketUI";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Icons
import premiumIcon from "../../../../assets/premiumIcon.svg";
import information from "../../../../assets/information.svg";
import iconsCustomerInvoice from "../../../../newDropshipperApp/images/icon-customer-invoice.svg";
import iconsPaymentReceipt from "../../../../newDropshipperApp/images/icon-payment-receipt.svg";
import alibabaLogo from "newDropshipperApp/images/alibaba-logo.svg";

// Actions
import { setAlertMessage } from "../../../../actions";
import { showModal } from "../../../../actions/ui";
import { getListingDetail } from "newDropshipperApp/module/shared/listings";
import { getPaymentSettings } from "../../../../actions/settings";

// Utils
import { PREMIUM_LISTINGS, doesCurrentPlanSupport } from "../../../../utils/features.js";
import { etsyAffiliateLinkGenerator } from "../../../../utils";
import { trackAdsByRedux } from "../../../../newDropshipperApp/utils/utm";
import { Fragment } from "react";
import { gaEvent } from "../../../../newDropshipperApp/utils/trackEvents";

// i18n
import { withTranslation } from "react-i18next";

// Styles
import { Images } from "components/OrderList/Order/OrderLine/OrderLine.style";

class OrderLine extends React.Component {
  static propTypes = {
    line: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    rowSpan: PropTypes.number.isRequired,
    onConfirm: PropTypes.func,
    openShippingDetails: PropTypes.func,
    linesToConfirm: PropTypes.array,
    integratedStoreOrderId: PropTypes.string.isRequired,
    supplierOrder: PropTypes.object.isRequired,
    isPremium: PropTypes.bool,
    onOpenDiscountedCTA: PropTypes.func.isRequired,
    isSampleOrder: PropTypes.bool
  };

  static defaultProps = {
    supplierOrder: {}
  };

  /**
   * When a dropshipper has previously triggered the CTA modal, retrieve the
   * order information and open the confirmation modal for that order
   */
  componentDidMount = () => {
    const supplierOrderToCheckoutJson = localStorage.getItem("supplier_order_to_checkout");
    if (supplierOrderToCheckoutJson && doesCurrentPlanSupport(PREMIUM_LISTINGS)) {
      const supplierOrderToCheckout = JSON.parse(supplierOrderToCheckoutJson);
      if (
        supplierOrderToCheckout.integratedStoreOrderID === this.props.integratedStoreOrderId &&
        supplierOrderToCheckout.supplierOrderIndex === this.props.index
      ) {
        this.handleConfirm();
        localStorage.removeItem("supplier_order_to_checkout");
      }
    }
  };

  supplierOrder() {
    return this.props.supplierOrder;
  }

  outputImage = () => {
    const image = (
      <div
        className="import-img variants-img"
        style={{
          backgroundImage: "url('" + this.props.line.image_thumb_url + "')",
          cursor: "pointer"
        }}
        onClick={async () => {
          try {
            this.props.showModal("LOADING_MODAL");
            const listingDetailsResult = await getListingDetail(this.props.line.listing_id);
            this.props.showModal("LISTING_DETAIL_MODAL", { listing: listingDetailsResult.json });
          } catch (err) {
            console.log(err); // TypeError: failed to fetch
            // TODO: better error handling, follow up from https://github.com/spocket-co/dropshipper-app/pull/1410#discussion_r607343498
          }
        }}
      />
    );
    switch (this.props.line.provider) {
      case "Etsy":
        return (
          <a className="Orders__image-pointer" onClick={this.openEtsyListing}>
            {image}
          </a>
        );
      default:
        return image;
    }
  };

  openEtsyListing = () => {
    window.open(etsyAffiliateLinkGenerator(this.props.line.supplier_listing_id));
  };

  handleInvoicePreview() {
    InvoiceUtils.open(this.props.supplierOrder.id);
  }

  downloadInvoice() {
    InvoiceUtils.downloadInvoice(this.props.supplierOrder.id);
  }

  outputCheckoutButton = () => {
    const { t, displayCheckoutButton, showModal } = this.props;
    const hideCheckoutButton = !displayCheckoutButton;
    const { status, errorMessage, supplier_from: provider, listing_id } = this.props.line;
    /**
     * We need to go to the item_lines (regular orders data), get the listing_id, and find the item_lines.listing_id
     * into the alibab_orders.listing_ids. In this way, we can join the item_lines data with alibaba_orders data and start using it.
     * 
     * TODO - Return alibaba_orders into the each item_lines to avoid extra work on the client side.
     * 
      supplier_orders = {
        alibaba_orders: [
          {
            carrier_code: "EX_ASP_OCEAN_EXPRESS",
            payment_url: null,
            status: "non_created",
            shipment_fee_cents: 4900,
            listing_ids: ["1880fdaa-a632-4c36-8a84-4832487464f8"]
          }
        ],
        item_lines: [
          {
            title_formatted: "Red pill - (blush585, gold8) - SKU_BLACK",
            total_formatted: "$40.00 USD",
            unit_price_formatted: "$20.00 USD",
            quantity: 2,
            supplier_from: "Alibaba",
            supplier_listing_id: null,
            image_thumb_url: null,
            status: "pending",
            listing_id: "1880fdaa-a632-4c36-8a84-4832487464f8"
          }
        ]
      };
    */
    const { alibaba_orders: alibabaOrders, alibaba_errors: alibabaErrors } = this.props.supplierOrder;
    // AlibabaItemLine will return an alibaba_order item
    const alibabaItemLine = alibabaOrders
      ? alibabaOrders.filter(orders => orders.listing_ids.includes(listing_id))[0]
      : [];

    const td = (child1, child2) => {
      return (
        <td className="text-center border-left OrderLine__actions" rowSpan={this.props.rowSpan}>
          {child1}
          {child2}
        </td>
      );
    };

    if (!hideCheckoutButton) {
      const checkoutBtn = (
        <Button variant="brand" onClick={() => this.handleConfirm(alibabaErrors)} data-cy="order-line-button">
          {t("OrderLine.Button.Checkout")}
        </Button>
      );

      const alibabaDetailsBtn = (
        <Button variant="brand" onClick={() => showModal("ALIBABA_ORDER_DETAILS", { orders: alibabaOrders })}>
          {t("OrderLine.Button.Alibaba")}
        </Button>
      );

      const previewInvoiceBtn = (
        <Fragment>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="default-tooltip">{t("OrderLine.Tooltip.PreviewInvoice")}</Tooltip>}
          >
            <Button variant="basic" onClick={this.handleInvoicePreview.bind(this)}>
              <img src={iconsCustomerInvoice} alt="Preview Invoice" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="default-tooltip">{t("OrderLine.Tooltip.PaymentReceipt")}</Tooltip>}
          >
            <Button variant="basic" onClick={() => this.downloadInvoice()}>
              <img src={iconsPaymentReceipt} alt="Payment Receipt" />
            </Button>
          </OverlayTrigger>
        </Fragment>
      );

      const shippedBtn = (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="default-tooltip">{t("OrderLine.Tooltip.TrackOrder")}</Tooltip>}
        >
          <Button
            variant="brand"
            disabled={!this.returnShippingDetails()}
            onClick={!this.returnShippingDetails() ? () => null : this.openShippingDetails}
          >
            <i className="fa fa-shipping-fast" />
          </Button>
        </OverlayTrigger>
      );

      const processingBtn = (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="default-tooltip">{t("OrderLine.Tooltip.OrderProcessing")}</Tooltip>}
        >
          <Button variant="brand" disabled>
            <i className="fa fa-hourglass-half" />
          </Button>
        </OverlayTrigger>
      );

      const cancelledBtn = (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="default-tooltip">{t("OrderLine.Tooltip.OrderCancelled")}</Tooltip>}
        >
          <Button variant="brand" disabled>
            <i className="fa fa-ban" />
          </Button>
        </OverlayTrigger>
      );

      const alertBtn = (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="default-tooltip">{t("OrderLine.Tooltip.PleaseConfirm")}</Tooltip>}
        >
          <a
            className={`btn btn-danger btn-sm Orders__actions_btn`}
            href={this.props.paymentConfirmationUrl}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-exclamation-triangle" />
          </a>
        </OverlayTrigger>
      );

      if (provider === "Etsy") {
        return td(
          <a className="btn btn-etsy btn-sm" onClick={this.openEtsyListing}>
            {t("OrderLine.Label.PurchaseEtsy")}
          </a>
        );
      } else if (provider === "Alibaba" && alibabaItemLine && alibabaItemLine.status !== "non_created") {
        return td(alibabaDetailsBtn);
      } else {
        if (status === "pending") {
          return td(checkoutBtn);
        } else if (status === "paid" || status === "shipped") {
          return td(shippedBtn, previewInvoiceBtn);
        } else if (status === "processing") {
          return td(processingBtn, previewInvoiceBtn);
        } else if (status === "cancelled") {
          return td(cancelledBtn, previewInvoiceBtn);
        } else if (status === "pending_payment_confirmation") {
          return td(alertBtn, previewInvoiceBtn);
        } else if (status === "paying") {
          return td(<span className="label label-warning">{t("OrderLine.Paying")}</span>);
        } else if (status === "failure") {
          return td(
            <OverlayTrigger placement="top" overlay={<Tooltip id="default-tooltip">{errorMessage}</Tooltip>}>
              <span className="label label-danger">
                {t("OrderLine.Failure")}{" "}
                <img style={{ height: "12px" }} src={information} alt="Information" />
              </span>
            </OverlayTrigger>
          );
        }
      }
    }
  };

  returnCheckoutDate = () => {
    const { supplierOrder } = this.props;

    return supplierOrder.created_at !== null && new Date(supplierOrder.created_at).toLocaleDateString();
  };

  returnShippingDetails = () => {
    if (this.supplierOrder().has_shipping_label_shippos) {
      return this.supplierOrder().shipping_label_shippos[0];
    } else if (this.supplierOrder().has_shipping_label_externals) {
      return this.supplierOrder().shipping_label_externals[0];
    }
  };

  openShippingDetails = () => {
    this.props.openShippingDetails(this.returnShippingDetails());
  };

  handleConfirm = (alibabaErrors) => {
    this.props.getPaymentSettings("v2").then(res => {
      const hasStripe = res.json.length > 0;
      this.handleConfirmCheckout(alibabaErrors, hasStripe);
    });
  };

  handleConfirmCheckout = (alibabaErrors, hasStripe) => {
    const { supplier_from: provider } = this.props.line;

    if (alibabaErrors.length > 0) {
      this.props.showModal("ALIBABA_ORDER_ERRORS", { alibabaErrors });
      return;
    }

    if (!hasStripe && provider !== "Alibaba") {
      this.props.showModal("CREDIT_CARD_ORDERS");
      return;
    }

    if (this.supplierOrder().blocked_by_discounted_listing_feature) {
      localStorage.setItem(
        "supplier_order_to_checkout",
        JSON.stringify({
          integratedStoreOrderID: this.props.integratedStoreOrderId,
          supplierOrderIndex: this.props.index
        })
      );
      this.props.showModal("UPGRADE_MODAL");
      return;
    }

    if (this.supplierOrder().blocked_by_premium_listing_feature) {
      localStorage.setItem(
        "supplier_order_to_checkout",
        JSON.stringify({
          integratedStoreOrderID: this.props.integratedStoreOrderId,
          supplierOrderIndex: this.props.index
        })
      );
      this.props.showModal("UPGRADE_MODAL");
      return;
    }

    if (this.supplierOrder().cannot_be_paid_reasons.length > 0) {
      const that = this;
      this.supplierOrder().cannot_be_paid_reasons.forEach(function(message) {
        that.props.setAlertMessage(message, "error");
      });
      return;
    }

    IntercomAPI("trackEvent", "Checkout button pressed");
    try {
      // Facebook Pixel - conversion (orderCheckout)
      ReactPixel.trackCustom("orderCheckout");

      trackAdsByRedux({
        from: "facebook",
        action: "orderCheckoutUTM"
      });

      // Google Analytics
      gaEvent({
        category: "Order",
        action: "orderCheckout"
      });

      trackAdsByRedux({
        from: "google",
        category: "Order",
        action: "orderCheckoutUTM"
      });
    } catch (err) {
      Sentry.addBreadcrumb({ category: "error", message: err, level: "error" });
    } finally {
      this.props.onConfirm(this.supplierOrder());
    }
  };

  renderSampleOrder = () => {
    const { t, isSampleOrder } = this.props;

    if (isSampleOrder) {
      return <span className="sample-order-badge">{t("OrderLine.Sample")}</span>;
    }

    return null;
  };

  renderOrderRow = () => {
    return (
      <tr>
        <td>
          <Images>
            {this.outputImage()}
            {this.props.isPremium && <img src={premiumIcon} alt="premium-icon" className="premium-order" />}
            {this.props.line.supplier_from === "Alibaba" && <img src={alibabaLogo} alt="alibaba order" />}
            {this.renderSampleOrder()}
          </Images>
        </td>

        <td className="order-name">{this.props.line.title_formatted}</td>
        <td className="hidden">
          {this.props.line.first_property || null}
          {this.props.line.second_property ? "-" + this.props.line.second_property : ""}
        </td>
        <td>{this.props.line.quantity}</td>
        <td>{this.props.line.unit_price_formatted}</td>
        <td>{this.returnCheckoutDate()}</td>
        {this.outputCheckoutButton()}
      </tr>
    );
  };

  /* This is a vague error that lets the user know an order was not rendered
  because there is an issue with it. A more detailed error will be sent to
  sentry from the backend. */
  renderErrorOrderRow = () => {
    const { t } = this.props;

    return (
      <tr>
        <td>{t("OrderLine.ErrorOrderRow")}</td>
      </tr>
    );
  };

  render() {
    return this.props.line !== null ? this.renderOrderRow() : this.renderErrorOrderRow();
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage, showModal, getPaymentSettings }, dispatch);
}

function mapStateToProps(state) {
  return { hasStripe: state.settings.stripeCustomerId };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderLine)
);



// WEBPACK FOOTER //
// ./src/components/OrderList/Order/OrderLine/index.js