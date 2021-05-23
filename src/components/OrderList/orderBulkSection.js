export function isThereAnyPendingOrder(order) {
  return getOrdersByNullId(order).length > 0;
}

export function getOrdersByNullId(order) {
  return getSupplierOrdersId(order, null);
}

export function isThereAnyCannotBePaidReasons(order) {
  const { supplier_orders } = order;
  const cannotBePaidReasons = [];

  supplier_orders.forEach(supplierOrder => {
    if (supplierOrder.cannot_be_paid_reasons.length > 0) {
      cannotBePaidReasons.push(...supplierOrder.cannot_be_paid_reasons);
    }
  });

  return cannotBePaidReasons.length > 0;
}

export function showBulkCheckoutComponent(orders) {
  if (orders.length > 0) {
    let supplierOrdersArray = [];

    orders.forEach(order => {
      order.supplier_orders.forEach(supplierOrder => {
        if (supplierOrder.id === null) supplierOrdersArray.push(supplierOrder.id);
      });
    });

    return supplierOrdersArray.length > 0;
  }
}

export function updateOrderStatusToPaying(allOrders, orderSelected) {
  const selectedOrdersStatusToPaying = updateSelectedOrdersStatusToPaying(orderSelected);
  const ordersCopy = JSON.parse(JSON.stringify(allOrders));

  ordersCopy.forEach((orderCopy, index) => {
    const findOrder = selectedOrdersStatusToPaying.find(order => order.id === orderCopy.id);
    if (typeof findOrder === "object") {
      ordersCopy[index] = findOrder;
    }
  });

  return ordersCopy;
}

function updateSelectedOrdersStatusToPaying(selectedOrders) {
  selectedOrders.forEach(order =>
    order.supplier_orders
      .filter(supplierOrder => supplierOrder.id === null)
      .forEach(supplierOrder => supplierOrder.item_lines.forEach(itemLine => (itemLine.status = "paying")))
  );

  return selectedOrders;
}

function getSupplierOrdersId(order, id) {
  const { supplier_orders } = order;
  const supplierOrdersId = [];

  supplier_orders.forEach(supplierOrder => {
    if (supplierOrder.id === id) {
      supplierOrdersId.push(supplierOrder.id);
    }
  });

  return supplierOrdersId;
}



// WEBPACK FOOTER //
// ./src/components/OrderList/orderBulkSection.js