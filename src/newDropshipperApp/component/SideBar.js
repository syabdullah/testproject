// React
import React, { Component } from "react";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Link, browserHistory } from "react-router";
import { withTranslation } from "react-i18next";

// Actions
import { showModal } from "../../actions/ui";
import { generateSsoUrl } from "../module/thinkific/signin";

// Components
import NotificationCenter from "./NotificationCenter";
import Language from "./sidebar/Language";
import Count from "newDropshipperApp/component/sidebar/ItemsCount.js";

// Utils
import { openLink } from "../utils/openLink";
import { checkLanguageAndReturnClassName } from "utils/i18n/languageUtils";

// Images
import logo from "../images/spocket-logo.svg";
import barLineIcon from "../images/bar-lines-icon.svg";
import crossIcon from "../images/cross-icon.svg";
import purpleSearch from "../images/purple-search-icon.svg";
import purpleImportList from "../images/purple-import-list-icon.svg";
import purpleProductList from "../images/purple-product-list-icon.svg";
import purpleMyOrder from "../images/purple-my-order-icon.svg";
// import purpleDeals from "../images/purple-deals-page-icon.svg";
// import purpleGraduate from "../images/purple-graduate-icon.svg";
import purpleHelpCenter from "../images/purple-help-center-icon.svg";
import purpleMyShop from "../images/purple-my-shop-icon.svg";
import purpleSettings from "../images/purple-settings-icon.svg";
import puzzleIcon from "../../newDropshipperApp/images/puzzle.svg";

import "./SideBar.css";
import { SideBarContainer } from "./SideBarStyle";

