// @flow
import "./style.css";

import { IntercomAPI } from "react-intercom";
import { Link } from "react-router";
import { Row, Col, Pagination } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { default as Loadable } from "../_Shared/commonLoadable";
import PropTypes from "prop-types";
import React from "react";
import websocketURL from "../../utils/websocketURL";

import { featureFlagEnabled } from "../../newDropshipperApp/utils/featureFlag";
import { gaEvent } from "../../newDropshipperApp/utils/trackEvents";
import { getCollections, getPricingRuleSettings, fetchDropshipperData } from "../../actions/settings";
import { setAlertMessage } from "../../actions";
import ApiCall from "../../utils/apiCall";
import Filter from "./Filter";
import ImportItemList from "./ImportItemList";
import NoImports from "../../assets/no-import.svg";
import purplePlayIcon from "../../assets/purple-play-icon.svg";
import PageFooter from "../PageFooter";
import { showModal } from "../../actions/ui";
import DocumentTitle from "react-document-title";
import { withTranslation } from "react-i18next";

class ImportList extends React.Component {
  static propTypes = {
    setAlertMessage: PropTypes.func.isRequired,
    getCollections: PropTypes.func.isRequired
  };

  state = {
    filterText: "",
    searchText: "",
    refreshingItems: false,
    loading: false,
    items: [],
    removedItems: [],
    displayHeader: false,
    totalProducts: 0, //For pagination
    totalPushedProducts: 0,
    currentProductView: 0,
    activePage: 1,
    saveAndPush: false
  };
  ws = new WebSocket(websocketURL());

  PRODUCT_LIMIT_PER_PAGE = 6;

  UNSAFE_componentWillMount = () => {
    this.props.getPricingRuleSettings();
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.subscribePushProductChannel();
    IntercomAPI("trackEvent", "Visit: Import list page");
    process.env.NODE_ENV === "development" && this.handleGenerateItems();
  }

  componentDidUpdate(prevProps) {
    if (this.state.saveAndPush) {
      this.setState({
        saveAndPush: false
      });
    }

    if (prevProps.integratedStoreId !== this.props.integratedStoreId) {
      this.fetchCollections(this.props.integratedStoreId);
    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  /**
   * Fetches the collectons for the collection options, to be used on ItemInfo
   * component
   *
   */
  fetchCollections(integratedStoreId) {
    this.props.getCollections(integratedStoreId);
  }

  async getPushedProductCount() {
    const count = await this.fetchPushedProductCount();
    this.setState({ ...count });
  }

  fetchPushedProductCount() {
    return ApiCall.get("/pushed_listing_customizations", { page: 1 }).then(({ json }) => {
      return {
        totalPushedProducts: json.total_count,
        specialPushedProducts: json.special_count,
        canPushSpecialProducts: json.can_push_special_products
      };
    });
  }

  subscribePushProductChannel = () => {
    this.ws.onopen = () => {
      this.ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: '{"channel":"ApplicationCable::Dropshippers::PushProductChannel"}'
        })
      );
    };

