import React from "react";
import { Row, Col } from "react-bootstrap";
import PageFooter from "../PageFooter";
import AccountTab from "./AccountTab";
import Menu from "./Menu";
import PaymentTab from "./PaymentTab";
import InvoiceTab from "./InvoiceTab";
import PlansTab from "./PlansTab";
import PricingTab from "./PricingTab";
import SecurityTab from "./SecurityTab";
import { withTranslation } from "react-i18next";

import "./style.css";

class Settings extends React.Component {
  _isMounted = false;
  state = {
    isFetching: false
  };

  onSaveButtonClick = () => {
    this.setState({ isFetching: true });
    let wrappedInstance = this.refs.settingsForm.getWrappedInstance();

    if (wrappedInstance.handleFormSubmit) {
      wrappedInstance.handleFormSubmit().then(() => {
        // use _isMounted to recognize if the component is currently mounted
        // and setState only when it is mounted.
        this._isMounted && this.setState({ isFetching: false });
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  outputSaveChanges = () => {
    const { t } = this.props;
    switch (this.props.routes[this.props.routes.length - 1].path) {
      case "security":
      case "pricing":
      case "account":
        return (
          <button
            className="btn btn-primary"
            onClick={this.onSaveButtonClick}
            disabled={this.state.isFetching}
          >
            {t("Settings.buttonSaveChanges")}
          </button>
        );
      case "invoice":
        return (
          <button
            className="btn btn-primary"
            onClick={this.onSaveButtonClick}
            disabled={this.state.isFetching}
          >
            {t("Settings.buttonSaveAndPreview")}
          </button>
        );
      default:
        break;
    }
  };

  render() {
    const { t } = this.props;
    const childrenWithRefs = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ref: "settingsForm"
      })
    );
    const forceUpgrade = localStorage.getItem("force_upgrade") === "true";
    if (forceUpgrade) {
      return (
        <div>
          <Row className="mt-20 Settings__body">
            <Col xs={12} md={9} className="Settings__container card">
              {childrenWithRefs}
            </Col>
          </Row>
          <PageFooter />
        </div>
      );
    } else {
      return (
        <div className="Settings__menu-area">
          <div className="Settings__title-container">
            <div>
              <h2 className="title-header settings__title">{t("Settings.title")}</h2>
            </div>
            <div className=" Settings__save-button">{this.outputSaveChanges()}</div>
          </div>
          <div>
            <Menu />
          </div>
          <Row className="Settings__body">
            <Col xs={12} className="Settings__container card">
              {childrenWithRefs}
            </Col>
          </Row>
          <PageFooter />
        </div>
      );
    }
  }
}

const SettingsComponents = {
  AccountTab: AccountTab,
  InvoiceTab: InvoiceTab,
  PaymentTab: PaymentTab,
  PlansTab: PlansTab,
  PricingTab: PricingTab,
  SecurityTab: SecurityTab,
  Settings: withTranslation()(Settings)
};

export default SettingsComponents;



// WEBPACK FOOTER //
// ./src/components/Settings/index.js