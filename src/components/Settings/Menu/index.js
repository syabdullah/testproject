import React from "react";
import { Link } from "react-router";

import userAccount from "../../../assets/userAccount.svg";
import security from "../../../assets/security.svg";
import pricing from "../../../assets/pricing.svg";
import global from "../../../assets/global.svg";
import invoice from "../../../assets/invoice.svg";
import card from "../../../assets/card.svg";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { fetchDropshipperData } from "../../../actions/settings";
import { showModal } from "../../../actions/ui";
import { getStripeInformation } from "../../../newDropshipperApp/module/stripeIntegration/account";

import "./style.css";

class MenuTab extends React.Component {
  componentDidMount() {
    this.props.fetchDropshipperData();
    if (this.props.storeName === "spocket") this.props.getStripeInformation();
  }

  render() {
    const menuOptions = [
      {
        name: this.props.t("Settings.MenuTab.Plans"),
        router: "/settings/plan",
        icon: pricing
      },
      {
        name: this.props.t("Settings.MenuTab.Account"),
        router: "/settings/account",
        icon: userAccount
      },
      {
        name: this.props.t("Settings.MenuTab.BrandedInvoicing"),
        router: "/settings/invoice",
        icon: invoice
      },
      {
        name: this.props.t("Settings.MenuTab.Billing"),
        router: "/settings/payment",
        icon: card
      },
      {
        name: this.props.t("Settings.MenuTab.GlobalPricingRules"),
        router: "/settings/pricing",
        icon: global
      },
      {
        name: this.props.t("Settings.MenuTab.Security"),
        router: "/settings/security",
        icon: security
      }
    ];

    return (
      <div className="tab-container">
        <ul className="tab-row">
          {menuOptions.map(option => {
            return (
              <li id={option.name} key={option.name} data-cy={`menu-tab-${option.name.toLowerCase()}`}>
                <Link className="tab-link" to={option.router} activeClassName="selected">
                  <img src={option.icon} alt={option.name} />
                  <p>{option.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, fetchDropshipperData, getStripeInformation }, dispatch);
}

function mapStateToProps(state) {
  return {
    registered: state.auth.registered,
    storeName: state.settings.dropshipperData.integrated_store_name
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuTab)
);



// WEBPACK FOOTER //
// ./src/components/Settings/Menu/index.js