import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { showModal } from "actions/ui";
import { getListingDetail } from "newDropshipperApp/module/shared/listings";

import Placeholder from "../../../../assets/place-holder.png";
import alibabaLogo from "newDropshipperApp/images/alibaba-logo.svg";
import { Title } from "components/Products/ProductList/ProductListItem/ProductListItem.style";
import "./style.css";

class ProductListItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    legacy_listing_id: PropTypes.string,
    storeUrl: PropTypes.string.isRequired,
    onRemoveFromStore: PropTypes.func.isRequired,
    integratedStore: PropTypes.object.isRequired
  };

  onViewProductOnStore = () => {
    window.open(this.props.storeUrl);
  };

  onRemoveFromStore = () => {
    this.props.onRemoveFromStore(this.props.id);
  };

  openModal = async id => {
    try {
      this.props.showModal("LOADING_MODAL");
      const listingDetailsResult = await getListingDetail(id);
      this.props.showModal("LISTING_DETAIL_MODAL", { listing: listingDetailsResult.json });
    } catch (err) {
      console.log(err); // TypeError: failed to fetch
    }
  };

  renderImage = () => {
    const backgroundImageCSS = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    const imageComponent = (
      <div
        className="product-list-item__image-cover"
        src={Placeholder}
        onClick={() => this.openModal(this.props.listing.id)}
        style={backgroundImageCSS}
        alt="product"
        data-cy="my-products-item-image"
      />
    );

    if (this.props.provider === "etsy") {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.etsy.com/listing/${this.props.legacy_listing_id}/`}
        >
          {imageComponent}
        </a>
      );
    } else {
      return imageComponent;
    }
  };

  shouldShowViewOnStoreButton = () => {
    // returns true it's NOT a wix store OR
    // if it's a wix store and has a valid url,
    // a valid url is something with a dot '.' a non published store has a https://some-uid
    // but a published store has a valid url, http://some.valid.url.with.a.dot
    const { integratedStore } = this.props;
    return integratedStore.name !== "wix" || /\./.test(integratedStore.url);
  };

  render() {
    const { isPremium, listing, title, inventoryCount, t } = this.props;
    const inventoryCountText =
      inventoryCount === 1
        ? t("ProductListItem.InventoryCount.Singular")
        : t("ProductListItem.InventoryCount.Plural");
    const inventoryUnitsText =
      inventoryCount === 1
        ? t("ProductListItem.InventoryCount.End.Singular")
        : t("ProductListItem.InventoryCount.End.Plural");
    const inventoryText = `${inventoryCountText} ${inventoryUnitsText}`;
    return (
      <div>
        <div className="card mt-30 text-center">
          <div>
            {isPremium && <div className="product-list-item__premium badge-premium-product" />}

            {!listing.is_active && (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="badge-inactive-product">{t("ProductListItem.Inactive.Tooltip")}</Tooltip>
                }
              >
                <div className="badge-inactive-product">{t("ProductListItem.Inactive.Title")}</div>
              </OverlayTrigger>
            )}

            {listing.total_inventory === 0 &&
              listing.is_active && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="badge-out-of-stock">{t("ProductListItem.OutOfStock.Tooltip")}</Tooltip>
                  }
                >
                  <div className="badge-out-of-stock">{t("ProductListItem.OutOfStock.Title")}</div>
                </OverlayTrigger>
              )}

            {this.renderImage()}

            <Title>
              {this.props.provider === "Alibaba" && <img src={alibabaLogo} alt="alibaba product" />}
              <p data-cy="product-card-name">{title}</p>
            </Title>
            <p className="mt-10 product-card-name mb-20 stock-text">
              {inventoryCount} {inventoryText}
            </p>
          </div>
          <hr />
          {this.shouldShowViewOnStoreButton() && (
            <button className="btn btn-block btn-success btn-wide" onClick={this.onViewProductOnStore}>
              {t("ProductListItem.Button.View")}
            </button>
          )}
          <button
            data-cy="remove-from-store"
            className="btn btn-default btn-block btn-wide"
            onClick={this.onRemoveFromStore}
          >
            {t("ProductListItem.Button.Remove")}
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showModal
    },
    dispatch
  );
}

export default withTranslation()(
  connect(
    null,
    mapDispatchToProps
  )(ProductListItem)
);



// WEBPACK FOOTER //
// ./src/components/Products/ProductList/ProductListItem/index.js