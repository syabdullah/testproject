// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControl, Label } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { numberFormat } from "../../../../../../utils";
import noImageIcon from "../../../../../../assets/no-image-icon.svg";
import "../../style.css";

import { MINIMUM_STOCK_VARIANTS_WARN } from "../../../../../../consts/variants";

class ItemVariant extends Component {
  static propTypes = {
    variation: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    customPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    index: PropTypes.number.isRequired,
    handleVariationToggle: PropTypes.func.isRequired,
    handleVariationPriceChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: false,
    customPrice: ""
  };

  onVariantToggle = () => {
    this.props.handleVariationToggle(!this.props.selected, this.props.index);
  };

  onVariantPriceChange = e => {
    const newValue = numberFormat(this.props.variation.customPrice, e.target.value, 2);
    this.props.handleVariationPriceChange(newValue, this.props.index);
  };

  /**
   * This handles the on change callback on the compare at price.
   * This method takes the input element, converts the value
   * of the element to a valid numeric value and send it to
   * the higher component handler handleVariationCompareAtChange.
   * @param event event from input
   */
  onVariantCompareAtChange = event => {
    const newValue = numberFormat(this.props.variation.compare_at_price_cents, event.target.value, 2);
    this.props.handleVariationCompareAtChange(newValue, this.props.index);
  };

  renderProperties = () => {
    return Object.values(this.props.variation.characteristics).map((value, i) => <td key={i}>{value}</td>);
  };

  getProfitColor = value => {
    const BASE_VALUE = 0.0;

    if (value === BASE_VALUE) {
      return "black";
    } else if (value < BASE_VALUE) {
      return "red";
    } else if (value > BASE_VALUE) {
      return "green";
    }
  };

  getProfitInfo = () => {
    // Props
    const { variation, shippingPrice, customPrice } = this.props;

    // Formating values
    const customPriceAsNumber = Number(customPrice);
    const variationBasePrice = variation.price_cents / 100;
    const shippingPriceConverted = shippingPrice().price;

    // Calculating the profit
    const profit = customPriceAsNumber - shippingPriceConverted - variationBasePrice;
    const profitFixed = profit.toFixed(2);
    this.props.getProfitValue(profitFixed);

    return {
      value: profitFixed,
      color: this.getProfitColor(profitFixed)
    };
  };

  render() {
    const { t } = this.props;
    const variation = this.props.variation;
    const showMinimumStockWarn = variation.inventory <= MINIMUM_STOCK_VARIANTS_WARN;
    return (
      <tr className="item-variant__middle">
        <td>
          <input
            type="checkbox"
            checked={this.props.selected}
            disabled={this.props.loading || (this.props.selected ? false : this.props.selectDisabled)}
            onChange={this.onVariantToggle}
          />
        </td>
        {this.props.renderImage() && (
          <td>
            {variation.image ? (
              <img src={variation.image} alt="Product variation" />
            ) : (
              <img src={noImageIcon} alt="No product" />
            )}
          </td>
        )}
        <td>{variation.sku}</td>
        {this.renderProperties()}
        <td data-cy="variant-inventory">
          {variation.inventory}
          {showMinimumStockWarn && (
            <Label className="item-variant__low_stock_label" bsStyle="warning">
              {t("ProductListItem.ItemVariant.LowStock.Label")}
            </Label>
          )}
        </td>
        <td>{variation.price_formatted}</td>
        <td>{this.props.shippingPrice().price_formatted}</td>
        <td>
          <FormControl type="text" value={this.props.customPrice} onChange={this.onVariantPriceChange} />
        </td>
        <td style={{ color: this.getProfitInfo().color }}>${this.getProfitInfo().value}</td>
        <td>
          <FormControl
            type="text"
            value={variation.compare_at_price_cents}
            onChange={this.onVariantCompareAtChange}
          />
        </td>
      </tr>
    );
  }
}

export default withTranslation()(ItemVariant);



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemVariantList/ItemVariant/index.js