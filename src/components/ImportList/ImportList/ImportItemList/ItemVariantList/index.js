// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table, Modal, FormControl } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import styled from "styled-components";

import ItemVariant from "./ItemVariant";
import ContextPopover from "./ContextPopover";
import { setAlertMessage } from "../../../../../actions";
import { numberFormat } from "../../../../../utils";
import DefaultPricingService from "../../../../../utils/DefaultPricingService";

import { ShippingPriceSelect } from "./ShippingPriceSelect";

const ExpandingTable = styled.div`
  & .table-responsive {
    overflow-x: visible;
  }
`;

const TableTh = styled.th`
  @media (max-width: 768px) {
    vertical-align: top !important;
  }
`;

class ColumnUpdateMarkupForm extends React.Component {
  state = { field: "" };

  handleMarkupValueChange = e => {
    const value = numberFormat(this.state.field, e.target.value, 2, 0);
    this.setState({ field: value });
  };

  render() {
    return (
      <FormControl
        type="text"
        bsSize="sm"
        className="variant__update_column_input"
        value={this.state.field}
        placeholder={this.props.t("ItemVariantList.VariantsTable.ContextPopover.Placeholder")}
        onChange={this.handleMarkupValueChange}
      />
    );
  }
}

class ItemVariantList extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    setAlertMessage: PropTypes.func.isRequired,
    shippingDomestic: PropTypes.object.isRequired,
    shippingInternational: PropTypes.object.isRequired,
    shippingSpecifics: PropTypes.object,
    shippingExcludedCountries: PropTypes.any,
    countryOrigin: PropTypes.string.isRequired,
    variations: PropTypes.array.isRequired,
    provider: PropTypes.string.isRequired,
    purchasable: PropTypes.bool.isRequired,
    rules: PropTypes.object
  };

  state = {
    variants: this.props.variations,
    shippingModalShow: false,
    variantWarning: false,
    shippingPriceCountry: ""
  };

  static SELECTED_LIMIT = 100;

  componentDidMount() {
    if (this.selectedCount() === 0) {
      this.setDefaultPrices();
    }
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!this.state.variantWarning && this.selectedCount() >= this.SELECTED_LIMIT) {
      this.displayMaxVariantWarning();
    }
  };

  setDefaultPrices = () => {
    const { handleChange, variations } = this.props;

    handleChange(
      variations.map((variation, i) => {
        if (i < 100) {
          variation.selected = true;
          return this.setDefaultCustomPrice(variation);
        } else {
          return variation;
        }
      }),
      "variations"
    );
  };

  toggleShippingModal = () => {
    this.setState({
      shippingModalShow: !this.state.shippingModalShow
    });
  };

  handleMultiplyPrices = event => {
    const value = Number(this.updateColumnValue.state.field);
    const variations = this.props.variations.map(v => {
      v.customPrice = (v.price_cents / 100) * (value / 100 + 1);
      v.customPrice = numberFormat(v.customPrice, v.customPrice, 2).toFixed(2);
      return v;
    });
    this.props.handleChange(variations, "variations");
  };

  selectedCount = () => {
    return this.props.variations.reduce((count, v) => {
      if (v.selected) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  areAllSelected = () => {
    return this.selectedCount() === this.props.variations.length;
  };

  displayMaxVariantWarning = () => {
    this.props.setAlertMessage(this.props.t("ItemVariantList.Alert.MaxVariants"), "error");
    this.setState({
      variantWarning: true
    });
  };

  handleVariationPriceChange = (value, index) => {
    const newVariations = [...this.props.variations];
    newVariations[index].selected = true;
    newVariations[index].customPrice = value;
    this.props.validateCompareAtPrice(newVariations[index]);
    this.props.handleChange(newVariations, "variations");
  };

  /**
   * This validates and update the variation compare_at_price_cents to the inputted value
   * @param value value of compare_at_price_cents
   * @param index index of the variation to update
   */
  handleVariationCompareAtChange = (value, index) => {
    const newVariations = [...this.props.variations];
    newVariations[index].selected = true;
    newVariations[index].compare_at_price_cents = value;
    this.props.validateCompareAtPrice(newVariations[index]);
    this.props.handleChange(newVariations, "variations");
  };

  calculateDefaultPrice = variation => {
    return DefaultPricingService.calculateDefaultPrice(
      this.props.rules,
      variation.price_cents,
      variation.msrp_cents
    ).toFixed(2);
  };

  setDefaultCustomPrice = variation => {
    variation.customPrice = variation.customPrice || this.calculateDefaultPrice(variation);

    return variation;
  };

  handleSelectionToggle = (selected, index) => {
    const newVariations = [...this.props.variations];
    let variation = newVariations[index];
    variation.selected = selected;
    if (selected) {
      variation = this.setDefaultCustomPrice(variation);
    }
    this.props.handleChange(newVariations, "variations");
  };

  handleSelectAll = e => {
    const selected = !this.areAllSelected();
    const allVariations = this.props.variations.map(v => {
      v.selected = selected;
      if (selected) {
        v.customPrice = v.customPrice || (v.price_cents / 100).toFixed(2);
      }
      return v;
    });
    this.props.handleChange(allVariations, "variations");
  };

  renderVariants = () => {
    return this.props.variations.map((v, idx) => {
      return (
        <ItemVariant
          shippingPrice={() => this.getSelectedShippingCountry()}
          variation={v}
          key={JSON.stringify(v.characteristics)}
          index={idx}
          selected={v.selected}
          customPrice={v.customPrice}
          handleVariationPriceChange={this.handleVariationPriceChange}
          handleVariationCompareAtChange={this.handleVariationCompareAtChange}
          handleVariationToggle={this.handleSelectionToggle}
          renderImage={this.showImageColumn}
          getProfitValue={this.props.getProfitValue}
        />
      );
    });
  };

  renderPropertyNames = () => {
    const properties = Object.keys(this.props.variations[0].characteristics);
    if (properties.length > 0) {
      return properties.map(property => <th key={property}>{property}</th>);
    }
  };

  renderShippingModal = () => {
    if (this.props.provider === "Etsy") {
      return;
    }
    const {
      shippingInternational,
      shippingSpecifics,
      shippingExcludedCountries,
      countryOrigin,
      shippingDomestic,
      t
    } = this.props;
    return (
      <div>
        <div className="shipping-inline">
          <Modal show={this.state.shippingModalShow} onHide={this.toggleShippingModal}>
            <Modal.Header closeButton>
              <Modal.Title>{t("ItemVariantList.Modal.Title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="view-name mb-20">
                {t("ItemVariantList.Modal.Intro")}
                {countryOrigin}
              </p>
              <table className="table table-fixed">
                <thead>
                  <tr>
                    <th>{t("ItemVariantList.Table.Head.Destination")}</th>
                    <th>{t("ItemVariantList.Table.Head.Cost")}</th>
                    <th>{t("ItemVariantList.Table.Head.Time")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t("ItemVariantList.Table.Body.Domestic")}</td>
                    <td>{shippingDomestic.price_formatted}</td>
                    <td>{shippingDomestic.delivery_time}</td>
                  </tr>
                  {Object.keys(shippingSpecifics).length > 0 &&
                    shippingSpecifics.map(shippingSpecific => {
                      return (
                        <tr>
                          <td>{shippingSpecific.country}</td>
                          <td>{shippingSpecific.price_formatted}</td>
                          <td>{shippingSpecific.delivery_time}</td>
                        </tr>
                      );
                    })}
                  {Object.keys(shippingInternational).length > 0 && (
                    <tr>
                      <td>{t("ItemVariantList.Table.Body.International")}</td>
                      <td>{shippingInternational.price_formatted}</td>
                      <td>{shippingInternational.delivery_time}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {Object.keys(shippingInternational).length === 0 && (
                <p>{t("ItemVariantList.Modal.DoesNotShipInternational")}</p>
              )}

              {shippingExcludedCountries &&
                Object.keys(shippingInternational).length > 0 && (
                  <p>
                    {t("ItemVariantList.Modal.DoesNotShipTo")}
                    {shippingExcludedCountries}
                  </p>
                )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  };

  showImageColumn = () => {
    const imageVariation = this.props.variations.find(variation => variation.image);
    return imageVariation;
  };

  getSelectedShippingCountry() {
    const { shippingPriceCountry } = this.state;
    const { shipping_countries } = this.props;

    if (shippingPriceCountry) {
      return shipping_countries.find(shipping => shipping.country === shippingPriceCountry);
    } else {
      return shipping_countries[0];
    }
  }

  renderVariantsTable = () => {
    const { purchasable, shipping_countries, t } = this.props;
    if (purchasable) {
      return (
        <ExpandingTable>
          <Table responsive className="table-bordered-out" ref="table">
            <thead>
              <tr>
                <TableTh>
                  <input type="checkbox" checked={this.areAllSelected()} onChange={this.handleSelectAll} />
                </TableTh>
                {this.showImageColumn() && <TableTh>{t("ItemVariantList.VariantsTable.Image")}</TableTh>}
                <TableTh>{t("ItemVariantList.VariantsTable.SKU")}</TableTh>
                {this.renderPropertyNames()}
                <TableTh>{t("ItemVariantList.VariantsTable.Inventory")}</TableTh>
                <TableTh>{t("ItemVariantList.VariantsTable.Price")}</TableTh>
                <TableTh>
                  <ShippingPriceSelect
                    shipping_countries={shipping_countries}
                    toggleShippingModal={() => this.toggleShippingModal()}
                    handleClick={updatedState => this.setState(updatedState)}
                    getSelectedShippingCountry={() => this.getSelectedShippingCountry()}
                  />
                </TableTh>
                <TableTh>
                  <ContextPopover
                    title={t("ItemVariantList.VariantsTable.SalesPrice") + "▾"}
                    onApply={this.handleMultiplyPrices}
                  >
                    <ColumnUpdateMarkupForm
                      t={t}
                      ref={r => {
                        this.updateColumnValue = r;
                      }}
                    />
                  </ContextPopover>
                </TableTh>
                <TableTh>{t("ItemVariantList.VariantsTable.Profit")}</TableTh>
                <TableTh>{t("ItemVariantList.VariantsTable.CompareAtPrice")}</TableTh>
              </tr>
            </thead>
            <tbody>{this.renderVariants()}</tbody>
          </Table>
        </ExpandingTable>
      );
    } else {
      return (
        <Row>
          <Col md={12}>
            <p className="text-center mt-20">{t("ItemVariantList.VariantsTable.Unavailable")}</p>
          </Col>
        </Row>
      );
    }
  };

  render() {
    // <ContextPopover /> for column updating (markup)
    return (
      <div>
        <div className="variants-head">
          <Row>
            <Col xs={12} md={12}>
              <p className="text-left">{this.props.t("ItemVariantList.VariantsTable.Head")}</p>
            </Col>
            <Col xs={6} md={6} className="text-right">
              {this.renderShippingModal()}
            </Col>
          </Row>
        </div>
        {this.renderVariantsTable()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage }, dispatch);
}

function mapStateToProps(state) {
  return { rules: state.settings.rules };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemVariantList)
);



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemVariantList/index.js