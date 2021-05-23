import React, { Component } from "react";
import { FormGroup, Col, Row } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import { Input } from "newDropshipperApp/spocketUI";
import "./style.css";

class NewPasswordForm extends Component {
  render() {
    const { t, handleInputChanged } = this.props;

    return (
      <FormGroup>
        <Row>
          <Col md={12} className="New-password__title">
            <p>{t("NewPasswordForm.Title")}</p>
          </Col>
          <Col md={12} className="New-password__input">
            <Input
              type="password"
              name="password"
              onChange={e => handleInputChanged(e)}
              placeholder={t("NewPasswordForm.PasswordInput.Placeholder")}
            />
          </Col>
          <Col md={12} className="New-password__input">
            <Input
              name="confirm_password"
              type="password"
              onChange={e => handleInputChanged(e)}
              placeholder={t("NewPasswordForm.ConfirmPasswordInput.Placeholder")}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default withTranslation()(NewPasswordForm);



// WEBPACK FOOTER //
// ./src/components/_Shared/NewPasswordForm/index.js