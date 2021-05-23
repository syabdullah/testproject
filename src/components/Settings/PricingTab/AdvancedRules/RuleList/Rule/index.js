import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, FormControl, InputGroup } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { numberFormat } from "../../../../../../utils";

class Rule extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    from_cents: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    to_cents: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    markup_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    markup_type: PropTypes.string.isRequired,
    onRuleUpdate: PropTypes.func.isRequired,
    onRuleRemove: PropTypes.func.isRequired
  };

  static defaultProps = {
    id: 0,
    from_cents: 0,
    to_cents: 0,
    markup_amount: 0,
    markup_type: "multiplier"
  };

  onRuleUpdate = e => {
    let value = e.target.value;
    const fieldName = e.target.name;

    if (fieldName === "to_cents") {
      value = numberFormat(this.props.to_cents, value, 2);
    }

    if (fieldName === "from_cents") {
      value = numberFormat(this.props.from_cents, value, 2);
      if (Number(this.props.to_cents) < Number(value)) {
        this.props.onRuleUpdate(this.props.id, "to_cents", value);
      }
    }

    if (fieldName === "markup_amount") {
      value = numberFormat(this.props.markup_amount, value, 2, 1);
    }

    this.props.onRuleUpdate(this.props.id, fieldName, value);
  };

  onRuleRemove = () => {
    this.props.onRuleRemove(this.props.id);
  };

  render() {
    const { t } = this.props;
    return (
      <tr>
        <td>
          <Row>
            <Col xs={6}>
              <InputGroup bsSize="sm">
                <InputGroup.Addon>{t("PricingTab.from")}</InputGroup.Addon>
                <FormControl
                  type="text"
                  name="from_cents"
                  min={0}
                  value={this.props.from_cents}
                  onChange={this.onRuleUpdate}
                />
              </InputGroup>
            </Col>
            <Col xs={6}>
              <InputGroup bsSize="sm">
                <InputGroup.Addon>{t("PricingTab.to")}</InputGroup.Addon>
                <FormControl
                  type="text"
                  name="to_cents"
                  min={0}
                  value={this.props.to_cents}
                  onChange={this.onRuleUpdate}
                />
              </InputGroup>
            </Col>
          </Row>
        </td>
        <td>
          <InputGroup bsSize="sm" className="pricing-group">
            <FormControl
              type="text"
              name="markup_amount"
              min={0}
              value={this.props.markup_amount}
              onChange={this.onRuleUpdate}
            />
            <InputGroup.Addon>
              <FormControl
                componentClass="select"
                placeholder="Multiplier"
                bsSize="sm"
                name="markup_type"
                value={this.props.markup_type}
                onChange={this.onRuleUpdate}
                onBlur={this.onRuleCommit}
              >
                <option value="multiplier">{t("PricingTab.SelectMultiplier")}</option>
                <option value="fixed">{t("PricingTab.selectFixedAmount")}</option>
              </FormControl>
            </InputGroup.Addon>
          </InputGroup>
        </td>
        <td>
          <Button bsSize="sm" bsStyle="default" onClick={this.onRuleRemove}>
            {t("PricingTab.buttonRemove")}
          </Button>
        </td>
      </tr>
    );
  }
}

export default withTranslation()(Rule);



// WEBPACK FOOTER //
// ./src/components/Settings/PricingTab/AdvancedRules/RuleList/Rule/index.js