import React from "react";
import PropTypes from "prop-types";
import ProductListItem from "./ProductListItem";
import { Row, Col } from "react-bootstrap";

class ProductList extends React.Component {
  static propTypes = {
    products: PropTypes.array.isRequired
  };

  static defaultProps = {
    products: [],
    integratedStore: {}
  };

  renderProductListItemsDisplay = () => {
    const { integratedStore, products } = this.props;
    return products.map(product => (
      <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
        <ProductListItem
          id={product.id}
          title={product.title}
          image={product.image_card_url}
          provider={product.provider}
          legacy_listing_id={product.legacy_listing_id}
          onRemoveFromStore={this.props.onRemoveFromStore}
          storeUrl={product.integration_url}
          isPremium={product.special}
          listing={product.listing}
          inventoryCount={product.inventory_count}
          integratedStore={integratedStore}
        />
      </Col>
    ));
  };

  render() {
    return <Row>{this.renderProductListItemsDisplay()}</Row>;
  }
}

export default ProductList;



// WEBPACK FOOTER //
// ./src/components/Products/ProductList/index.js