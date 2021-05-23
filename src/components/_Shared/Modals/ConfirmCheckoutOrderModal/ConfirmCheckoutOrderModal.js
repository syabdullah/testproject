// Libs
import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";

// Actions
import { fetchDropshipperData } from "../../../../actions/settings";
import { placeOrders } from "../../../../newDropshipperApp/module/store/orders/pay";

// Components
import ModalWrapper from "../../ModalWrapper";
import { default as Loadable } from "../../commonLoadable";
import { Checkbox } from "newDropshipperApp/spocketUI";

// Images
import tooltip from "../../../../assets/tooltip.svg";

// Style
import "./ConfirmCheckoutOrderModal.css";
import { Button } from "newDropshipperApp/spocketUI";

const StyledCheckBox = styled(Checkbox)`
  background-color: white;
`;

function ConfirmCheckoutOrderModal({ dataModal, placeOrders, isFetching }) {
  const [confirmCheckout, setConfirmCheckout] = useState(false);
  const itemLines = [];
  let totalProductPrice = 0;
  let totalShippingPrice = 0;
  let totalTransactionFee = 0;
  let grandTotal = 0;

  dataModal.selectedOrders.forEach(selectedOrder => {
    selectedOrder.supplier_orders.forEach(order => {
      if (order.id === null) {
        totalProductPrice = totalProductPrice + order.subtotal;
        totalShippingPrice = totalShippingPrice + order.shipping;
        totalTransactionFee = totalTransactionFee + order.taxes_and_fees;
        grandTotal = grandTotal + order.total;
        itemLines.push(...order.item_lines);
      }
    });
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <ModalWrapper size="md confirm-checkout-order__modal">
      <Loadable active={isFetching}>
        <ModalWrapper.Header>Bulk Checkout Confirmation</ModalWrapper.Header>
        <ModalWrapper.Body>
          <div>
            <Table>
              <thead>
                <tr>
                  <th className="text-center">Image</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">QTY</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {itemLines.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <img src={order.image_thumb_url} alt={""} className="variants-img" />
                      </td>
                      <td className="text-center">{order.title_formatted}</td>
                      <td className="text-center">{order.unit_price_formatted}</td>
                      <td className="text-center">{order.quantity}</td>
                      <td className="text-center">{order.total_formatted}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </ModalWrapper.Body>
        <ModalWrapper.Footer>
          <Table>
            <thead>
              <tr>
                <th className="text-center">Total Product Price</th>
                <th className="text-center">Total Shipping Price</th>
                <th className="text-center">
                  Total Transaction Fee{" "}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="fees-tooltip">
                        Transaction fees include fees charged by Stripe, Spocket's payment provider as well as
                        service fees.
                      </Tooltip>
                    }
                  >
                    <img src={tooltip} alt="tooltip" className="info-tip-line" />
                  </OverlayTrigger>
                </th>
                <th className="text-center confirm-checkout-order__grand-total">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{formatter.format(totalProductPrice)}</td>
                <td className="text-center">{formatter.format(totalShippingPrice)}</td>
                <td className="text-center">{formatter.format(totalTransactionFee)}</td>
                <td className="confirm-checkout-order__grand-total">{formatter.format(grandTotal)}</td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <div>
            <StyledCheckBox
              name="confirmCheckout"
              checked={confirmCheckout}
              onChange={() => setConfirmCheckout(!confirmCheckout)}
            >
              I confirm that the orders above are accurate and I would like to proceed with checking out these
              orders
            </StyledCheckBox>
          </div>
          <Button
            onClick={async () => {
              await dataModal.updateStatusToPaying();
              await placeOrders(dataModal.selectedOrders);
              await dataModal.onCheck();
            }}
            disabled={!confirmCheckout}
            variant="brand"
          >
            Confirm Checkout
          </Button>
        </ModalWrapper.Footer>
      </Loadable>
    </ModalWrapper>
  );
}

function mapStateToProps(state) {
  return {
    dataModal: state.ui.data,
    isFetching: state.store.orders.pay.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ placeOrders, fetchDropshipperData }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCheckoutOrderModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/ConfirmCheckoutOrderModal/ConfirmCheckoutOrderModal.js