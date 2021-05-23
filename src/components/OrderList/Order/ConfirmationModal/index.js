import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { default as Loadable } from "../../../_Shared/commonLoadable";
import { Modal, Alert, ControlLabel, FormControl, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as Sentry from "@sentry/browser";
import "./style.css";
import tooltip from "../../../../assets/tooltip.svg";
import ReactPixel from "react-facebook-pixel";
import { trackRedditEvent } from "../../../../utils/eventTracker";
import { placeOrder } from "../../../../newDropshipperApp/module/store/order";
import { trackAdsByRedux } from "../../../../newDropshipperApp/utils/utm";
import { showModal } from "../../../../actions/ui";
import { gaEvent } from "../../../../newDropshipperApp/utils/trackEvents";

// i18n
import { withTranslation } from "react-i18next";

class ConfirmationModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    lines: PropTypes.array,
    tax: PropTypes.number,
    notes: PropTypes.string,
    orderId: PropTypes.string.isRequired
  };

  static defaultProps = {
    note: "",
    supplierOrder: {}
  };

  state = {
    noteField: this.props.notes,
    submitting: false,
    retrievingTax: false,
    tax: null
  };

  handleNoteChange = e => {
    this.setState({
      noteField: e.target.value
    });
  };

  submit = () => {
    const self = this;
    this.setState({ submitting: false }, () => {
      self.props.submit();
    });
  };

  handlePlaceOrderSuccess = () => {
    // Facebook Pixel - conversion (orderCheckoutConfirmation)
    ReactPixel.trackCustom("orderCheckoutConfirmation");

    trackAdsByRedux({
      from: "facebook",
      action: "orderCheckoutConfirmationUTM"
    });

    // Reddit Pixel - conversion (Purchase)
    trackRedditEvent("Purchase");

    // Google Analytics
    gaEvent({
      category: "Order",
      action: "orderCheckoutConfirmation"
    });

    trackAdsByRedux({
      from: "google",
      category: "Order",
      action: "orderCheckoutConfirmationUTM"
    });

    this.submit();
  };

  handlePlaceOrderFailure = error => {
    Sentry.addBreadcrumb({
      category: "error",
      message: error,
      level: "error"
    });
    if (error) {
      this.setState({
        submitting: false
      });
    } else {
      throw error;
    }
  };

  handlePlaceOrder = () => {
    const integratedStoreOrderID = this.props.orderId;
    const supplierID = this.props.supplierOrder.supplier_id;

    this.setState({ submitting: true }, () => {
      this.props.placeOrder(
        integratedStoreOrderID,
        supplierID,
        this.state.noteField,
        this.handlePlaceOrderSuccess,
        this.handlePlaceOrderFailure
      );
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      noteField: nextProps.notes || "",
      submitting: false
    });
  }

  outputOrderDetails = () => {
    const subtotalPrice = this.props.supplierOrder.subtotal_formatted;
    const shippingPrice = this.props.supplierOrder.shipping_formatted;
    const taxesAndFeesPrice = this.props.supplierOrder.taxes_and_fees_formatted;
    const grandTotal = this.props.supplierOrder.total_formatted;
    const { t } = this.props;

    return (
      <Loadable active={this.state.retrievingTax}>
        <div className="text-center mt-20">
          <p className="mb-20">{t("ConfirmationModal.Label.OrderDetails")}:</p>
          <p className="mb-10">
            {t("ConfirmationModal.Label.Total")}: <span className="text-primary">{subtotalPrice}</span>
          </p>
          <p className="mb-10">
            {t("ConfirmationModal.Label.Shipping")}: <span className="text-primary">{shippingPrice}</span>
          </p>
          <p className="mb-10">
            {t("ConfirmationModal.Label.TransactionFees")}{" "}
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="fees-tooltip">{t("ConfirmationModal.Tooltip.TransactionFees")}</Tooltip>}
            >
              <img src={tooltip} alt="tooltip" class="info-tip-line" />
            </OverlayTrigger>{" "}
            : <span className="text-primary">{taxesAndFeesPrice}</span>
          </p>
          <h5>
            {t("ConfirmationModal.Label.Total")}: <span className="text-primary">{grandTotal}</span>
          </h5>
          <hr />
        </div>
      </Loadable>
    );
  };

  render() {
    const { t } = this.props;

    return (
      <Modal show={this.props.show} onHide={this.props.close} data-cy="confirmation-modal">
        <Loadable
          active={this.state.submitting}
          spinner
          animate
          background="rgba(240, 240, 240, 0.6)"
          color="rgba(1, 1, 1, 0.75)"
        >
          <Modal.Header closeButton>
            <Modal.Title data-cy="confirmation-modal-title">
              {t("ConfirmationModal.Modal.OrderConfirmation")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.notes ? (
              <Alert bsStyle="warning">
                <strong>{t("ConfirmationModal.Modal.Alert.Attention")}</strong>
                {t("ConfirmationModal.Modal.Alert.Description")}
              </Alert>
            ) : null}
            <p className="mb-20">{t("ConfirmationModal.Modal.YoureAboutToPlaceOrder")}:</p>
            <div className="orders-box">
              <Table responsive>
                <thead>
                  <tr>
                    <th />
                    <th>{t("ConfirmationModal.Modal.Table.Th.Name")}</th>
                    <th>{t("ConfirmationModal.Modal.Table.Th.Price")}</th>
                    <th>{t("ConfirmationModal.Modal.Table.Th.Qty")}</th>
                    <th>{t("ConfirmationModal.Modal.Table.Th.Total")}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.lines.map((line, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img src={line.image_thumb_url} alt={""} className="variants-img" />
                        </td>
                        <td className="confirmation_modal__title">{line.title_formatted}</td>
                        <td>{line.unit_price_formatted}</td>
                        <td>{line.quantity}</td>
                        <td>{line.total_formatted}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            {this.outputOrderDetails()}
            <div className="mt-20">
              <ControlLabel>{t("ConfirmationModal.Modal.Label.Note")}</ControlLabel>
              <FormControl
                onChange={this.handleNoteChange}
                componentClass="textarea"
                rows="5"
                placeholder={t("ConfirmationModal.Modal.PlaceHolder.Note")}
                value={this.state.noteField}
              />
            </div>
            <div className="mt-20 text-center">
              <button
                data-cy="confirm-modal-button"
                className="btn btn-primary btn-sm"
                onClick={this.handlePlaceOrder}
              >
                {t("ConfirmationModal.Button.PlaceOrder")}
              </button>
            </div>
          </Modal.Body>
        </Loadable>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    featureFlags: state.featureFlags.featureFlags,
    dropshipperData: state.settings.dropshipperData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ placeOrder, showModal }, dispatch);
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfirmationModal)
);



// WEBPACK FOOTER //
// ./src/components/OrderList/Order/ConfirmationModal/index.js