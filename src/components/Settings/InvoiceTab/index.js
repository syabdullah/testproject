// React and Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React from "react";

// Libs
import { Col, ControlLabel, Form, FormGroup, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import { withTranslation } from "react-i18next";

// API call
import ApiCall from "../../../utils/apiCall";

// Actions
import { setAlertMessage } from "../../../actions";
import { showModal } from "../../../actions/ui";
import { setPersonalization } from "../../../newDropshipperApp/module/store/personalization";
import { setDisabledInvoicing } from "../../../actions/settings";

// Utils
import InvoiceUtils from "../../../utils/invoiceUtils";
import { BRANDED_INVOICING, doesCurrentPlanSupport } from "../../../utils/features.js";
import { isSubscriptionOverdue } from "../../../newDropshipperApp/utils/user";
import LogoStoreInput from "../LogoStoreInput";
import { Toggle } from "newDropshipperApp/spocketUI/components/Toggle";

// Style
import "./style.css";

import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const InvoiceTabAnalyticWrapper = React.forwardRef((props, ref) => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  return <InvoiceTab ref={ref} {...props} track={track} />;
});
class InvoiceTab extends React.Component {
  state = {
    inputEmail: ["", null],
    inputPhone: ["", null],
    inputNote: ["", null],
    disabledInvoicing: this.props.disabledInvoicing
  };

  componentDidMount() {
    const { t } = this.props;
    document.title = t("InvoiceTab.documentTitle");
  }

  UNSAFE_componentWillMount = () => {
    return ApiCall.get("/store").then(({ status, json }) => {
      this.setState({
        inputEmail: [json.invoice_email, null],
        inputPhone: [json.invoice_phone, null],
        inputNote: [json.invoice_note, null]
      });
    });
  };

  onTextChange = e => {
    let newState = {};
    let newValue = [e.target.value, null];
    newState[e.target.name] = newValue;
    this.setState(newState);
  };

  // If valid, clear error. Otherwise, show invalidity
  checkValidityOnBlur = e => {
    if (e.target.checkValidity()) {
      this.setState({ [e.target.name]: [e.target.value, null] });
    } else {
      this.setState({ [e.target.name]: [e.target.value, "error"] });
    }
  };

  // Only validate if incorrect data is input. Otherwise pass if input empty
  checkInputValidity = inputsToValidate => {
    let isValid = true;
    for (let item of inputsToValidate) {
      // If the input is filled AND has an error, do not continue
      // Wow this feels janky
      if (!!this.state[item][0] && !!this.state[item][1]) {
        isValid = false;
      }
    }
    return isValid;
  };

  checkIfCurrentPlanSupport({ eventTrackName }) {
    if (!doesCurrentPlanSupport(BRANDED_INVOICING)) {
      this.props.showModal("UPGRADE_MODAL", {
        referrerPage: "settings_invoice",
        referrerContext: "branded_invoicing",
        upgradeStep: "viewed_all_plans"
      });
      this.props.track(eventTrackName, {}, { refreshAttemptId: true });
    } else {
      return true;
    }
  }

  handleFormSubmit = e => {
    const { t } = this.props;
    this.checkIfCurrentPlanSupport({ eventTrackName: "upgrade__branded-invoicing-save--clicked" });

    const inputsToValidate = ["inputEmail", "inputPhone"];

    if (this.checkInputValidity(inputsToValidate)) {
      return ApiCall.put("/store", {
        invoice_email: this.state.inputEmail[0],
        invoice_phone: this.state.inputPhone[0],
        invoice_note: this.state.inputNote[0]
      })
        .then(({ status, json }) => {
          if (isSubscriptionOverdue()) {
            this.props.showModal("CARD_DECLINE");
          } else {
            this.props.setAlertMessage(t("InvoiceTab.alertInvoiceSettingSaved"), "success");
            let windowPreviewInvoice = window.open();
            windowPreviewInvoice.location = InvoiceUtils.urlPreview();
          }
        })
        .catch(response => {
          const json = response && response.json && response.json.errors;
          const message = json ? json.errors[0] : "Error saving or opening preview";
          this.props.setAlertMessage(message, "error");
        });
    }
  };

