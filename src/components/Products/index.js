// @flow
import React from "react";

// Libs
import PropTypes from "prop-types";
import { Col, Pagination, Row } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import DocumentTitle from "react-document-title";
import { withTranslation } from "react-i18next";

// Components
import { default as Loadable } from "../_Shared/commonLoadable";
import { Drawer } from "newDropshipperApp/spocketUI";
import Search from "./Search";
import Filters from "./Filters";
import FilterTags from "./FilterTags";
import ProductList from "./ProductList";
import PageFooter from "../PageFooter";

// Actions
import { setAlertMessage } from "../../actions";
import { showModal } from "../../actions/ui";
import { fetchDropshipperData } from "../../actions/settings";

// Utils
import ApiCall from "../../utils/apiCall";

// Assets
import NoProducts from "../../assets/no-products.svg";
import purplePlayIcon from "../../assets/purple-play-icon.svg";

import "./style.css";

class Products extends React.Component {
  static propTypes = {
    setAlertMessage: PropTypes.func.isRequired
  };

  productLimitPerPage = 20;

  state = {
    products: [],
    searchText: "",
    total_num_of_products: 0,
    activePage: 1,
    loading: false,
    displayHeader: false,
    integratedStore: {},
    filtersOpen: false,
    selectedFilter: ""
  };

  componentDidMount() {
    this.handleProductRequest();
    this.props.fetchDropshipperData();
  }

  handleDisplayHeader = () => {
    this.setState({
      displayHeader: this.state.total_num_of_products > 0 || this.state.selectedFilter
    });
  };

  // TODO: Refactor to redux
  handleProductRequest = () => {
    this.setState({
      loading: true
    });
    const searchTextCurrent = this.state.searchText;
    ApiCall.get("/pushed_listing_customizations", {
      page: this.state.activePage,
      query: this.state.searchText,
      status: this.state.selectedFilter
    }).then(({ json }) => {
      this.setState({
        total_num_of_products: json.total_count,
        products: json.listing_customizations,
        loading: false,
        integratedStore: json.integrated_store
      });
      if (searchTextCurrent === "") {
        this.handleDisplayHeader();
      }
    });
  };

  handleCalculatePageCount = () => {
    let pageCount = Math.ceil(this.state.total_num_of_products / this.productLimitPerPage);
    return pageCount;
  };

  handleSearchTextInputChange = value => {
    this.setState({
      searchText: value
    });
  };

  handleOpenFilters = value => {
    this.setState({
      filtersOpen: value
    });
  };

  setSelectedFilter = value => {
    this.setState(
      {
        selectedFilter: value
      },
      function() {
        this.handleProductRequest();
      }
    );
  };

  handleSearchSubmit = () => {
    // TODO: Could consider splitting searchText into individual keywords
    this.setState(
      {
        activePage: 1
      },
      function() {
        this.handleProductRequest();
      }
    );
  };

  handlePageSelect = eventKey => {
    this.setState({ activePage: eventKey }, () => this.handleProductRequest());
  };

  // TODO: Refactor to redux
  handleRemoveProductFromStore = id => {
    this.setState({
      loading: true
    });

    ApiCall.delete(`/pushed_listing_customizations/${id}`).then(response => {
      const displayedProducts = this.state.products.filter(product => product.id !== id);
      this.props.setAlertMessage(this.props.t("Products.Alert.Removed"), "success");
      this.props.fetchDropshipperData();

      // correct
      if (displayedProducts.length === 0) {
        let activePage = this.state.activePage;
        if (activePage > 1) {
          activePage--;
        }
        this.setState({ activePage: activePage }, this.handleProductRequest);
      } else if (displayedProducts.length < 20 && this.state.total_num_of_products > 20) {
        this.handleProductRequest();
      } else if (this.state.activePage === 1) {
        this.setState({
          loading: false,
          products: displayedProducts
        });
      } else {
        this.handleProductRequest();
      }
    });
  };

  renderEmptyProducts = (title, subtext) => {
    return (
      <Row className="mt-80">
        <Col xs={12} md={6}>
          <h3 className="mb-20 products__main-message">{title}</h3>
          <p className="mb-20 products__sub-message">{subtext}</p>
          <div className="products__empty-options">
            <Link to="/search" className="btn btn-primary products__search-btn">
              {this.props.t("Products.Empty.Button.Search")}
            </Link>
            <p className="mt-20">
              <a
                className="cursorPointer"
                onClick={() =>
                  this.props.showModal("WISTIA", {
                    type: "discover_products"
                  })
                }
              >
                {this.props.t("Products.Empty.Button.How")}
                <img src={purplePlayIcon} alt="Purple PlayIcon" />
              </a>
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <img src={NoProducts} alt="" className="img-responsive" />
        </Col>
      </Row>
    );
  };

  renderProducts = displayedProducts => {
    if (displayedProducts.length === 0) {
      if (this.state.loading) {
        return this.renderEmptyProducts(
          this.props.t("Products.Loading.Top"),
          this.props.t("Products.Loading.Bottom")
        );
      }
      if (this.state.searchText) {
        return this.renderEmptyProducts(this.props.t("Products.Empty.Search"));
      }
      return this.renderEmptyProducts(
        this.props.t("Products.Empty.Top"),
        this.props.t("Products.Empty.Bottom")
      );
    }
    return (
      <ProductList
        products={displayedProducts}
        onRemoveFromStore={this.handleRemoveProductFromStore}
        integratedStore={this.state.integratedStore}
      />
    );
  };

  render() {
    const { t } = this.props;
    const displayedProducts = this.state.products;
    const pageCount = this.handleCalculatePageCount();
    return (
      <div>
        <DocumentTitle title={t("Products.Title.Head")} />
        <div>
          <h2 className="title-header" style={{ marginBottom: "20px" }}>
            {t("Products.Title.Header")}
          </h2>
        </div>
        <Search
          displayHeader={this.state.displayHeader}
          searchText={this.state.searchText}
          onSearchSubmit={this.handleSearchSubmit}
          onSearchTextInputChange={this.handleSearchTextInputChange}
          openFilters={this.handleOpenFilters}
          selectedFilter={this.state.selectedFilter}
        />
        <FilterTags selectedFilter={this.state.selectedFilter} setSelectedFilter={this.setSelectedFilter} />
        <Loadable active={Boolean(this.state.loading)}>{this.renderProducts(displayedProducts)}</Loadable>
        <br />
        <div className="row text-center">
          {pageCount > 1 ? (
            <Pagination
              onSelect={this.handlePageSelect}
              items={pageCount}
              activePage={this.state.activePage}
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              bsSize="small"
              maxButtons={5}
            />
          ) : (
            ""
          )}
        </div>
        <Drawer drawerOpen={this.state.filtersOpen} setDrawerOpen={this.handleOpenFilters}>
          <Filters
            setSelectedFilter={this.setSelectedFilter}
            selectedFilter={this.state.selectedFilter}
            setDrawerOpen={this.handleOpenFilters}
          />
        </Drawer>
        <PageFooter />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage, showModal, fetchDropshipperData }, dispatch);
}

export default withTranslation()(
  connect(
    null,
    mapDispatchToProps
  )(Products)
);



// WEBPACK FOOTER //
// ./src/components/Products/index.js