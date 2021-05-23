// @flow
import "./style.css";

import { IntercomAPI } from "react-intercom";
import { Link } from "react-router";
import { Row, Col, Pagination } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { default as Loadable } from "../_Shared/commonLoadable";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import styled from "styled-components";
import { getPaymentSettings } from "../../actions/settings";
import { setAlertMessage } from "../../actions";

import ApiCall from "../../utils/apiCall";
import NoOrders from "../../assets/no-orders.svg";
import Order from "./Order";
import PageFooter from "../PageFooter";
import PaymentCompleteModal from "./PaymentCompleteModal";
import RefreshModal from "./RefreshModal";
import PaginationUtils from "../../utils/pagination";
import purplePlayIcon from "../../assets/purple-play-icon.svg";
import { showModal } from "../../actions/ui";
import { fetchDropshipperData } from "../../actions/settings";
import { isIntegratedStoreSpocket } from "../../utils/features";
import searchIcon from "../../assets/search.svg";
import {
  isThereAnyCannotBePaidReasons,
  isThereAnyPendingOrder,
  showBulkCheckoutComponent,
  updateOrderStatusToPaying
} from "./orderBulkSection";
import { getActivePlan } from "../../utils/features";
import websocketURL from "../../utils/websocketURL";
import iconDownload from "../../assets/icon-download.svg";
import { Checkbox } from "newDropshipperApp/spocketUI";
// i18n
import { withTranslation } from "react-i18next";
import { Button, Input } from "newDropshipperApp/spocketUI";
import { SearchButton } from "./index.style";

const StyledInput = styled(Input)`
  border-right: none;
  border-radius: 4px 0 0 4px;
`;

const RoundedCheckBox = styled(Checkbox)`
  background-color: ${props => (props.checked ? "white" : "#f4f5f8")};
  border-radius: 22px;
  border: 1px solid #dadde0;
  font-size: 12px;
  font-weight: 500;
  height: 44px;
  padding: 11px;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  .StyledCheckbox {
    display: none;
  }
  span {
    margin-left: 0px;
  }
  :hover {
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

const StyledCheckbox = styled(Checkbox)`
  padding: ${props => (props.checked ? "12px 6px" : "12px 8px")};