  renderForm = () => {
    const { t } = this.props;
    return (
      <div>
        <Form>
          <Col lg={3} md={3} sm={4} xs={5}>
            <ControlLabel className="mt-20">{t("InvoiceTab.shopLogo")}</ControlLabel>
            <div
              onClick={() =>
                this.checkIfCurrentPlanSupport({
                  eventTrackName: "upgrade__branded-invoicing-add-logo--clicked"
                })
              }
            >
              <div className={!doesCurrentPlanSupport(BRANDED_INVOICING) && "Invoice__disable_click"}>
                <LogoStoreInput />
              </div>
            </div>
          </Col>

          <Col xs={12} md={5}>
            <FormGroup validationState={this.state.inputEmail[1]}>
              <ControlLabel className="mt-20">{t("InvoiceTab.contactEmail")}</ControlLabel>

              <FormControl
                type="email"
                name="inputEmail"
                bsSize="sm"
                onChange={this.onTextChange}
                onBlur={this.checkValidityOnBlur}
                value={this.state.inputEmail[0] || localStorage.getItem("user_email")}
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={4}>
            <FormGroup validationState={this.state.inputPhone[1]}>
              <ControlLabel className="mt-20">{t("InvoiceTab.phoneNumber")}</ControlLabel>

              <FormControl
                type="tel"
                name="inputPhone"
                bsSize="sm"
                pattern="^[0-9\-\+\s\(\)]*$"
                onChange={this.onTextChange}
                onBlur={this.checkValidityOnBlur}
                value={this.state.inputPhone[0] || ""}
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={9}>
            <FormGroup validationState={this.state.inputNote[1]}>
              <ControlLabel>
                {t("InvoiceTab.personalNote")}
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="advances-tooltip">{t("InvoiceTab.tooltipPersonalNote")}</Tooltip>}
                >
                  <span className="info-tip personal-tip">!</span>
                </OverlayTrigger>
              </ControlLabel>
              <div
                onClick={() =>
                  this.checkIfCurrentPlanSupport({
                    eventTrackName: "upgrade__branded-invoicing-add-note--clicked"
                  })
                }
              >
                <div className={!doesCurrentPlanSupport(BRANDED_INVOICING) && "Invoice__disable_click"}>
                  <FormControl
                    onChange={this.onTextChange}
                    className="Invoice__textarea"
                    componentClass="textarea"
                    rows="5"
                    name="inputNote"
                    bsSize="sm"
                    value={this.state.inputNote[0] || ""}
                  />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Form>
      </div>
    );
  };

  render() {
    const { t, setDisabledInvoicing, setPersonalization, disabledInvoicing } = this.props;

    const toggleHandler = () => {
      setDisabledInvoicing(!disabledInvoicing);
      setPersonalization({
        disabled_invoicing: !disabledInvoicing
      });
    };

    return (
      <div className="mb-60">
        <h5 className="settings__subtitle header-tip">
          {t("InvoiceTab.brandedInvoicing")}
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="advances-tooltip">{t("InvoiceTab.tooltipBrandedInvoicing")}</Tooltip>}
          >
            <span className="info-tip">!</span>
          </OverlayTrigger>
        </h5>
        <hr />
        <div className="InvoiceTab__disabledInvoicing">
          <Toggle initialState={!disabledInvoicing} onClick={toggleHandler} />
          <span className="InvoiceTab__disabledInvoicing--text">{t("InvoiceTab.disabledInvoicing")}</span>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="disabledInvoicing-tooltip">{t("InvoiceTab.tooltipDisabledInvoicing")}</Tooltip>
            }
          >
            <span className="info-tip disable-tip">!</span>
          </OverlayTrigger>
        </div>
        {!disabledInvoicing && this.renderForm()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setAlertMessage, showModal, setPersonalization, setDisabledInvoicing },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    disabledInvoicing: state.settings.dropshipperData.disabled_invoicing
  };
}

export default withTranslation("translation", { withRef: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
      withRef: true
    }
  )(InvoiceTabAnalyticWrapper)
);



// WEBPACK FOOTER //
// ./src/components/Settings/InvoiceTab/index.js