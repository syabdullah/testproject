import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ControlLabel, FormControl, FormGroup, Col, Row } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import StoreApiCall from "../../../utils/storeApiCall";
import data from "./data/countryState";
import { Select } from "newDropshipperApp/spocketUI";
import { updateForm } from "../../../actions/forms";
import { StyledInput } from "./inputAddress.style";
import "./style.css";

class InputAddress extends Component {
  static propTypes = {
    handleFormChanged: PropTypes.func
  };

  componentDidMount() {
    this.getAddress();
  }

  saveAddress() {
    StoreApiCall.saveAddress(this.props.form.inputAddress);
  }

  getAddress() {
    StoreApiCall.getAddress().then(address => {
      const { first_name, last_name, line_one, country, province, city, zip, phone } = address;
      this.props.updateForm("INPUT_ADDRESS", {
        first_name,
        last_name,
        line_one,
        line_two: " ",
        country,
        province,
        city,
        zip,
        phone
      });
    });
  }

  /**
   * Find states in selected country
   * @return {Array}
   */
  findState() {
    const foundCountry = data.countries.find(country => {
      return country.name === this.props.form.inputAddress.country;
    });
    return (
      foundCountry &&
      foundCountry.states.map(state => ({
        value: state,
        label: state
      }))
    );
  }

  render() {
    const { handleFormChanged, form, t } = this.props;
    const { country, province } = form.inputAddress;

    return (
      <div>
        <FormGroup>
          <Row>
            <Col md={6}>
              <ControlLabel className="mt-20">{t("InputAddress.Label.FirstName")}</ControlLabel>
              <StyledInput
                placeholder={t("InputAddress.PlaceHolder.FirstName")}
                onChange={e => handleFormChanged(e)}
                value={form.inputAddress.first_name || ""}
                name="first_name"
              />
            </Col>
            <Col md={6}>
              <ControlLabel className="mt-20">{t("InputAddress.Label.LastName")}</ControlLabel>

              <StyledInput
                placeholder={t("InputAddress.PlaceHolder.LastName")}
                onChange={e => handleFormChanged(e)}
                value={form.inputAddress.last_name || ""}
                name="last_name"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ControlLabel className="">{t("InputAddress.Label.StreetAddress")}</ControlLabel>
              <FormControl
                type="text"
                componentClass="textarea"
                style={{ height: "75px", resize: "none" }}
                name="line_one"
                value={form.inputAddress.line_one}
                onChange={e => handleFormChanged(e)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ControlLabel className="mt-20">{t("InputAddress.Label.Country")}</ControlLabel>

              <Select
                value={country ? { label: country, value: country } : null}
                name="country"
                onChange={e => handleFormChanged({ target: { ...e, name: "country" } })}
                options={data.countries.map(country => ({
                  value: country.name,
                  label: country.name
                }))}
                menuTitle={t("InputAddress.PlaceHolder.Country")}
                placeholder={t("InputAddress.PlaceHolder.Country")}
                isClearable
                style={{ width: "inherit", borderRadius: "0px", border: "1px solid #dadde0" }}
              />
            </Col>
            <Col md={6}>
              <ControlLabel className="mt-20">{t("InputAddress.Label.State")}</ControlLabel>

              <Select
                value={province ? { label: province, value: province } : null}
                name="province"
                onChange={e => handleFormChanged({ target: { ...e, name: "province" } })}
                options={this.findState()}
                placeholder={t("InputAddress.Placeholder.State")}
                menuTitle={t("InputAddress.Placeholder.State")}
                isClearable
                style={{ width: "inherit", borderRadius: "0px", border: "1px solid #dadde0" }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ControlLabel className="mt-20">{t("InputAddress.Label.City")}</ControlLabel>
              <StyledInput
                placeholder={t("InputAddress.PlaceHolder.City")}
                onChange={e => handleFormChanged(e)}
                value={form.inputAddress.city}
                name="city"
              />
            </Col>
            <Col md={6}>
              <ControlLabel className="mt-20 ">{t("InputAddress.Label.Zip")}</ControlLabel>
              <StyledInput
                placeholder={t("InputAddress.PlaceHolder.Zip")}
                onChange={e => handleFormChanged(e)}
                value={form.inputAddress.zip}
                name="zip"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ControlLabel className="mt-20 ">{t("InputAddress.Label.Phone")}</ControlLabel>
              <StyledInput
                placeholder={t("InputAddress.Placeholder.Phone")}
                onChange={e => handleFormChanged(e)}
                value={form.inputAddress.phone || ""}
                name="phone"
              />
            </Col>
          </Row>
        </FormGroup>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateForm }, dispatch);
}

function mapStateToProps(state) {
  return {
    form: state.forms
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InputAddress)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Forms/inputAddress.js