`;
class OrderList extends React.Component {
  static propTypes = {
    setAlertMessage: PropTypes.func.isRequired,
    getPaymentSettings: PropTypes.func.isRequired
  };

  PRODUCT_LIMIT_PER_PAGE = 25;

  state = {
    integratedStoreOrders: { orders: [], checkableOrders: [] },
    isAllSelected: false,
    selectedOrders: [],
    quantitySelectedOrders: 0,
    refreshingOrders: false,
    loading: false,
    pendingCount: 0,
    paymentComplete: false,
    checkoutOrderId: null,
    checkoutOrderIndex: null,
    pageCount: null,
    activePage: 1,
    orderNumberFilter: "",
    filters: {
      unpaid: false,
      paid: false,
      processing: false,
      shipped: false
    }
  };

  ws = new WebSocket(websocketURL());

  componentDidMount() {
    const { t } = this.props;

    IntercomAPI("trackEvent", "Visit: Orders list page");
    document.title = t("OrderList.Document.Title");
    this.props.fetchDropshipperData();
    if (!this.props.hasStripe) {
      this.props.getPaymentSettings();
    }

    if (getActivePlan() === "Unicorn") {
      this.ws.onopen = () => {
        this.ws.send(
          JSON.stringify({
            command: "subscribe",
            identifier: '{"channel":"ApplicationCable::Dropshippers::OrdersChannel"}'
          })
        );
      };

      this.ws.onmessage = evt => {
        const ws = JSON.parse(evt.data);
        "message" in ws && this.updateOrderStatusViaWebsocket(ws);
      };
    }
  }

  updateOrderStatusViaWebsocket = ws => {
    if (Object.keys(ws.message).length >= 4 && this.state.integratedStoreOrders.orders.length > 0) {
      const ordersCopy = JSON.parse(JSON.stringify(this.state.integratedStoreOrders.orders));

      ordersCopy
        .find(order => order.id === ws.message.order_id)
        .supplier_orders.find(supplierOrder => {
          supplierOrder.id = ws.message.supplier_order_id || ws.message.order_id;
          return supplierOrder.supplier_id === ws.message.supplier_id;
        })
        .item_lines.forEach(itemLines => {
          itemLines.status = ws.message.status;
          itemLines.errorMessage = ws.message.message || "";
        });

      this.setState({ integratedStoreOrders: { orders: ordersCopy } });
    }
  };

  getPending = () => {
    let pending = 0;
    const orders = this.state.integratedStoreOrders.orders;

    orders.forEach(order => {
      if (order.status === "pending") {
        pending++;
      }
    });
    this.setState({
      pendingCount: pending
    });
  };

  renderIntegratedStoreOrder = integratedStoreOrder => {
    return (
      <Order
        key={integratedStoreOrder.id}
        integratedStoreOrder={integratedStoreOrder}
        onProcessOrder={this.handleProcessOrdersOne}
        onOpenDiscountedCTA={this._openDiscountedCTA}
        onOpenPremiumCTA={this._openPremiumCTA}
        onCheck={this.onCheck}
      />
    );
  };

  renderDisplayHeader = () => {
    return (
      <div>
        <RefreshModal onOrderRefresh={this.handleRefreshRequest} />
      </div>
    );
  };

  /**
   * Pagnation:
   *  Go to page
   * @return {null}
   */
  handlePageSelect = activePage => {
    this.setState(
      {
        activePage: activePage,
        loading: false
      },
      () => {
        window.scrollTo(0, 0);
        this.handleOrderRequest();
      }
    );
  };

  handleOrderAction = bool => {
    this.setState({
      refreshingOrders: bool
    });
  };

  handleOrderRequest = () => {
    this.setState({
      loading: true,
      isAllSelected: false,
      selectedOrders: [],
      quantitySelectedOrders: 0
    });

    ApiCall.get("/stores/orders", {
      page: this.state.activePage,
      per_page: this.PRODUCT_LIMIT_PER_PAGE,
      order_number: this.state.orderNumberFilter,
      ...this.state.filters
    })
      .then(({ status, json }) => {
        this.setState({
          integratedStoreOrders: json,
          pageCount: PaginationUtils.calculatePageCount(json.total_count, this.PRODUCT_LIMIT_PER_PAGE)
        });
        this.getPending();
      })
      .catch(error => {
        if (error.json === undefined) {
          throw error;
        } else {
          this.props.setAlertMessage(error.json.message, "error");
        }
      })
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  handleRefreshRequest = () => {
    ApiCall.get("/stores/orders/synchronize");
  };

  closePaymentCompletedModal = () => {
    this.setState({
      paymentComplete: false
    });
  };

  handleProcessOrdersOne = id => {
    // TODO: Process single order
    this.setState({
      paymentComplete: true
    });
    this.handleOrderRequest();
  };

  UNSAFE_componentWillMount = () => {
    this.handleOrderRequest();
  };

  _closeDiscountedCTA = () => {
    this.setState({ isDiscountedCTAOpen: false });
  };
  _openDiscountedCTA = () => {
    this.setState({ isDiscountedCTAOpen: true });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.setState({ activePage: 1 }, () => {
        this.handleOrderRequest();
      });
    }
  };

  renderEmptyOrders = (title, subtext) => {
    const { t } = this.props;

    return (
      <Row className="mt-80">
        <Col xs={12} md={6}>
          <h3 className="mb-20 orders__main-message">{title}</h3>
          <p className="mb-20 orders__sub-message">{subtext}</p>
          <div className="orders__search-empty-options">
            <Link to="/search" className="btn btn-primary orders__search-btn">
              {t("OrderList.EmptyOrders.Link.SearchProducts")}
            </Link>
            <p className="mt-20">
              <a
                className="cursorPointer"
                onClick={() =>
                  this.props.showModal("WISTIA", {
                    type: "order_processing"
                  })
                }
              >
                {t("OrderList.EmptyOrders.Tip.HowToProcessOrders")}
                <img src={purplePlayIcon} alt="Purple PlayIcon" />
              </a>
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <img src={NoOrders} alt="" className="img-responsive" />
        </Col>
      </Row>
    );
  };

  renderOrders() {
    const { t } = this.props;

    if (this.state.integratedStoreOrders.orders.length === 0) {
      if (this.state.loading) {
        return this.renderEmptyOrders(
          t("OrderList.EmptyOrders.Message.Loading.Title"),
          t("OrderList.EmptyOrders.Message.Loading.Description")
        );
      }
      return this.renderEmptyOrders(
        t("OrderList.EmptyOrders.Message.Title"),
        t("OrderList.EmptyOrders.Message.Description")
      );
    }

    return this.state.integratedStoreOrders.orders.map(integratedStoreOrder => (
      <div key={integratedStoreOrder.id}>{this.renderIntegratedStoreOrder(integratedStoreOrder)}</div>
    ));
  }

  filterBySpocketStatus(spocketStatus) {
    this.setState(
      {
        activePage: 1,
        filters: {
          ...this.state.filters,
          [spocketStatus]: !this.state.filters[spocketStatus]
        }
      },
      () => this.handleOrderRequest()
    );
  }

  onCheck = (checkName, isChecked) => {
    isChecked = isChecked === true;
    let isAllChecked = checkName === "bulkOrderSelector" && isChecked;
    let isAllUnChecked = checkName === "bulkOrderSelector" && !isChecked;

    const checkableOrders = this.state.integratedStoreOrders.orders.map(order => {
      if (
        (isAllChecked || order.id === checkName) &&
        isThereAnyPendingOrder(order) &&
        !isThereAnyCannotBePaidReasons(order)
      ) {
        return { ...order, isChecked: isChecked };
      } else if (isAllUnChecked) {
        return { ...order, isChecked: false };
      }
      return order;
    });

    const selectedOrders = checkableOrders.filter(order => order.isChecked);
    const quantitySelectedOrders = selectedOrders.length;

    let isAllSelected =
      checkableOrders.filter(order => isThereAnyPendingOrder(order)).findIndex(order => !order.isChecked) ===
        -1 || isAllChecked;

    this.setState({
      integratedStoreOrders: {
        orders: checkableOrders
      },
      isAllSelected,
      selectedOrders,
      quantitySelectedOrders
    });
  };

  renderBulkOrderSelector() {
    const { quantitySelectedOrders, selectedOrders, isAllSelected, integratedStoreOrders } = this.state;
    const { t } = this.props;

    const quantityOrders = integratedStoreOrders.orders.length;
    const noSelectedOrdersText = t("OrderList.CheckBox.SelectAllOrders");
    const selectedOrdersText = t("OrderList.CheckBox.SelectedXOrders", { count: quantitySelectedOrders });

    const bulkOrderSelectorText = quantitySelectedOrders === 0 ? noSelectedOrdersText : selectedOrdersText;

    return (
      <Fragment>
        {quantityOrders > 0 && (
          <div className="card Orders__checkbox-container">
            <StyledCheckbox
              name="bulkOrderSelector"
              checked={isAllSelected}
              onChange={e => this.onCheck("bulkOrderSelector", e.target.checked)}
            >
              {bulkOrderSelectorText}
            </StyledCheckbox>
            <Button
              variant="brand"
              disabled={quantitySelectedOrders === 0}
              onClick={() =>
                getActivePlan() !== "Unicorn"
                  ? this.props.showModal("UPGRADE_MODAL", {
                      referrerPage: "orders",
                      referrerContext: "bulk_checkout",
                      upgradeStep: "viewed_all_plans"
                    })
                  : this.props.showModal("CONFIRM_CHECKOUT_ORDER_MODAL", {
                      selectedOrders,
                      onCheck: () => this.onCheck("bulkOrderSelector", false),
                      updateStatusToPaying: () =>
                        this.setState({
                          integratedStoreOrders: {
                            orders: updateOrderStatusToPaying(
                              this.state.integratedStoreOrders.orders,
                              selectedOrders
                            )
                          }
                        })
                    })
              }
            >
              {t("OrderList.CheckBox.BulkCheckoutOrders", { count: quantitySelectedOrders })}
            </Button>
          </div>
        )}
      </Fragment>
    );
  }

  getOrdersAsCSV() {
    const storeID = localStorage.getItem("shop_id");
    const url = `${process.env.REACT_APP_API_URL}/stores/orders/export?token=${storeID}`;

    return url;
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <div className="Orders__title-container">
          <div>
            <h2 className="title-header">{t("OrderList.Header.Title")}</h2>
          </div>
          <div className="Orders__sync_btn text-right">
            {!isIntegratedStoreSpocket() && this.renderDisplayHeader()}
          </div>
        </div>
        <PaymentCompleteModal shown={this.state.paymentComplete} close={this.closePaymentCompletedModal} />
        {this.state.isDiscountedCTAOpen && this.renderDiscountedCTA()}
        <Loadable active={Boolean(this.state.refreshingOrders || this.state.loading)}>
          <div className="Orders__filters-container">
            <div>
              <div className="Orders__filters">
                <StyledInput
                  variant="big"
                  placeholder={t("OrderList.Input.Search")}
                  onChange={e =>
                    this.setState({
                      orderNumberFilter: e.target.value
                    })
                  }
                  onKeyPress={this.handleKeyPress}
                  name="keywords"
                />
                <SearchButton
                  variant="brand"
                  onClick={() =>
                    this.setState({ activePage: 1 }, () => {
                      this.handleOrderRequest();
                    })
                  }
                >
                  <img src={searchIcon} alt="search order" />
                </SearchButton>
              </div>
            </div>
            <div>
              <div className="Orders__filters_checkbox">
                <div className="Orders__filters_checkbox_title">{t("OrderList.Label.Status")}: </div>
                <span>
                  <RoundedCheckBox
                    name="unpaid"
                    checked={this.state.filters.unpaid}
                    onChange={() => this.filterBySpocketStatus("unpaid")}
                  >
                    {t("order.status.unpaid")}
                  </RoundedCheckBox>
                  <RoundedCheckBox
                    name="paid"
                    checked={this.state.filters.paid}
                    onChange={() => this.filterBySpocketStatus("paid")}
                  >
                    {t("order.status.paid")}
                  </RoundedCheckBox>
                  <RoundedCheckBox
                    name="processing"
                    checked={this.state.filters.processing}
                    onChange={() => this.filterBySpocketStatus("processing")}
                  >
                    {t("order.status.processing")}
                  </RoundedCheckBox>
                  <RoundedCheckBox
                    name="shipped"
                    checked={this.state.filters.shipped}
                    onChange={() => this.filterBySpocketStatus("shipped")}
                  >
                    {t("order.status.shipped")}
                  </RoundedCheckBox>
                </span>
              </div>
            </div>
          </div>
          <div className="Order__bulk-csv">
            <div>
              {showBulkCheckoutComponent(this.state.integratedStoreOrders.orders) &&
                this.renderBulkOrderSelector()}
            </div>

            {this.state.integratedStoreOrders.orders.length > 0 && (
              <a
                href={this.getOrdersAsCSV()}
                target="_blank"
                className="Order__download-csv"
                rel="noreferrer"
              >
                <img src={iconDownload} alt="Download" />
                {t("OrderList.Label.DownloadHistory")}
              </a>
            )}
          </div>
          {this.renderOrders()}
        </Loadable>
        <div className="row text-center mt-20">
          {this.state.pageCount > 1 && (
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              bsSize="small"
              items={this.state.pageCount}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={e => this.handlePageSelect(e, this.state.searchText)}
            />
          )}
        </div>
        <PageFooter />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlertMessage,
      getPaymentSettings,
      showModal,
      fetchDropshipperData
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    hasStripe: state.settings.stripeCustomerId,
    featureFlags: state.featureFlags.featureFlags,
    dropshipperData: state.settings.dropshipperData
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderList)
);



// WEBPACK FOOTER //
// ./src/components/OrderList/index.js