// Libs
import React, { Fragment, useState, useContext } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";
import { ProductVariationsModal } from "newDropshipperApp/component/modalConductor/deprecated/productVariationsModal/ProductVariationsModal";
import { Link } from "react-router";
import styled from "styled-components";

// Contexts
import { UserContext } from "contexts/UserContext";

// Actions
import { showModal, closeModal } from "actions/ui";

// Components
import SampleOrderModal from "components/_Shared/Modals/SampleOrderModal";
import { Typography, Button, Flex } from "newDropshipperApp/spocketUI";
import CardButton from "newDropshipperApp/pages/search/listingCard/CardButton";
// TODO - Add the new tooltip component into the spocketUI design system
import Tooltip from "newDropshipperApp/component/Tooltip";
import Gallery from "newDropshipperApp/component/Product/Gallery";

// Utils
import { getCountryFlag } from "utils/countryUtils";

// Icon
import iconInfo from "newDropshipperApp/images/icon-info.svg";
import iconAlert from "newDropshipperApp/images/icon-alert-grey.svg";
import iconClose from "newDropshipperApp/images/close-icon.svg";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

// Style
import {
  Container,
  CloseIcon,
  TooltipIcon,
  LeftSection,
  ProductDescription,
  ShippingTime,
  RightSection,
  ProductButton
} from "./ListingDetails.style";