class SideBar extends Component {
  state = {
    sideBarOpen: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.state.sideBarOpen === true && this.toggleClickHandler();
    }
  };

  toggleClickHandler = () => {
    this.setState(prevState => {
      return { sideBarOpen: !prevState.sideBarOpen };
    });
  };

  handleClickOnStore = () => {
    const integratedStoreId = localStorage.getItem("integrated_store_id");

    if (!integratedStoreId) {
      this.props.showModal("CONNECT_STORE");
      return;
    }

    /**
     * Checking if the shop_url have // like https:// or http://
     * If yes, the shopUrl will be [ "http:", URL]
     * If not, the shopUrl will be [ URL]
     **/
    const shopUrl = localStorage.shop_url.split("//");
    openLink(`http://${shopUrl[1] ? shopUrl[1] : shopUrl[0]}`);
  };

  shouldShowMyShopLink = () => {
    const integratedStoreName = localStorage.getItem("integrated_store_name");
    const shopUrl = localStorage.shop_url.split("//");
    return integratedStoreName !== "wix" || /\./.test(shopUrl);
  };

  renderNewTag = () => {
    const integratedStoreId = localStorage.getItem("integrated_store_id");

    if (!integratedStoreId) {
      return <span className="side-bar__my-shop-tag">New</span>;
    }
  };

  render() {
    const { sideBarOpen } = this.state;
    const {
      // currentPlan,
      // showModal,
      importListCount,
      productListCount,
      ordersCount,
      t,
      i18n
    } = this.props;

    let toggleIcon = sideBarOpen ? crossIcon : barLineIcon;

    // Get class if user has specific language
    const languageClass = checkLanguageAndReturnClassName(["fr", "pt"], i18n.language);

    return (
      <div className="side-bar-spocket" ref={this.setWrapperRef}>
        <SideBarContainer sticky={this.props.sticky}>
          <div className={`side-bar__logo ${languageClass}`}>
            <img onClick={() => browserHistory.push("/search")} src={logo} className="logo" alt="Spocket" />
            <div className="side-bar__toggle-container">
              <NotificationCenter />
              <span className="side-bar__toggle" onClick={this.toggleClickHandler}>
                <img src={toggleIcon} alt="Toggle Icon" />
              </span>
            </div>
          </div>
          <div
            className={`
            side-bar__container
            ${sideBarOpen && `side-bar__container-open`}
            ${languageClass}
          `}
          >
            <div className="side-bar__list">
              <div className="side-bar__list-top">
                <ul>
                  <li onClick={this.toggleClickHandler}>
                    <Link
                      data-cy="search"
                      to={{
                        pathname: "/search",
                        state: new Date().getTime()
                      }}
                      activeClassName="side-bar__list-active"
                    >
                      <img className="side-bar__list-search" src={purpleSearch} alt="Search icon" />
                      {t("Sidebar.SearchProducts")}
                    </Link>
                  </li>
                  <li data-cy="sidebar-import-list" onClick={this.toggleClickHandler}>
                    <Link to="/import" activeClassName="side-bar__list-active">
                      <img className="side-bar__list-search" src={purpleImportList} alt="Import list icon" />
                      <span>{t("Sidebar.ImportList")}</span>
                      <Count
                        option="importedListings"
                        isActive={window.location.pathname === "/import"}
                        fixedNumber={importListCount}
                      />
                    </Link>
                  </li>
                  <li onClick={this.toggleClickHandler}>
                    <Link
                      to="/products"
                      data-cy="sidebar-my-products"
                      activeClassName="side-bar__list-active"
                    >
                      <img className="side-bar__list-search" src={purpleProductList} alt="Products icon" />
                      <span>{t("Sidebar.MyProducts")}</span>
                      <Count
                        option="pushedListings"
                        isActive={window.location.pathname === "/products"}
                        fixedNumber={productListCount}
                      />
                    </Link>
                  </li>
                  <li data-cy="sidebar-orders" className="mb-20" onClick={this.toggleClickHandler}>
                    <Link to="/orders" activeClassName="side-bar__list-active">
                      <img className="side-bar__list-search" src={purpleMyOrder} alt="Orders icon" />
                      <span>{t("Sidebar.MyOrders")}</span>
                      <Count
                        option=""
                        isActive={window.location.pathname === "/orders"}
                        fixedNumber={ordersCount}
                      />
                    </Link>
                  </li>
                  {localStorage.getItem("language") === "en" && (
                    <li className="mb-20" onClick={this.toggleClickHandler}>
                      <Link data-test="apps" to="/apps" activeClassName="side-bar__list-active">
                        <img className="side-bar__list-search" src={puzzleIcon} alt="Apps icon" />
                        <span>{t("Sidebar.Apps")}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="side-bar__list-bottom">
                <ul>
                  <li onClick={this.toggleClickHandler}>
                    <Link onClick={() => this.props.showModal("TUTORIAL")}>
                      <img className="side-bar__list-search" src={purpleHelpCenter} alt="Help Center icon" />
                      {t("Sidebar.HelpCenter")}
                    </Link>
                  </li>
                  {this.shouldShowMyShopLink() && (
                    <li onClick={this.toggleClickHandler}>
                      <Link onClick={this.handleClickOnStore}>
                        <img className="side-bar__list-search" src={purpleMyShop} alt="My shop icon" />
                        {t("Sidebar.MyShop")}
                        {this.renderNewTag()}
                      </Link>
                    </li>
                  )}
                  <li data-cy="sidebar-settings" onClick={this.toggleClickHandler}>
                    <Link to="/settings" activeClassName="side-bar__list-active">
                      <img className="side-bar__list-search" src={purpleSettings} alt="Settings icon" />
                      {t("Sidebar.Settings")}
                    </Link>
                  </li>
                  <li>
                    <Language />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SideBarContainer>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, generateSsoUrl }, dispatch);
}

function mapStateToProps(state) {
  const data = state.settings.dropshipperData;

  return {
    importListCount: data.import_list_count,
    productListCount: data.product_list_count,
    ordersCount: data.orders_count,
    currentPlan: state.settings.currentPlan,
    dropshipperData: state.settings.dropshipperData,
    featureFlags: state.featureFlags.featureFlags
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideBar)
);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/SideBar.js