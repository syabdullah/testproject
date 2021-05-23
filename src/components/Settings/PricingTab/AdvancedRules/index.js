import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";

import RuleList from "./RuleList";

class AdvancedRules extends React.Component {
  static propTypes = {
    advancedRules: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    advancedEnabled: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { t } = this.props;
    document.title = t("PricingTab.titlePricingRules");
  }

  onToggleAdvancedRules = () => {
    this.props.handleChange(!this.props.advancedEnabled, "advancedEnabled");
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="tgl-label">
          <input
            type="checkbox"
            className="tgl tgl-light"
            id="check-box-customizable"
            onClick={this.onToggleAdvancedRules}
            checked={this.props.advancedEnabled}
          />
          <label className="tgl-btn" htmlFor="check-box-customizable">
            <span>{t("PricingTab.toggleAdvancedPricingRules")}</span>
          </label>
        </div>
        <RuleList
          enabled={this.props.advancedEnabled}
          advancedRules={this.props.advancedRules}
          handleChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default withTranslation()(AdvancedRules);



// WEBPACK FOOTER //
// ./src/components/Settings/PricingTab/AdvancedRules/index.js