const ListingDetails = props => {
  const { showModal, closeModal, currentPlan, listingIndex, currentModal } = props;
  const listing = props.listing || props.dataModal.listing || {};
  const {
    is_active,
    variations,
    description,
    formatted_msrp,
    processing_time,
    formatted_price,
    shipping_domestic,
    shipping_specifics,
    variation_properties,
    shipping_international,
    image_specifications_url,
    shipping_excluded_countries_formatted
  } = listing;
  const {
    custom,
    branded_invoicing,
    multiple_shipments,
    int_shipped_from_china,
    oos_shipped_from_china
  } = listing.restrictions;

  // Variant and order sample modal
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
  const [isOrderSampleModalOpen, setIsOrderSampleModalOpen] = useState(false);
  // Context
  const { importedListings, pushedListings } = useContext(UserContext);
  // Use translation hook
  const { t } = useTranslation();
  const isInsideModal = currentModal === "LISTING_DETAIL_MODAL";
  // Use Attempt AnalyticsProvider
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  const StyledTypography = styled(Typography.p)`
    margin-top: -12px;
  `;

  // Render the product description, we need to render raw, given this is rich text
  const renderDescriptionRawHTML = () => {
    return {
      __html: description
    };
  };

  /**
   * Render the shipping time info with a tooltip
   * @param  {String} countryOrigin country of origin
   * @param  {Object} shippingInfo detailed shipping information
   * @return {ReactElement}
   */
  const renderShippingTime = (countryOrigin, shippingInfo) => {
    const {
      delivery_time,
      price_formatted,
      base_price_cents,
      incremental_price_cents,
      incremental_price_formatted
    } = shippingInfo;

    const price = () => {
      if (price_formatted) {
        return (
          <Tooltip
            message={t("InfoSection.ShippingInfoLine.Tooltip", {
              price_formatted,
              incremental_price_formatted
            })}
          >
            <Flex alignItems="center" justifyContent="flex-start" marginBottom="12px">
              <TooltipIcon marginRight src={iconInfo} alt="information" />
              <Typography.p padding="0">
                {" "}
                {!base_price_cents ? t("InfoSection.ShippingInfoLine.Free") : price_formatted} /{" "}
                {!incremental_price_cents
                  ? t("InfoSection.ShippingInfoLine.Free")
                  : incremental_price_formatted}
              </Typography.p>
            </Flex>
          </Tooltip>
        );
      } else {
        return <Typography.p>{t("InfoSection.ShippingInfoLine.NoShipping")}</Typography.p>;
      }
    };

    const checkShipping = () => {
      if (base_price_cents) {
        return price();
      } else if (base_price_cents === 0) {
        return <Typography.p>{t("InfoSection.ShippingInfoLine.Free")}</Typography.p>;
      } else if (base_price_cents === undefined) {
        return <Typography.p>{t("InfoSection.ShippingInfoLine.NoShipping")}</Typography.p>;
      } else {
        return;
      }
    };

    return (
      <Flex alignItems="center" justifyContent="space-between">
        <div>
          <Typography.p>{countryOrigin}</Typography.p>
          {price_formatted && (
            <StyledTypography variant="secondary" size="md">
              ({delivery_time} {t("InfoSection.ShippingInfoLine.Period")})
            </StyledTypography>
          )}
        </div>
        {checkShipping()}
      </Flex>
    );
  };

  const renderShippingSpecificLines = specificInfos => {
    if (!specificInfos) {
      return;
    }

    return specificInfos.map(info => (
      <Fragment key={`Shipping-${info["country"]}`}>{renderShippingTime(info["country"], info)}</Fragment>
    ));
  };

  const renderShippingExcluded = () => {
    const largeNumberOfExclusions = shipping_excluded_countries_formatted.split(",").length > 5;
    return (
      <Flex alignItems="center" justifyContent="space-between" marginBottom="12px">
        <Typography.p padding="0">{t("InfoSection.ShippingExcluded.Intro")}</Typography.p>
        <Tooltip message={shipping_excluded_countries_formatted}>
          {largeNumberOfExclusions ? (
            <Flex alignItems="center" justifyContent="flex-start">
              <Typography.p padding="0">{t("InfoSection.ShippingExcluded.Various")}</Typography.p>
              <TooltipIcon src={iconInfo} alt="information" />
            </Flex>
          ) : (
            <Typography.p padding="0">{shipping_excluded_countries_formatted}</Typography.p>
          )}
        </Tooltip>
      </Flex>
    );
  };

  const handleOrderSampleClick = () => {
    const trackPaywallViewObject = {
      referrerPage: "product_search",
      referrerContext: "premium_products",
      referrerContextEntityId: listing.id,
      referrer_position: listingIndex
    };

    if (currentPlan.name === "Basic") {
      track("upgrade__sample-orders--clicked", {}, { refreshAttemptId: true });
      showModal("UPGRADE_MODAL", trackPaywallViewObject);
    } else {
      const integratedStoreId = localStorage.getItem("integrated_store_id");
      if (!integratedStoreId) {
        showModal("CONNECT_STORE", {
          title: t("ListingModal.DetailsSection.ConnectStore.Alert")
        });
        return;
      } else {
        setIsOrderSampleModalOpen(true);
      }
    }
  };

  const renderCardButton = () => {
    const isImported = importedListings.includes(listing.id);
    const isPushed = pushedListings.includes(listing.id);
    // The button should not be shown if the modal is opened in these routes
    const shouldntShowButton =
      window.location.pathname === "/products" || window.location.pathname === "/orders";
    if (shouldntShowButton) return null;
    return (
      <CardButton
        productDetailView
        listing={listing}
        isImported={isImported}
        isPushed={isPushed}
        parentName="ListingDetails"
      />
    );
  };

  return (
    <Fragment>
      <Container data-cy="listing-detail-modal">
        {/* Only show close button when inside modal */}
        {isInsideModal && (
          <CloseIcon onClick={() => closeModal()}>
            <img src={iconClose} alt="close" />
          </CloseIcon>
        )}
        <LeftSection isInsideModal={isInsideModal}>
          {/* Carousel */}
          <Gallery listing={listing} images={listing.image_urls.map(image => image.normal)} />
          {/* Listing Description */}
          <Typography.H3>{t("ListingModal.MainSection.Title")}</Typography.H3>
          <ProductDescription dangerouslySetInnerHTML={renderDescriptionRawHTML()} />
        </LeftSection>

        <RightSection isInsideModal={isInsideModal}>
          {/* Listing Title */}
          <Typography.H1 data-cy="listing-detail-modal-title">{listing.title}</Typography.H1>

          {/* Listing Origin */}
          <Flex marginBottom="16px" alignItems="center" justifyContent="space-between">
            <Typography.H4>
              {t("TitleSection.TitleCountryOrigin.CountryOrigin.Intro")}{" "}
              {getCountryFlag(listing.country_origin)} {listing.country_origin}
            </Typography.H4>
            <Typography.H4>
              {t("TitleSection.TitleCountryOrigin.SupplierShopName.Intro")}{" "}
              <Link
                to={`/suppliers/${listing.supplier_shop_name}`}
                onClick={() => closeModal()}
                className="supplier-link"
              >
                {listing.supplier_shop_name}
              </Link>
            </Typography.H4>
          </Flex>

          {/* Price Title */}
          <Flex alignItems="center" justifyContent="space-between">
            <Typography.H4>{t("TitleSection.PriceMSRP.Listing")}</Typography.H4>
            <Typography.H4>{t("TitleSection.PriceMSRP.Retail")}</Typography.H4>
          </Flex>

          {/* Price Details */}
          <Flex marginBottom="16px" alignItems="center" justifyContent="space-between">
            <Typography.H2>{formatted_price}</Typography.H2>
            <Typography.H2>{formatted_msrp}</Typography.H2>
          </Flex>

          {/* Buttons */}
          <ProductButton>
            {renderCardButton()}
            <Button variant="basicBig" onClick={() => setIsVariationModalOpen(true)}>
              {t("ListingModal.DetailsSection.Button.ProductVariations")}
            </Button>
            {is_active && (
              <Button variant="basicBig" onClick={() => handleOrderSampleClick()}>
                {t("ListingModal.DetailsSection.Button.OrderSamples")}
              </Button>
            )}
          </ProductButton>

          {/* Processing Time */}
          {processing_time && (
            <Fragment>
              <Tooltip message={t("InfoSection.ProcessingTime.Tooltip")}>
                <Flex alignItems="center" justifyContent="flex-start" marginBottom="8px" marginTop="16px">
                  <Typography.H3 padding="0">{t("InfoSection.ProcessingTime.Title")} </Typography.H3>
                  <TooltipIcon src={iconInfo} alt="information" />
                </Flex>
              </Tooltip>
              <Typography.p padding="0">
                {processing_time} {t("InfoSection.ProcessingTime.Period")}
              </Typography.p>
            </Fragment>
          )}

          {/* Shipping Time */}
          <ShippingTime>
            <Fragment>
              <Tooltip message={t("InfoSection.ShippingTime.Tooltip")}>
                <Flex alignItems="center" justifyContent="flex-start" marginBottom="8px" marginTop="16px">
                  <Typography.H3 padding="0">{t("InfoSection.ShippingTime.Title")}</Typography.H3>
                  <TooltipIcon src={iconInfo} alt="information" />
                </Flex>
              </Tooltip>
            </Fragment>

            {/* Shipping Domestic */}
            {renderShippingTime(listing.country_origin, shipping_domestic)}

            {/* Shipping Specifics */}
            {renderShippingSpecificLines(shipping_specifics)}

            {/* Shipping International */}
            {renderShippingTime(t("InfoSection.ShippingInfo.Worldwide"), shipping_international)}

            {/* Shipping Excluded */}
            {shipping_excluded_countries_formatted.length > 0 && renderShippingExcluded()}
          </ShippingTime>

          {/* Return Policy */}
          <Typography.H3 padding="4px 0 8px 0">{t("ReturnPolicySection.Title")}</Typography.H3>
          <Typography.p>{listing.return_policy}</Typography.p>

          {/* Branded Invoicing Alert */}
          {branded_invoicing && (
            <Flex alignItems="flex-start" justifyContent="flex-start" marginBottom="12px">
              <TooltipIcon marginRight src={iconAlert} alt="alert" />{" "}
              <Typography.p padding="0">
                {t("ListingModal.DetailsSection.BrandedInvoicing.Alert")}
              </Typography.p>
            </Flex>
          )}

          {/* International Shipping Alert */}
          {int_shipped_from_china && (
            <Flex alignItems="flex-start" justifyContent="flex-start" marginBottom="12px">
              <TooltipIcon marginRight src={iconAlert} alt="alert" />{" "}
              <Typography.p padding="0">
                {t("ListingModal.DetailsSection.InternationalShipping.Alert")}
              </Typography.p>
            </Flex>
          )}

          {/* Out of stock in USA Alert */}
          {oos_shipped_from_china && (
            <Flex alignItems="flex-start" justifyContent="flex-start" marginBottom="12px">
              <TooltipIcon marginRight src={iconAlert} alt="alert" />{" "}
              <Typography.p padding="0">{t("ListingModal.DetailsSection.StockUsa.Alert")}</Typography.p>
            </Flex>
          )}

          {/* Multiple Package Alert */}
          {multiple_shipments && (
            <Flex alignItems="flex-start" justifyContent="flex-start" marginBottom="12px">
              <TooltipIcon marginRight src={iconAlert} alt="alert" />{" "}
              <Typography.p padding="0">
                {t("ListingModal.DetailsSection.MultiplePackage.Alert")}
              </Typography.p>
            </Flex>
          )}

          {/* Custom Restriction Alert */}
          {custom && (
            <Fragment>
              {custom.map((restriction, index) => {
                return (
                  <Flex
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    marginBottom="12px"
                    key={`${index}-${restriction}`}
                  >
                    <TooltipIcon marginRight src={iconAlert} alt="alert" />{" "}
                    <Typography.p padding="0">{restriction}</Typography.p>
                  </Flex>
                );
              })}
            </Fragment>
          )}
        </RightSection>
      </Container>

      {/* 
      * Modal 
      *
      * TODO - Create ProductVariationsModal and SampleOrderModal components from scratch
      * Ticket: https://app.zenhub.com/workspaces/spocket-5a04e4b85873b505f25f7622/issues/spocket-co/spocket/5924
      */}
      <ProductVariationsModal
        variations={variations}
        variationProperties={variation_properties}
        imageSpecifications={image_specifications_url}
        isOpen={isVariationModalOpen}
        closeModal={() => setIsVariationModalOpen(false)}
      />

      <SampleOrderModal
        listing={listing}
        isOpen={isOrderSampleModalOpen}
        closeModal={() => setIsOrderSampleModalOpen(false)}
      />
    </Fragment>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showModal,
      closeModal
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    dataModal: state.ui.data || false,
    listingIndex: null, //state.sharedComponents.listings.listingIndex, related to tracker, more info: https://vendchat.slack.com/archives/CDUQHQX0F/p1617657264290100?thread_ts=1617655866.286500&cid=CDUQHQX0F
    currentPlan: state.settings.currentPlan,
    currentModal: state.ui.currentModal
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingDetails);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Product/ListingDetails.js