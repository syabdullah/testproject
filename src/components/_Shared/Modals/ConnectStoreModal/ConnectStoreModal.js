// React and Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Libs
import { Col, Row } from "react-bootstrap";
import { withTranslation } from "react-i18next";

// Components
import ModalWrapper from "../../ModalWrapper";
import { default as Loadable } from "../../commonLoadable";

// Actions
import { closeModal, showModal } from "../../../../actions/ui";
import { connectToStore, verify } from "../../../../actions";

// Icons
import shopify from "../../../../assets/connect_store/shopify_text_logo.png";
import woocommerce from "../../../../assets/connect_store/woocommerce_text_logo.png";
import wix from "../../../../assets/connect_store/wix_text_logo.png";
import bigcommerce from "../../../../assets/connect_store/bigcommerce_text_logo.png";
import squarespace from "../../../../assets/connect_store/squarespace_text_logo.png";
import square from "../../../../assets/connect_store/square_text_logo.png";
import felex from "../../../../assets/connect_store/felex_logo.svg";
import ecwid from "../../../../assets/connect_store/ecwid_text_logo.png";

// Style
import "./ConnectStoreModal.css";

class ConnectStoreModal extends Component {
  state = {
    selectedStore: null,
    storeName: "",
    loading: false,
    showStoreNameError: false
  };

  handleConnectToStore = event => {
    event.preventDefault();
    const { selectedStore, storeName } = this.state;

    this.setState({ loading: true });

    if (
      selectedStore !== "wix" &&
      selectedStore !== "squarespace" &&
      selectedStore !== "square" &&
      selectedStore !== "felex" &&
      selectedStore !== "ecwid" &&
      (storeName === "" || storeName === null)
    ) {
      this.setState({ loading: false, showStoreNameError: true });
    } else {
      this.props.connectToStore(storeName, selectedStore);
    }
  };

  handleFormChange = event => {
    const storeName = event.target.value;

    this.setState({
      storeName: this.normalizeStoreUrl(storeName),
      showStoreNameError: false
    });
  };

