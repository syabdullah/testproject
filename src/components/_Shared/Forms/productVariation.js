import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Row, Col, FormControl } from "react-bootstrap";
import styled from "styled-components";

import "./style.css";

import { DropdownLeft } from "./deprecated/DropDownLeft";

const StyledListItem = styled.li`
  list-style-type: none;
  font-size: 12px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.1s;

  :hover {
    font-weight: bold;
  }
`;
class ProductVariation extends Component {
  state = {
    activeVariation: { inventory: 0 }
  };

  updateVariationQuantity = variation => {
    this.setState(
      {
        activeVariation: variation
      },
      () => {
        this.props.handleFormChanged({
          target: { name: "quantity", value: 0, label: 0 }
        });
      }
    );
  };

  renderQuantityList = () => {
    let quantityList = [];
    // Set inventory to either 5 or variation inventory (If under 5)s
    const maxInventory = this.state.activeVariation.inventory >= 5 ? 5 : this.state.activeVariation.inventory;
    for (let x = 0; x <= maxInventory; x++) {
      quantityList.push(
        <StyledListItem
          key={x}
          onClick={e => this.props.handleFormChanged({ target: { name: "quantity", value: x, label: x } })}
        >
          {x}
        </StyledListItem>
      );
    }
    return quantityList;
  };

  renderSubtotal = () => {
    const form = this.props.form;
    if (form.productSelected && form.quantity) {
      return (
        <Row className="mt-20">
          <Col md={6}>
            <span className="Product_Variation__subtotal">
              Subtotal ({form.quantity} {form.quantity > 1 ? "items" : "item"})
            </span>
          </Col>
          <Col md={6} style={{ textAlign: "right" }}>
            <span className="Product_Variation__price">
              ${(form.productSelected.price * form.quantity).toFixed(2)}
            </span>
          </Col>
        </Row>
      );
    }
  };

  renderListGroupItems = () => {
    let listGroupItems = [];
    const { listing, handleFormChanged, handleListingSelected, handleVariantSelected } = this.props;

    if (listing !== null) {
      listing.variations.forEach((variation, index) => {
        const characteristics = Object.values(variation.characteristics);
        const characteristicsLength = characteristics.length;

        let groupItemLabel = characteristics.join(" - ");
        if (characteristicsLength === 0) {
          groupItemLabel = "Default";
        }

        listGroupItems.push(
          <StyledListItem
            key={index}
            onClick={e => {
              handleFormChanged({
                target: {
                  name: "characteristics",
                  value: JSON.stringify(variation.characteristics),
                  label: groupItemLabel
                }
              });
              handleListingSelected(listing);
              handleVariantSelected(variation);
              this.updateVariationQuantity(variation);
            }}
          >
            {groupItemLabel} - {variation.price_formatted}
          </StyledListItem>
        );
      });
    }

    return listGroupItems;
  };

  render() {
    const { form, t } = this.props;

    return (
      <div>
        <Row>
          <Col md={12}>
            <p>{t("ProductVariation.Description")}</p>
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={9} className="Product_Variation__form">
            <label>{t("ProductVariation.Label.SelectTheProductVariation")}</label>
            <DropdownLeft
              title={form.characteristics}
              placeholder={t("ProductVariation.Label.SelectVariant")}
            >
              {this.renderListGroupItems()}
            </DropdownLeft>
          </Col>
          <Col md={3} className="Product_Variation__form">
            <label>{t("ProductVariation.Qty")}</label>

            <DropdownLeft title={form.quantity} placeholder="0">
              {this.renderQuantityList()}
            </DropdownLeft>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <label>{t("ProductVariation.Label.NotesForTheSupplier")}</label>
            <FormControl
              onChange={e => this.props.handleFormChanged(e)}
              className="Product_Variation__note"
              componentClass="textarea"
              rows="5"
              name="note"
              bsSize="sm"
              value={form.note}
            />
          </Col>
        </Row>

        {this.renderSubtotal()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
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
  )(ProductVariation)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Forms/productVariation.js