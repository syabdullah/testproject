import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tabs, Tab, OverlayTrigger, Tooltip, Label } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import { default as Loadable } from "../../../_Shared/commonLoadable";
import { openUpgradeModal, closeUpgradeModal } from "../../../../actions/upgrade.js";
import { setAlertMessage } from "../../../../actions";
import { updateTourStep } from "../../../../actions/settings";
import ApiCall from "../../../../utils/apiCall";
import ItemDescription from "./ItemDescription";
import ItemImageList from "./ItemImageList";
import ItemInfo from "./ItemInfo";
import ItemVariantList from "./ItemVariantList";
import { showModal } from "../../../../actions/ui";

import { getPlans } from "../../../../newDropshipperApp/module/store/plans";
import { isSubscriptionOverdue } from "../../../../newDropshipperApp/utils/user";
import { gaEvent } from "../../../../newDropshipperApp/utils/trackEvents";

import warningIconOutline from "../../../../assets/icon-warning-outline.svg";
import crownIcon from "../../../../assets/crown-icon.svg";
import { MINIMUM_STOCK_VARIANTS_WARN } from "../../../../consts/variants";
import { withAnalytics } from "use-analytics";
import { difference } from "newDropshipperApp/utils/object";

import "./style.css";

class ImportListItem extends Component {
  componentDidMount() {
    /**
     * Saving the initial listing customization state to compare with the final state.
     * We are using it to trigger an analytic event based on what parameter the user modified.
     * See more: https://www.notion.so/import_list_product_saved-98ee19f5ccbc4dd2bb7663aa7c91a0c8#e57f4c978a984637bb1b548e394b054d
     */
    this.setState({
      cachedListingCustomization: {
        title: this.props.item.title,
        description: this.props.item.description,
        tags: this.props.item.tags,
        collection_id: this.props.item.collection_id,
        selected_listing_image_ids: this.state.selected_image_ids,
        chosen_variations: this.getChosenVariations(),
        product_type: this.props.item.product_type
      }
    });
  }

  UNSAFE_componentWillMount = () => {
    this.castItemToState(Object.assign({}, this.props.item), () => {
      this.activatePushProductButton();
    });
  };

  static propTypes = {
    lastProductAction: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    openUpgradeModal: PropTypes.func.isRequired,
    closeUpgradeModal: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setAlertMessage: PropTypes.func.isRequired,
    saveAndPush: PropTypes.bool
  };