  // Returns a new URL with no protocol (https:// or http://)
  removeProtocolUrl = url => {
    return String(url).replace(/^(https?|http):\/\//, "");
  };

  normalizeStoreUrl = url => {
    // It removes anything that is not a letter or number.
    const keepLettersAndNumbers = /[a-zA-Z0-9-]+/g;
    const copyUrl = this.removeProtocolUrl(url).match(keepLettersAndNumbers);

    if (copyUrl) {
      // Looking for myshopify to remove everything after that into the URL
      const myshopifyIndex = copyUrl.indexOf("myshopify");
      const index = myshopifyIndex > -1 ? myshopifyIndex : copyUrl.length;

      return copyUrl
        .slice(0, index)
        .join("-")
        .toLowerCase();
    } else {
      return "";
    }
  };

  handleStoreClick = event => {
    const selectedStore = event.target.id;
    this.setState({ selectedStore });
  };

  renderShopifyForm() {
    const { storeName, showStoreNameError } = this.state;
    const { t } = this.props;

    return (
      <div className="shopify_form">
        <span className="store_url_text">{t("ConnectStoreModal.ShopifyForm.UrlText")}</span>
        {showStoreNameError && (
          <span className="name-error">{t("ConnectStoreModal.ShopifyForm.InvalidName")}</span>
        )}
        <div className="shopify_form_input">
          <input
            onChange={this.handleFormChange}
            value={this.state.storeName}
            placeholder={t("ConnectStoreModal.ShopifyForm.Placeholder")}
          />
          <div className="extension">.myshopify.com</div>
        </div>
        <div className="shopify-form__footer">
          <p>
            {t("ConnectStoreModal.ShopifyForm.FooterText")}{" "}
            <a href="http://bit.ly/2Iomppm" target="_blank" rel="noopener noreferrer">
              {t("ConnectStoreModal.ShopifyForm.FooterLink")}
            </a>
          </p>
          <button
            className="btn"
            onClick={this.handleConnectToStore}
            disabled={storeName === "" || storeName === null}
          >
            {t("ConnectStoreModal.ShopifyForm.Button")}
          </button>
        </div>
      </div>
    );
  }

  renderWoocommerceInstruction() {
    const { storeAuthorizationKey, closeModal, t } = this.props;
    return (
      <div className="woocommerce_instruction">
        <span className="store_id_text">{t("ConnectStoreModal.WoocommerceInstruction.StoreIdText")}</span>
        <div className="store_id">{storeAuthorizationKey}</div>
        <span className="header">{t("ConnectStoreModal.WoocommerceInstruction.Intro")}</span>
        <ol type="1.">
          <li key="1">
            {t("ConnectStoreModal.WoocommerceInstruction.Step1")}{" "}
            <a href="https://en-ca.wordpress.org/plugins/spocket/" target="_blank" rel="noopener noreferrer">
              {t("ConnectStoreModal.WoocommerceInstruction.Step1Link")}
            </a>
          </li>
          <li key="2">{t("ConnectStoreModal.WoocommerceInstruction.Step2")}</li>
          <li key="3">{t("ConnectStoreModal.WoocommerceInstruction.Step3")}</li>
          <li key="4">{t("ConnectStoreModal.WoocommerceInstruction.Step4")}</li>
        </ol>
        <p>
          {t("ConnectStoreModal.WoocommerceInstruction.Trouble")}{" "}
          <a href="mailto:support@spocket.co">{t("ConnectStoreModal.WoocommerceInstruction.TroubleLink")}</a>.
        </p>
        <button className="btn" onClick={closeModal}>
          {t("ConnectStoreModal.WoocommerceInstruction.Button")}
        </button>
      </div>
    );
  }

  renderWixForm() {
    const { t } = this.props;
    return (
      <div className="wix_form">
        <div className="wix-form__footer">
          <p>
            {t("ConnectStoreModal.WixForm.FooterText")}{" "}
            <a
              href="https://www.wix.com/market/spocket-us-eu-dropshipping"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("ConnectStoreModal.WixForm.FooterLink")}
            </a>
          </p>
          <button className="btn" onClick={this.handleConnectToStore}>
            {t("ConnectStoreModal.WixForm.Button")}
          </button>
        </div>
      </div>
    );
  }

