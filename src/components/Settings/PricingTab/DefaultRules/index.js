import { Row, Col, ControlLabel, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";

import { numberFormat } from "../../../../utils";

class DefaultRules extends React.Component {
  static propTypes = {
    defaultMarkup: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  onChange = e => {
    const newDefaultRules = Object.assign({}, this.props.defaultMarkup);
    const name = e.target.name;
    let value = e.target.value;

    if (name === "amount") {
      value = numberFormat(this.props.defaultMarkup.value, value, 2, 0, 10000);
    }

    newDefaultRules[name] = value;
    this.props.handleChange(newDefaultRules, "defaultMarkup");
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <div className="input-combined left-side">
              <ControlLabel>{t("PricingTab.Markup")}</ControlLabel>
              <FormControl
                type="text"
                name="amount"
                value={this.props.defaultMarkup.amount}
                onChange={this.onChange}
                onBlur={this.handleRuleCommit}
              />
            </div>
            <div className="input-combined right-side">
              <ControlLabel>{t("PricingTab.MarkupType")}</ControlLabel>
              <FormControl
                name="type"
                componentClass="select"
                onChange={this.onChange}
                onBlur={this.handleRuleCommit}
                value={this.props.defaultMarkup.type}
              >
                <option value="">{t("PricingTab.SelectDefault")}</option>
                <option value="percent">{t("PricingTab.SelectPercent")}</option>
                <option value="multiplier">{t("PricingTab.SelectMultiplier")}</option>
                <option value="fixed">{t("PricingTab.SelectFixed")}</option>
              </FormControl>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(DefaultRules);



// WEBPACK FOOTER //
// ./src/components/Settings/PricingTab/DefaultRules/index.js