  state = {
    isRemoving: false,
    isPushing: false,
    canPush: false,
    unsavedChanges: false,
    _itemInState: false,
    activeTab: 1,
    variariationsErrors: [], //track variations that has sales value higher than compared_at_price,
    cachedListingCustomization: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      listing_images: nextProps.item.listing_images,
      isPushing: nextProps.item.isPushing
    });
    if (!this.props.saveAndPush && nextProps.saveAndPush) {
      this.onSave(true);
    }
  }

  /**
   * Merges listing_variations and chosen_variations into one array
   *  of Variations with a "selected" value (for the checkboxes)
   *  and a "customPrice" value (for the fields)
   * @param  {Array} listingVariations [variations with no custom properties]
   * @param  {Array} chosenVariations  [variations with a price_cents]
   * @return {Array}                   [Array of variations with .selected
   *                                          and .customPrice]
   */
  mergeListingVariationsAndChosenVariations(listingVariations, chosenVariations) {
    return listingVariations.map(v => {
      let characteristicString = JSON.stringify(v.characteristics);
      chosenVariations.forEach(chosen => {
        if (characteristicString === JSON.stringify(chosen.characteristics)) {
          v.selected = true;
          v.customPrice = String(chosen.price_float);
          v.compare_at_price_cents = String(chosen.compare_at_price_cents);
        }
      });
      return v;
    });
  }

  /**
   * Gets the chosen_variations for saving/updating
   * @return {Array} [An Array of objects matching the chosen_variations]
   */
  getChosenVariations = () => {
    const chosenVariations = [];
    for (const variation of this.item().variations) {
      if (variation.selected) {
        chosenVariations.push({
          price_cents: Math.round(Number(variation.customPrice) * 100),
          characteristics: variation.characteristics,
          listing_variation_id: variation.id,
          compare_at_price_cents: variation.compare_at_price_cents
            ? Math.round(Number(variation.compare_at_price_cents) * 100)
            : ""
        });
      }
    }
    return chosenVariations;
  };

  castItemToState = (item, cb) => {
    const newState = Object.assign({ _itemInState: true }, item);
    newState.variations = this.mergeListingVariationsAndChosenVariations(
      newState.listing_variations,
      newState.chosen_variations
    );
    this.setState(newState, cb);
  };

  item = () => {
    return this.state._itemInState ? this.state : this.props.item;
  };

  handleChange = (value, key) => {
    const newState = { unsavedChanges: true };
    newState[key] = value;
    this.setState(newState, () => this.activatePushProductButton());
  };

  /**
   * This validates that the compare_at_price_cents is
   * greater than the salse price. If the Sales price is higher,
   * which is not meant to be, it adds the variation to variariationsErrors.
   * It also removes the variation from variariationsErrors if the prices are rectified.
   * @param variariation variation object
   */
  validateCompareAtPrice = variariation => {
    if (parseFloat(variariation.customPrice) >= parseFloat(variariation.compare_at_price_cents)) {
      const variariationsErrors = this.state.variariationsErrors.concat(variariation);
      this.setState({ variariationsErrors });
    } else {
      const variariationsErrors = this.state.variariationsErrors.filter(
        varError => varError.id !== variariation.id
      );
      this.setState({ variariationsErrors });
    }
  };

  /**
   * Checking what kind of product the user are not able to push
   * and trigger the <UpgradeModal /> component.
   *
   * @returns {String} Just returns "basic_products" or "special_products"
   */
  async cantPushProductsReason(isProductSpecial) {
    this.props.toggleIsPushing(this.item().id, true);
    const refreshedPushedProductCount = await this.props.refreshPushedProductCount();
    const { allPlans, currentPlan } = this.props;
    const {
      totalPushedProducts,
      // specialPushedProducts,
      canPushSpecialProducts
    } = refreshedPushedProductCount;
    const detailedCurrentPlan = allPlans.find(
      plan => plan.name === currentPlan.name && plan.annual === false
    );
    const cantPushBasicProducts = totalPushedProducts >= detailedCurrentPlan.max_products;
    // const cantPushSpecialProducts =
    //   isProductSpecial &&
    //   specialPushedProducts >= detailedCurrentPlan.max_special_products;

    const cantPushSpecialProducts = isProductSpecial && !canPushSpecialProducts;

    if (cantPushBasicProducts) {
      this.props.toggleIsPushing(this.item().id, false);
      return "basic_products";
    } else if (cantPushSpecialProducts) {
      this.props.toggleIsPushing(this.item().id, false);
      return "special_products";
    }
  }

  hasOneActiveVariation = () => {
    for (const variation of this.item().variations) {
      if (variation.selected) {
        return true;
      }
    }
    return false;
  };

  /**
   * Activate the push product button (disabled by default) if there
   *   is at least one chosen variation, otherwise, disable it.
   */
  activatePushProductButton = () => {
    let canPush = false;
    if (!this.state.unsavedChanges) {
      canPush = this.hasOneActiveVariation();
    }

    this.setState({ canPush });
  };

  handleRemoveProduct = () => {
    this.setState({
      isRemoving: true
    });

    const ID = this.item().id;

    ApiCall.delete(`/listing_customizations/${ID}`)
      .then(({ status, json }) => {
        this.props.removeItem(ID);
        this.props.lastProductAction();
        this.props.setAlertMessage(
          `${this.props.t("ImportListItem.Alert.Removed")} ${this.item().title}`,
          "success"
        );
      })
      .catch(error => {
        if (error.status) {
          this.props.setAlertMessage(
            `${this.props.t("ImportListItem.Alert.RemoveFailed")} ${this.item().title}`,
            "error"
          );
        } else {
          throw error;
        }
      })
      .then(() => {
        this.setState({ isRemoving: false });
      });
  };

  /**
   * This checks if there are any variations with compare at errors.
   * If there is any variation with errors, it alerts an error message and returns true.
   * If there are no variations with errors, it returns false.
   * @returns {Boolean} true or false
   */
  hasCompareAtError = () => {
    const variariationsErrors = this.state.variariationsErrors;

    if (variariationsErrors.length > 0) {
      this.props.setAlertMessage(
        `${this.props.t("ImportListItem.Alert.CompareAtPrice")} ${variariationsErrors[0].sku}`,
        "error"
      );
      return true;
    } else {
      return false;
    }
  };

  validatePushAction = async () => {
    const integratedStoreId = localStorage.getItem("integrated_store_id");
    const { special } = this.props.item;
    const reason = await this.cantPushProductsReason(special);

    if (!this.hasOneActiveVariation()) {
      this.props.setAlertMessage(
        `${this.props.t("ImportListItem.Alert.OneActiveVariation")} ${this.item().title}`,
        "error"
      );
      this.props.toggleIsPushing(this.item().id, false);
      return;
    }

    if (!integratedStoreId) {
      this.props.showModal("CONNECT_STORE", {
        title: this.props.t("ImportListItem.Modal.ConnectStore")
      });
      this.props.toggleIsPushing(this.item().id, false);
      return;
    }

    if (isSubscriptionOverdue()) {
      this.props.showModal("CARD_DECLINE");
      return;
    }

    if (reason) {
      this.props.showModal("UPGRADE_MODAL", {
        modalUpgradeType: reason,
        referrerPage: "import_list",
        referrerContext: "premium_products",
        upgradeStep: "viewed_all_plans"
      });
      return;
    }

    return true;
  };

  handleSuccessSaveAction = () => {
    this.setState({ unsavedChanges: false }, () => {
      this.props.onRegenerateItems(true);
    });
    this.props.setAlertMessage(
      `${this.props.t("ImportListItem.Alert.Saved")} ${this.item().title}`,
      "success"
    );
  };

  /**
   * Handle the logic to decide if we should send the import_list_product_saved analytics event.
   * @param  {Object} listingCustomization The final state.
   */
  importListProductSavedAnalyticsEvent(listingCustomization) {
    const { track } = this.props.analytics;
    const { cachedListingCustomization } = this.state;
    const { id, listing_id } = this.item();

    // Compare the cashed listing customization state against the new state.
    const diffListingCustomization = difference(cachedListingCustomization, listingCustomization);

    // Fire the import_list_product_saved event only if the user changes some parameter.
    diffListingCustomization.length &&
      track("import_list_product_saved", {
        listing_customization_id: id,
        listing_id: listing_id,
        changes: diffListingCustomization
      });

    // Update the cachedListingCustomization state. So we can save the new state.
    this.setState({
      cachedListingCustomization: listingCustomization
    });
  }

  onSave = async (push_product = false) => {
    if (this.hasCompareAtError()) return;
    // Return from this function after alerting
    // error message if there are variations with
    // price errors. This prevents saving listing customization.

    this.props.toggleIsPushing(this.item().id, push_product);

    if (push_product) {
      const validateResult = await this.validatePushAction();
      if (!validateResult) return;
    }
    const integratedStoreId = localStorage.getItem("integrated_store_id");

    // build object to send:
    const listing_customization = {
      title: this.item().title,
      description: this.item().description,
      tags: this.item().tags,
      collection_id: this.item().collection_id,
      selected_listing_image_ids: this.state.selected_image_ids,
      chosen_variations: this.getChosenVariations(),
      product_type: this.item().product_type
    };

    this.importListProductSavedAnalyticsEvent(listing_customization);

    const pushProductErrorText = push_product
      ? this.props.t("ImportListItem.Alert.ErrorPushing")
      : this.props.t("ImportListItem.Alert.ErrorSaving");

    return ApiCall.patch(`/listing_customizations/${this.item().id}`, {
      listing_customization: listing_customization,
      push_product: push_product,
      integrated_store_id: integratedStoreId
    })
      .then(() => {
        if (!push_product) this.handleSuccessSaveAction();
      })
      .catch(({ status, json }) => {
        switch (status) {
          case 500:
            this.props.setAlertMessage(pushProductErrorText, "error");
            break;
          default:
            this.props.setAlertMessage(`${this.item().title}: ${json.errors[0]}`, "error");
        }
      })
      .then(() => {
        if (!push_product) this.props.toggleIsPushing(this.item().id, false);
      });
  };

  handleSelectTab = activeTab => {
    this.setState({ activeTab });
  };

  renderPushToStoreTooltip = () => {
    if (!this.state.canPush) {
      if (!this.hasOneActiveVariation() && this.state.profit >= 0) {
        return (
          <Tooltip id="Active Variation">{this.props.t("ImportListItem.Tooltip.OneActiveVariation")}</Tooltip>
        );
      }

      if (!this.item().purchasable && this.state.profit >= 0) {
        return <Tooltip id="Active Variation">{this.props.t("ImportListItem.Tooltip.Unavailable")}</Tooltip>;
      }

      if (this.state.unsavedChanges && this.state.profit >= 0) {
        return <Tooltip id="Unsaved changes">{this.props.t("ImportListItem.Tooltip.Unsaved")}</Tooltip>;
      }

      if (this.state.profit < 0) {
        return <Tooltip id="profit-tooltip">{this.props.t("ImportListItem.Tooltip.Profit")}</Tooltip>;
      }
    }
  };

  renderSaveTooltip = () => {
    if (!this.item().purchasable) {
      return <Tooltip id="Unpurchasable">{this.props.t("ImportListItem.Tooltip.Unpurchasable")}</Tooltip>;
    }
  };

  getProfitValue = profit => {
    this.setState({ profit });
  };

  getMinInventory() {
    return Math.min(...this.item().variations.map(v => v.inventory));
  }

  renderTableRightSide() {
    const { t } = this.props;
    const showMinimumStockWarn = this.getMinInventory() <= MINIMUM_STOCK_VARIANTS_WARN;
    const isSpecial = this.item().special;
    return (
      <div className="import-list-item__tabs_right_side" data-cy="right-side-label">
        <span>
          {showMinimumStockWarn && (
            <Label className="import-list-item_low_stock_variants" bsStyle="warning">
              <img alt="" className="import-list-item_low_stock_variants_icon" src={warningIconOutline} />
              {t("ImportList.LowStockVariants.Label")}
            </Label>
          )}
          {isSpecial && (
            <div className="import-list-item__premium">
              <img src={crownIcon} alt="premium" />
            </div>
          )}
        </span>
      </div>
    );
  }

  render() {
    const { specialPushedProducts, totalPushedProducts, t } = this.props;
    const pushToStoreTooltip = this.renderPushToStoreTooltip();
    const pushToStoreButton = (
      <Button
        className="btn-primary import-list-item__push import_list_item--footer-buttons"
        disabled={this.state.isPushing || !this.item().purchasable || !this.props.allPlans}
        onClick={() => this.onSave(true)}
      >
        {this.state.isPushing ? (
          <span>{t("ImportListItem.Push.Active")}</span>
        ) : (
          <span data-cy="push-to-store-button">{t("ImportListItem.Push.Inactive")}</span>
        )}
        {this.props.tourStep === "step_three" &&
          this.props.itemIndex === 0 && <span className="beacon beacon-2" />}
      </Button>
    );

    const saveTooltip = this.renderSaveTooltip();
    const saveButton = (
      <Button
        className="btn-primary import-list-item__push import_list_item--footer-buttons"
        onClick={async () => {
          await this.onSave();
          gaEvent({
            category: "Import List",
            action: "Save"
          });
        }}
      >
        {t("ImportListItem.Save.Button")}
      </Button>
    );
    const itemTitle = this.item()
      .title.toLowerCase()
      .split(" ")
      .join("-");

    return (
      <Loadable
        active={Boolean(
          this.state.isRemoving || this.state.isPushing || !totalPushedProducts || !specialPushedProducts
        )}
      >
        <div className="card mt-30" data-cy={`import-list-item-${itemTitle}`}>
          <div>
            <Tabs
              activeKey={this.state.activeTab}
              onSelect={this.handleSelectTab}
              id="uncontrolled-tab-example"
              className="import-list-item-tabs"
            >
              <Tab eventKey={1} title={t("ImportListItem.Tab.Product")}>
                <ItemInfo
                  images={this.state.listing_images}
                  title={this.item().title}
                  tags={this.item().tags}
                  type={this.item().type}
                  productType={this.item().product_type}
                  collectionID={this.item().collection_id}
                  handleChange={this.handleChange}
                />
              </Tab>
              <Tab eventKey={2} title={t("ImportListItem.Tab.Description")}>
                <ItemDescription description={this.item().description} handleChange={this.handleChange} />
              </Tab>
              <Tab eventKey={3} title={t("ImportListItem.Tab.Variants")}>
                <ItemVariantList
                  shipping_countries={this.item().shipping_countries}
                  variations={this.item().variations}
                  chosenVariations={this.item().chosen_variations}
                  countryOrigin={this.item().country_origin}
                  shippingDomestic={this.item().shipping_domestic}
                  shippingInternational={this.item().shipping_international}
                  shippingExcludedCountries={this.item().shipping_excluded_countries_formatted}
                  shippingSpecifics={this.item().shipping_specifics}
                  provider={this.item().provider}
                  purchasable={this.item().purchasable}
                  handleChange={this.handleChange}
                  validateCompareAtPrice={this.validateCompareAtPrice}
                  getProfitValue={this.getProfitValue}
                />
              </Tab>
              <Tab eventKey={4} title={t("ImportListItem.Tab.Images")}>
                <ItemImageList
                  id={this.item().id}
                  images={this.item().listing_images}
                  selectedImages={this.item().selected_listing_image_ids}
                  handleChange={this.handleChange}
                />
              </Tab>
              <Tab title={this.renderTableRightSide()} />
            </Tabs>
          </div>
          <hr />
          <div className="buttons-area">
            <Button
              bsStyle="default"
              className="import-list-item__remove import_list_item--footer-buttons"
              disabled={this.state.isRemoving}
              onClick={this.handleRemoveProduct}
            >
              {this.state.isRemoving ? (
                <span>{t("ImportListItem.Remove.Active")}</span>
              ) : (
                <span data-cy="remove-item-button">{t("ImportListItem.Remove.Inactive")}</span>
              )}
            </Button>
            <div>
              {saveTooltip ? (
                <OverlayTrigger placement="top" overlay={saveTooltip}>
                  {saveButton}
                </OverlayTrigger>
              ) : (
                saveButton
              )}
              {pushToStoreTooltip ? (
                <OverlayTrigger placement="top" overlay={pushToStoreTooltip}>
                  {pushToStoreButton}
                </OverlayTrigger>
              ) : (
                pushToStoreButton
              )}
            </div>
          </div>
        </div>
      </Loadable>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlertMessage,
      openUpgradeModal,
      closeUpgradeModal,
      updateTourStep,
      showModal,
      getPlans
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    tourStep: state.settings.dropshipperData.tour_step,
    currentPlan: state.settings.currentPlan,
    allPlans: state.store.plans.allPlans,
    allPlansIsFetching: state.store.isFetching,
    hasReviewed: state.store.information.account.review.created_at.length > 0,
    productListCount: state.settings.dropshipperData.product_list_count
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withAnalytics(ImportListItem))
);



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/index.js