  renderEcwidForm() {
    const { t } = this.props;
    return (
      <div className="ecwid_form">
        <div className="ecwid-form__footer">
          <p>
            {t("ConnectStoreModal.EcwidForm.FooterText")}{" "}
            <a
              href="https://www.ecwid.com/market/spocket-us-eu-dropshipping"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("ConnectStoreModal.EcwidForm.FooterLink")}
            </a>
          </p>
          <button className="btn" onClick={this.handleConnectToStore}>
            {t("ConnectStoreModal.EcwidForm.Button")}
          </button>
        </div>
      </div>
    );
  }

  renderSquarespaceForm() {
    const { t } = this.props;
    return (
      <div className="squarespace_form">
        <div className="squarespace-form__footer">
          <p>
            {t("ConnectStoreModal.SquarespaceForm.FooterText")}{" "}
            <a href="https://www.squarespace.com/extensions/home" target="_blank" rel="noopener noreferrer">
              {t("ConnectStoreModal.SquarespaceForm.FooterLink")}
            </a>
          </p>
          <button className="btn" onClick={this.handleConnectToStore}>
            {t("ConnectStoreModal.SquarespaceForm.Button")}
          </button>
        </div>
      </div>
    );
  }

  renderSquareForm() {
    const { t } = this.props;
    return (
      <div className="square_form">
        <div className="square-form__footer">
          <p>
            {t("ConnectStoreModal.SquareForm.FooterText")}{" "}
            <a href="https://squareup.com/us/en/app-marketplace" target="_blank" rel="noopener noreferrer">
              {t("ConnectStoreModal.SquareForm.FooterLink")}
            </a>
          </p>
          <button className="btn" onClick={this.handleConnectToStore}>
            {t("ConnectStoreModal.SquareForm.Button")}
          </button>
        </div>
      </div>
    );
  }

  renderFelexForm() {
    const { t } = this.props;
    return (
      <div className="felex_form">
        <div className="felex-form__footer">
          <p>
            {t("ConnectStoreModal.FelexForm.FooterText")}{" "}
            <a href="https://app.felex.co/signup" target="_blank" rel="noopener noreferrer">
              {t("ConnectStoreModal.FelexForm.FooterLink")}
            </a>
          </p>
          <button className="btn" onClick={this.handleConnectToStore}>
            {t("ConnectStoreModal.FelexForm.Button")}
          </button>
        </div>
      </div>
    );
  }

  renderBigcommerceForm() {
    const { storeName, showStoreNameError } = this.state;
    const { t } = this.props;

    return (
      <div className="bigcommerce_form">
        <span className="store_url_text">{t("ConnectStoreModal.BigcommerceForm.UrlText")}</span>
        {showStoreNameError && (
          <span className="name-error">{t("ConnectStoreModal.BigcommerceForm.InvalidName")}</span>
        )}
        <div className="bigcommerce_form_input">
          <input
            onChange={this.handleFormChange}
            value={this.state.storeName}
            placeholder={t("ConnectStoreModal.BigcommerceForm.Placeholder")}
          />
          <div className="extension">.mybigcommerce.com</div>
        </div>
        <div className="bigcommerce-form__footer">
          <p>
            {t("ConnectStoreModal.BigcommerceForm.FooterText")}{" "}
            <a href="https://www.bigcommerce.com/dm/spocket/" target="_blank" rel="noopener noreferrer">
              {t("ConnectStoreModal.BigcommerceForm.FooterLink")}
            </a>
          </p>
          <button
            className="btn"
            onClick={this.handleConnectToStore}
            disabled={storeName === "" || storeName === null}
          >
            {t("ConnectStoreModal.BigcommerceForm.Button")}
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { selectedStore, loading } = this.state;
    const { title, t } = this.props;
    const noneSelected = selectedStore === null;
    const spocketUser = localStorage
      .getItem("user_email")
      .includes("@spocket.co");

    return (
      <ModalWrapper size="Connect_Store_Modal__size">
        <Loadable active={loading}>
          <ModalWrapper.Header>
            <span data-cy="connect-store-modal-title">
              {title ? title : t("ConnectStoreModal.Header.Title")}
            </span>
          </ModalWrapper.Header>
          <ModalWrapper.Body>
            <Row>
              <Col
                md={6}
                sm={6}
                className={`${noneSelected && "none_selected"} store_logo`}
                id="shopify"
                onClick={this.handleStoreClick}
              >
                <Row>
                  {selectedStore !== null &&
                    selectedStore !== "shopify" && <div className="inactive" id="shopify" />}
                  <img src={shopify} alt="shopify" id="shopify" onClick={this.handleStoreClick} />
                </Row>
              </Col>
              <Col
                sm={6}
                md={6}
                className={`${noneSelected && "none_selected"} store_logo`}
                id="woocommerce"
                onClick={this.handleStoreClick}
              >
                <Row>
                  {selectedStore !== null &&
                    selectedStore !== "woocommerce" && <div className="inactive" id="woocommerce" />}
                  <img src={woocommerce} alt="woocommerce" id="woocommerce" onClick={this.handleStoreClick} />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col
                md={6}
                sm={6}
                className={`${noneSelected && "none_selected"} store_logo`}
                id="wix"
                onClick={this.handleStoreClick}
              >
                <Row>
                  {selectedStore !== null && selectedStore !== "wix" && <div className="inactive" id="wix" />}
                  <img src={wix} alt="wix" id="wix" onClick={this.handleStoreClick} />
                </Row>
              </Col>
              <Col
                md={6}
                sm={6}
                className={`${noneSelected && "none_selected"} store_logo`}
                id="bigcommerce"
                onClick={this.handleStoreClick}
              >
                <Row>
                  {selectedStore !== null &&
                    selectedStore !== "bigcommerce" && <div className="inactive" id="bigcommerce" />}
                  <img src={bigcommerce} alt="bigcommerce" id="bigcommerce" onClick={this.handleStoreClick} />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col
                md={6}
                sm={6}
                className={`${noneSelected && "none_selected"} store_logo`}
                id="squarespace"
                onClick={this.handleStoreClick}
              >
                <Row>
                  {selectedStore !== null &&
                    selectedStore !== "squarespace" && <div className="inactive" id="squarespace" />}
                  <img src={squarespace} alt="squarespace" id="squarespace" onClick={this.handleStoreClick} />
                </Row>
              </Col>
              <Col
                md={6}
                sm={6}
                className={`${noneSelected && "none_selected"} store_logo`}
                id="ecwid"
                onClick={this.handleStoreClick}
              >
                <Row>
                  {selectedStore !== null &&
                    selectedStore !== "ecwid" && <div className="inactive" id="ecwid" />}
                  <img src={ecwid} alt="ecwid" id="ecwid" onClick={this.handleStoreClick} />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col
                md={spocketUser ? 6 : 12}
                sm={spocketUser ? 6 : 12}
                className={`${noneSelected && "none_selected"} store_logo ConnectStoreModal__felex`}
                id="felex"
                onClick={this.handleStoreClick}
              >
                {selectedStore !== null &&
                  selectedStore !== "felex" && <div className="inactive" id="felex" />}
                <Row onClick={this.handleStoreClick} id="felex">
                  <img
                    src={felex}
                    alt="felex"
                    className="ConnectStoreModal__felex-store-logo"
                    id="felex"
                    onClick={this.handleStoreClick}
                  />
                  <p className="ConnectStoreModal__felex--text">
                    {t("ConnectStoreModal.FelexButton.Explanation")}
                  </p>
                </Row>
              </Col>
              {
                spocketUser && (
                  <Col
                    md={6}
                    sm={6}
                    className={`${noneSelected && "none_selected"} store_logo`}
                    id="square"
                    onClick={this.handleStoreClick}
                  >
                    <Row>
                      {selectedStore !== null &&
                        selectedStore !== "square" && <div className="inactive" id="square" />}
                      <img src={square} alt="square" id="square" onClick={this.handleStoreClick} />
                    </Row>
                  </Col>
                )
              }
            </Row>
            <Row>
              {!selectedStore && (
                <Col md={12} className="footer-text">
                  {t("ConnectStoreModal.Footer.Text")}
                </Col>
              )}
              {selectedStore === "shopify" && this.renderShopifyForm()}
              {selectedStore === "woocommerce" && this.renderWoocommerceInstruction()}
              {selectedStore === "wix" && this.renderWixForm()}
              {selectedStore === "bigcommerce" && this.renderBigcommerceForm()}
              {selectedStore === "squarespace" && this.renderSquarespaceForm()}
              {selectedStore === "square" && this.renderSquareForm()}
              {selectedStore === "felex" && this.renderFelexForm()}
              {selectedStore === "ecwid" && this.renderEcwidForm()}
            </Row>
          </ModalWrapper.Body>
        </Loadable>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal, connectToStore, verify, showModal }, dispatch);
}

function mapStateToProps(state) {
  return {
    storeAuthorizationKey: state.settings.storeAuthorizationKey,
    felexAvailable: state.settings.dropshipperData.felex_available || false,
    title: state.ui.data && state.ui.data.title,
    dropshipperData: state.settings.dropshipperData,
    featureFlags: state.featureFlags.featureFlags
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectStoreModal)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/ConnectStoreModal/ConnectStoreModal.js