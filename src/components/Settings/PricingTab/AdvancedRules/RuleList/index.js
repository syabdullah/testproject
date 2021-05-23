import { Table, Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";

import { setAlertMessage } from "../../../../../actions";
import Rule from "./Rule";

class RuleList extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    advancedRules: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  state = {
    rules: [],
    loading: false
  };

  emptyRule = {
    from_cents: 0,
    to_cents: 0,
    markup_amount: 0,
    markup_type: "multiplier"
  };

  ruleConflict = false;

  addEmptyRule = () => {
    const emptyClone = Object.assign({}, this.emptyRule);
    this.props.handleChange([...this.props.advancedRules, emptyClone], "advancedRules");
  };

  checkForEmptyRules = () => {
    if (this.props.advancedRules.length === 0) {
      return false;
    }
    for (let rule of this.props.advancedRules) {
      if (!rule.from_cents && !rule.to_cents) {
        return true;
      }
    }
  };

  handleRuleAdd = () => {
    const { t } = this.props;
    if (this.checkForEmptyRules() || this.props.advancedRules.length >= 10) {
      this.props.setAlertMessage(t("PricingTab.alertCannotCreateMoreThanOneRuleWithEmptyFields"), "error");
    } else {
      this.addEmptyRule();
    }
  };

  handleRuleRemove = id => {
    const updatedRules = [
      ...this.props.advancedRules.slice(0, id),
      ...this.props.advancedRules.slice(id + 1)
    ];
    this.props.handleChange(updatedRules, "advancedRules");
  };

  handleRuleUpdate = (id, property, value) => {
    const updatedRules = [...this.props.advancedRules];
    updatedRules[id][property] = value;

    this.props.handleChange(updatedRules, "advancedRules");
  };

  processRule = rule => {
    rule.start = rule.start ? rule.start : 0;
    rule.finish = rule.finish ? rule.finish : 0;
    rule.markup = rule.markup ? rule.markup : 0;
    return rule;
  };

  sortNumerically(a, b) {
    return a - b;
  }

  renderRules = () => {
    return this.props.advancedRules.map((rule, index) => (
      <Rule
        key={index}
        id={index}
        from_cents={rule.from_cents}
        to_cents={rule.to_cents}
        markup_amount={rule.markup_amount}
        markup_type={rule.markup_type}
        onRuleUpdate={this.handleRuleUpdate}
        onRuleRemove={this.handleRuleRemove}
      />
    ));
  };

  render() {
    const { t } = this.props;
    let rules = [];
    if (this.props.enabled) {
      rules = this.renderRules();
    }
    return (
      <div>
        <div className={this.props.enabled ? "card mt-20" : "hidden"}>
          <Table responsive>
            <thead className="adv-th">
              <tr>
                <th>{t("PricingTab.costRange")}</th>
                <th>{t("PricingTab.markup")}</th>
                <th>
                  <Button
                    bsSize="sm"
                    bsStyle="primary"
                    className="btn-block"
                    onClick={this.handleRuleAdd}
                    disabled={!this.props.enabled || this.state.loading}
                  >
                    {t("PricingTab.add")}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>{rules}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlertMessage
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    registered: state.auth.registered
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RuleList)
);



// WEBPACK FOOTER //
// ./src/components/Settings/PricingTab/AdvancedRules/RuleList/index.js