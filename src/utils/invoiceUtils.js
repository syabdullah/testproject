/**
 * Service to handle requests for invoices */
export default class InvoiceUtils {
  // Invoice endpoints are located at the root
  static API_URL = process.env.REACT_APP_API_URL.replace("dropshippers", "");

  /**
   * Request a Supplier Order invoice
   * @param  {String} supplierOrderID
   */
  static open(supplierOrderID) {
    window.open(this.API_URL + `customer_invoices/${supplierOrderID}`);
  }

  /**
   * Request a preview invoice
   */
  static urlPreview() {
    const storeID = localStorage.getItem("shop_id");
    return this.API_URL + `customer_invoices/preview?token=${storeID}`;
  }

  static downloadInvoice(supplierOrderID) {
    window.open(`${process.env.REACT_APP_API_URL}/stores/orders/${supplierOrderID}/invoice`);
  }
}



// WEBPACK FOOTER //
// ./src/utils/invoiceUtils.js