    this.ws.onmessage = evt => {
      const data = JSON.parse(evt.data);
      if (data["type"] === "confirm_subscription") {
        this.handleGenerateItems();
        this.getPushedProductCount();
        this.props.fetchDropshipperData();
        this.fetchCollections(this.props.integratedStoreId);
      }
      "message" in data && this.updateProductPushStatusViaWebsocket(data);
    };
  };

  updateProductPushStatusViaWebsocket(data) {
    const { items } = this.state;
    if (Object.keys(data.message).length >= 0 && items.length > 0) {
      const { status, message, listing_customization_id } = data.message;
      let item = items.find(item => item.id === listing_customization_id);
      switch (status) {
        case "success":
          IntercomAPI("trackEvent", "Push to Shop");
          this.removeItem(item.id);
          this.handleLastProductAction();
          this.props.setAlertMessage(`${this.props.t("ImportList.Alert.Pushed")} ${item.title}`, "success");
          gaEvent({
            category: "Pushed Products",
            action: "Pushed Product to Store"
          });
          const { productListCount, hasReviewed } = this.props;
          if (hasReviewed === false && productListCount === 0 && this.showForTestUser()) {
            this.showSpocketReviewModal();
          }
          this.toggleIsPushing(item.id, false);
          break;
        case "error":
          this.props.setAlertMessage(message, "error");
          this.toggleIsPushing(item.id, false);
          break;
        default:
          break;
      }
    }
  }

  handleDisplayHeader = bool => {
    if (bool) {
      this.setState({
        displayHeader: bool
      });
    } else {
      this.setState({
        displayHeader: bool,
        items: []
      });
    }
  };

  handleItemsAction = bool => {
    this.setState({
      refreshingItems: bool
    });
  };

  handleGenerateItems = (hideLoading = false) => {
    if (!hideLoading) {
      this.setState({
        loading: true
      });
    }
    ApiCall.get("/import_list", {
      page: this.state.activePage,
      query: this.state.filterText
    })
      .then(({ status, json }) => {
        if (json.count) {
          this.handleDisplayHeader(true);
        }
        let formatted_items = json.listing_customizations.map(item => {
          return { ...item, isPushing: item.is_pushing };
        });
        this.setState(
          {
            items: formatted_items,
            totalProducts: json.count
          },
          () => {
            // If our search was empty, make sure we are on the first page
            if (this.state.activePage > 1 && this.state.items.length === 0) {
              this.handleBackstepPage();
            }
          }
        );
        // this.getPushedProductCount();
      })
      .catch(error => {
        if (error.json === undefined) {
          // Throws an error if the code in the "then" produces an error.
          throw error;
        } else if (error.json.message !== "There are no products waiting to be imported") {
          if (!this.state.refreshingItems) {
            this.props.setAlertMessage(error.json.message, "error");
          }
        } else {
          this.setState({ items: [], totalProducts: 0 });
          this.handleDisplayHeader(false);
        }
      })
      .then(() => {
        this.setState({
          refreshingItems: false,
          loading: false
        });
      });
  };

  handleFilterTextInput = filterText => {
    this.setState({ filterText });
  };

  handleResetSearch = () => {
    this.setState(
      {
        filterText: "",
        searchText: "",
        activePage: 1
      },
      () => {
        this.handleGenerateItems(true);
      }
    );
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    this.setState(
      {
        activePage: 1,
        searchText: this.state.filterText,
        loading: true
      },
      () => {
        this.handleGenerateItems(true);
      }
    );
  };

  handlePushAll = () => {
    this.setState({ saveAndPush: true });
  };

  calculatePageCount = () => {
    let pageCount = Math.floor(this.state.totalProducts / this.PRODUCT_LIMIT_PER_PAGE);
    if (this.state.totalProducts % this.PRODUCT_LIMIT_PER_PAGE !== 0) {
      pageCount++;
    }
    return pageCount;
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
        saveAndPush: false
      },
      () => {
        window.scrollTo(0, 0);
        this.handleGenerateItems();
      }
    );
  };

  /**
   * Pagnation:
   *  Go Back one page, but only if there is one item on the page
   *  Used for when the page is about to be empty.
   * @return {null}
   */
  checkBackstepPage = () => {
    if (this.state.activePage > 1 && this.state.items.length === 1) {
      this.handleBackstepPage();
    }
  };

  /**
   * Pagnation:
   *  Go Back one page
   * @return {null}
   */
  handleBackstepPage = () => {
    if (this.state.activePage > 1) {
      this.handlePageSelect(this.state.activePage - 1);
    }
  };

  toggleIsPushing = (item_id, toggle) => {
    let index = this.state.items.findIndex(item => item.id === item_id);
    if (index >= 0)
      this.setState(state => ({
        items: [
          ...state.items.slice(0, index),
          { ...state.items[index], isPushing: toggle },
          ...state.items.slice(index + 1)
        ]
      }));
  };

  removeItem = id => {
    this.checkBackstepPage();
    const removedItems = [...this.state.removedItems, id];
    this.setState({ removedItems });
    this.props.fetchDropshipperData();
    if (this.state.removedItems.length >= this.state.items.length) {
      this.handleGenerateItems(true);
    }
  };

  /**
   * Display Header if only one product on the page
   * @return {null}
   */
  handleLastProductAction = () => {
    const { removedItems, items } = this.state;
    // Temporary workaround for push all
    this.handleDisplayHeader(removedItems.length !== items.length);
  };

  showForTestUser = () => {
    return featureFlagEnabled({
      name: "Review Modal",
      user: this.props.dropshipperData,
      featureFlags: this.props.featureFlags
    });
  };

  showSpocketReviewModal = () => {
    setTimeout(() => this.props.showModal("REVIEW_SPOCKET_MODAL", { type: "pushProduct" }), 2000);
  };

  renderEmptyImportList = (title, subtext) => {
    return (
      <Row className="mt-80">
        <Col xs={12} md={6}>
          <h3 className="mb-20 import-list__main-message">{title}</h3>
          <p className="mb-20 import-list__sub-message">{subtext}</p>
          <div className="import-list__empty-options">
            <Link to="/search" className="btn btn-primary import-list__search-btn">
              {this.props.t("ImportList.Empty.Button.Search")}
            </Link>
            <p className="mt-20">
              <a
                className="cursorPointer"
                onClick={() =>
                  this.props.showModal("WISTIA", {
                    type: "product_customization"
                  })
                }
              >
                {this.props.t("ImportList.Empty.Button.How")}
                <img src={purplePlayIcon} alt="Purple PlayIcon" />
              </a>
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <img src={NoImports} alt="" className="img-responsive" />
        </Col>
      </Row>
    );
  };

  renderImportList = () => {
    if (this.state.items.length === 0) {
      if (this.state.loading) {
        return this.renderEmptyImportList(
          this.props.t("ImportList.Loading.Top"),
          this.props.t("ImportList.Loading.Bottom")
        );
      } else {
        return this.renderEmptyImportList(
          this.props.t("ImportList.Empty.Top"),
          this.props.t("ImportList.Empty.Bottom")
        );
      }
    }

    return (
      <ImportItemList
        items={this.state.items}
        removedItems={this.state.removedItems}
        removeItem={this.removeItem}
        toggleIsPushing={this.toggleIsPushing}
        onRegenerateItems={this.handleGenerateItems}
        lastProductAction={this.handleLastProductAction}
        refreshPushedProductCount={() => this.fetchPushedProductCount()}
        onBackstepPage={this.handleBackstepPage}
        saveAndPush={this.state.saveAndPush}
        totalPushedProducts={this.state.totalPushedProducts || true}
        specialPushedProducts={this.state.specialPushedProducts || true}
        location={this.props.location}
      />
    );
  };

  render() {
    const { t } = this.props;
    const pageCount = this.calculatePageCount();
    return (
      <div>
        <DocumentTitle title={t("ImportList.Title.Head")} />
        <div>
          <h2 className="title-header">{t("ImportList.Title.Header")}</h2>
        </div>
        <Filter
          displayHeader={this.state.displayHeader}
          filterText={this.state.filterText}
          searchText={this.state.searchText}
          isLoading={this.state.loading}
          onFilterTextInput={this.handleFilterTextInput}
          onSearchSubmit={this.handleSearchSubmit}
          onResetSearch={this.handleResetSearch}
          onItemsAction={this.handleItemsAction}
          handlePushAll={this.handlePushAll}
        />
        <Loadable active={Boolean(this.state.refreshingItems || this.state.loading)}>
          {this.renderImportList()}
        </Loadable>
        <div className="row text-center mt-20">
          {pageCount > 1 ? (
            <Pagination
              first
              prev
              ellipsis
              next
              last
              boundaryLinks
              bsSize="small"
              items={pageCount}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handlePageSelect}
            />
          ) : (
            ""
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
      getCollections,
      getPricingRuleSettings,
      showModal,
      fetchDropshipperData
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    currentPlan: state.settings.currentPlan,
    allPlans: state.store.plans.allPlans,
    integratedStoreId: state.settings.integratedStoreId,
    productListCount: state.settings.dropshipperData.product_list_count,
    hasReviewed: state.store.information.account.review.created_at.length > 0,
    featureFlags: state.featureFlags.featureFlags,
    dropshipperData: state.settings.dropshipperData
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImportList)
);



// WEBPACK FOOTER //
// ./src/components/ImportList/index.js