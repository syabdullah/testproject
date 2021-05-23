import React from "react";
import PropTypes from "prop-types";
import { Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class AdditionalRules extends React.Component {
  static propTypes = {
    centRounding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleChange: PropTypes.func.isRequired
  };

  handleRulesUpdate = e => {
    this.props.handleChange(e.target.value, "centRounding");
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <ControlLabel>{t("PricingTab.assignCents")}</ControlLabel>
            <FormControl
              type="text"
              onChange={this.handleRulesUpdate}
              value={this.props.centRounding}
              maxLength="2"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(AdditionalRules);



// WEBPACK FOOTER //
// ./src/components/Settings/PricingTab/AdditionalRules/index.js