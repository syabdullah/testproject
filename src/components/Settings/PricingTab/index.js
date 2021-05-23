import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import DefaultRules from "./DefaultRules";
import AdvancedRules from "./AdvancedRules";
import AdditionalRules from "./AdditionalRules";
import "./style.css";
import ApiCall from "../../../utils/apiCall";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setAlertMessage } from "../../../actions";
import { getPricingRuleSettings } from "../../../actions/settings";

class PricingTab extends React.Component {
  componentDidMount = () => {
    this.props.getPricingRuleSettings();
    this.mapPropsToState(this.props);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.rules) !== JSON.stringify(nextProps.rules)) {
      this.mapPropsToState(nextProps);
    }
  }

  state = {
    defaultMarkup: {
      amount: 0,
      type: "percent"
    },
    advancedRules: [],
    advancedEnabled: false,
    centRounding: ""
  };

  mapPropsToState = props => {
    const advancedRules = props.rules.advanced_rules || this.state.advancedRules;

    this.setState({
      defaultMarkup: props.rules.default_markup || this.state.defaultMarkup,
      advancedRules: advancedRules.map(rule => ({
        ...rule,
        from_cents: String(rule.from_cents / 100),
        to_cents: String(rule.to_cents / 100)
      })),
      advancedEnabled: !!advancedRules.length,
      centRounding:
        typeof props.rules.default_rounded_cents === "number"
          ? props.rules.default_rounded_cents
          : this.state.centRounding
    });
  };

  handleChange = (value, key) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

  handleFormSubmit = () => {
    let advancedRules = this.state.advancedRules;
    if (!this.state.advancedEnabled) {
      advancedRules = [];
    } else {
      advancedRules = advancedRules.map(rule => ({
        ...rule,
        from_cents: Number(rule.from_cents) * 100,
        to_cents: Number(rule.to_cents) * 100
      }));
    }

    if (this.validateRules(advancedRules)) {
      return ApiCall.patch("/stores/pricing_rule", {
        default_markup: this.state.defaultMarkup,
        advanced_rules: advancedRules,
        default_rounded_cents: this.state.centRounding ? Number(this.state.centRounding) : null
      })
        .then(({ status, json }) => {
          this.props.setAlertMessage("Pricing rules updated", "success");
          this.props.getPricingRuleSettings();
        })
        .catch(({ status, json }) => {
          this.props.setAlertMessage(json.message, "error");
        });
    } else {
      return Promise.resolve(true);
    }
  };

  validateRules(rules) {
    for (let rule of rules) {
      for (let comparaisonRule of rules) {
        if (
          rule !== comparaisonRule &&
          !(
            (rule.from_cents < comparaisonRule.from_cents && rule.to_cents < comparaisonRule.from_cents) ||
            (rule.from_cents > comparaisonRule.to_cents && rule.to_cents > comparaisonRule.to_cents)
          )
        ) {
          this.props.setAlertMessage("One or more of your rules conflict", "error");
          return false;
        }
      }

      if (rule.from_cents >= rule.to_cents) {
        this.props.setAlertMessage("From price must be more than To price", "error");
        return false;
      }
    }
    return true;
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <h5 className="settings__subtitle header-tip">
            {t("PricingTab.titleDefaultPricingRules")}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="default-tooltip">{t("PricingTab.tooltipTitleDefaultPricingRules")}</Tooltip>
              }
            >
              <span className="info-tip">!</span>
            </OverlayTrigger>
          </h5>
          <hr />
          <DefaultRules defaultMarkup={this.state.defaultMarkup} handleChange={this.handleChange} />
        </div>
        <div>
          <h5 className="mt-20 settings__subtitle header-tip">
            {t("PricingTab.titleAdvancedPricingRules")}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="advances-tooltip">{t("PricingTab.tooltipTitleAdvancedPricingRules")}</Tooltip>
              }
            >
              <span className="info-tip">!</span>
            </OverlayTrigger>
          </h5>
          <hr />
          <AdvancedRules
            advancedRules={this.state.advancedRules}
            handleChange={this.handleChange}
            advancedEnabled={this.state.advancedEnabled}
          />
        </div>
        <div>
          <h5 className="mt-20 settings__subtitle header-tip">
            {t("PricingTab.assignCents")}
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="advances-tooltip">{t("PricingTab.tooltipAssignCents")}</Tooltip>}
            >
              <span className="info-tip assign-cents-tip">!</span>
            </OverlayTrigger>
          </h5>
          <hr />
          <AdditionalRules centRounding={this.state.centRounding} handleChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage, getPricingRuleSettings }, dispatch);
}

function mapStateToProps(state) {
  return {
    rules: state.settings.rules
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
  )(PricingTab)
);



// WEBPACK FOOTER //
// ./src/components/Settings/PricingTab/index.js