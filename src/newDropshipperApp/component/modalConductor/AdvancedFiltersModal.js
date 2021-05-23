// Libs
import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useQueryParams, ArrayParam, StringParam } from "use-query-params";

// Actions
import { closeModal } from "../../../actions/ui";

// Images
import crownPremium from "../../images/crown-premium.svg";
import iconClose from "../../images/close-icon.svg";

// Components
import { Modal, Button, Select, Checkbox, CountryFlag, InputRange, RadioGroup, Radio } from "../../spocketUI";
import ActiveFilters from "../../pages/search/ActiveFilters";
import { Emoji } from "newDropshipperApp/component/Emoji";

// Utils
import { useSpocketAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

// Style
import {
  Body,
  Header,
  Footer,
  PopularFilters,
  Section,
  ShipsToFilters,
  ShippingFilters,
  SectionTitle,
  SectionContent,
  SectionSubtitle,
  ItemConstFilter,
  AlignLeft,
  Group,
  GroupBadge,
  GroupLabel,
  ShippingTimeFilter,
  Badge,
  SectionDescription,
  AlignRight,
  Flex,
  TopHeader,
  CloseModalIcon
} from "./AdvancedFiltersModalStye";

// Utils
import allCountries from "../../utils/staticData/allCountries";
import shipsFromCountries from "../../utils/staticData/shipsFromCountries";

// i18n
import { useTranslation } from "react-i18next";

const allCountriesWithFlags = allCountries.map(country => {
  return {
    label: country.label,
    value: country.value,
    icon: <CountryFlag isoCountryCode={country.iso_country_code} label={country.label} />
  };
});

const shipsFromCountriesWithFlags = shipsFromCountries.map(country => {
  return {
    label: country.label,
    value: country.value,
    icon: <CountryFlag isoCountryCode={country.iso_country_code} />
  };
});

const AdvancedFiltersModal = ({ closeModal, suppliersAliases }) => {
  // Managing state in URL query parameters with serialization
  const [query, setQuery] = useQueryParams({
    ships_from: StringParam,
    ships_to: StringParam,
    item_cost: ArrayParam,
    premium: StringParam,
    supplier_name: StringParam,
    shipping_time: StringParam,
    shipping_under: StringParam,
    supplier_verified: StringParam,
    best_selling: StringParam
  });
  const { t } = useTranslation();
  const { track, difference } = useSpocketAnalytics();

  const itemCostFormatter = itemCost => {
    return itemCost.map(item => Number(item)).sort((a, b) => a - b);
  };

  // Local state
  const [state, setState] = useState({
    ...query,
    item_cost: query.item_cost ? itemCostFormatter(query.item_cost) : undefined,
    shipping_time: query.shipping_time ? query.shipping_time : "any",
    shipping_under: query.shipping_under ? query.shipping_under : "any",
    ships_to: query.ships_to ? query.ships_to : ""
  });

  /**
   * Saving the initial query string state to compare with the final state.
   * We are using it to trigger an analytic event based on what parameter the user modified.
   * See more: https://www.notion.so/57563005ddd14bed9e7cd6999bc57cc7?v=ce3e05f721324d3c898d99f13aa0b79d&p=aae72d901a724af4aa31a1615930ae02
   */
  const [cashedQuery, setCashedQuery] = useState();
  useEffect(() => {
    setCashedQuery(state);
  }, []);

  const updateState = object => {
    setState({ ...state, ...object });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSelectedShipsFrom = value => {
    return shipsFromCountriesWithFlags.filter(shipsFromCountry => shipsFromCountry.value === value);
  };

  const getSelectedShipsTo = value => {
    return allCountriesWithFlags.filter(shipsToCountry => shipsToCountry.value === value);
  };

  const clearAdvancedFilters = () => {
    const copyQuery = query;
    Object.keys(copyQuery).forEach(key => (copyQuery[key] = undefined));

    setState(copyQuery);
    setCashedQuery(copyQuery);
  };

  const setStateIntoQuery = () => {
    // Compare the cashed query string against the new state.
    const diffQuery = difference(cashedQuery, state);
    // Fire the filter_submitted event only if the user changes some parameter.
    diffQuery.length && track("filter_submitted", { changes: diffQuery });

    setQuery(
      {
        ...state,
        item_cost: JSON.stringify(state.item_cost) === JSON.stringify([0, 100]) ? undefined : state.item_cost,
        shipping_time: state.shipping_time === "any" ? undefined : state.shipping_time,
        shipping_under: state.shipping_under === "any" ? undefined : state.shipping_under
      },
      "pushIn"
    );
    scrollToTop();
  };

  return (
    <Modal clickOutside={() => setStateIntoQuery()}>
      <Header>
        <TopHeader>
          <span>{t("AdvancedFiltersModal.Title.Filters")}</span>
          <CloseModalIcon onClick={() => closeModal()}>
            <img src={iconClose} alt="close" />
          </CloseModalIcon>
        </TopHeader>
        <ActiveFilters
          style={{ marginTop: "16px" }}
          query={state}
          setQuery={updateState}
          clearAll={clearAdvancedFilters}
        />
      </Header>
      <Body>
        {/* START - Shipping Section */}
        <Section>
          <SectionTitle>{t("AdvancedFiltersModal.Title.Shipping")}</SectionTitle>
          <SectionContent>
            <ShippingFilters>
              {/* START - Ships from filters */}
              <SectionSubtitle>{t("AdvancedFiltersModal.Label.ShipsFrom")}</SectionSubtitle>
              <Select
                menuTitle={t("AdvancedFiltersModal.Select.MenuTitle.Countries")}
                value={getSelectedShipsFrom(state.ships_from)}
                options={shipsFromCountriesWithFlags}
                onChange={option =>
                  updateState({
                    ships_from: option !== null ? option.value : null
                  })
                }
                isClearable
                placeholder={t("AdvancedFiltersModal.Select.PlaceHolder.Countries")}
              />
              {/* END - Ships from filters */}

              {/* START - Popular filters */}
              <PopularFilters>
                <span>{t("AdvancedFiltersModal.Label.Popular")}</span>
                <Checkbox
                  checked={state.ships_from === "united-states"}
                  onChange={e =>
                    updateState({
                      ships_from: e.target.checked ? "united-states" : null
                    })
                  }
                >
                  <CountryFlag isoCountryCode="us" /> {t("AdvancedFiltersModal.Label.Country.UnitedStates")}
                </Checkbox>
                <Checkbox
                  checked={state.ships_from === "Europe"}
                  onChange={e =>
                    updateState({
                      ships_from: e.target.checked ? "Europe" : null
                    })
                  }
                >
                  <CountryFlag isoCountryCode="eu" /> {t("AdvancedFiltersModal.Label.Country.Europe")}
                </Checkbox>
              </PopularFilters>
              {/* END - Popular filters */}
            </ShippingFilters>

            <ShipsToFilters>
              <SectionSubtitle>{t("AdvancedFiltersModal.Label.ShipsTo")}</SectionSubtitle>
              <Select
                menuTitle="Countries"
                value={getSelectedShipsTo(state.ships_to)}
                options={allCountriesWithFlags}
                onChange={option => {
                  updateState({
                    ships_to: option !== null ? option.value : null,
                    shipping_time:
                      option !== null && option.value === "united-states" ? state.shipping_time : "any",
                    shipping_under:
                      option !== null && option.value === "united-states" ? state.shipping_under : "any"
                  });
                }}
                isClearable
                placeholder={t("AdvancedFiltersModal.Select.PlaceHolder.Countries")}
              />

              {/* START - Popular filters */}
              <PopularFilters>
                <span>{t("AdvancedFiltersModal.Label.Popular")}</span>
                <Checkbox
                  checked={state.ships_to === "united-states"}
                  onChange={e =>
                    updateState({
                      ships_to: e.target.checked ? "united-states" : null
                    })
                  }
                >
                  <CountryFlag isoCountryCode="us" /> {t("AdvancedFiltersModal.Label.Country.UnitedStates")}
                </Checkbox>
                <Checkbox
                  checked={state.ships_to === "Europe"}
                  onChange={e =>
                    updateState({
                      ships_to: e.target.checked ? "Europe" : null,
                      shipping_time: "any",
                      shipping_under: "any"
                    })
                  }
                >
                  <CountryFlag isoCountryCode="eu" /> {t("AdvancedFiltersModal.Label.Country.Europe")}
                </Checkbox>
              </PopularFilters>
              {/* END - Popular filters */}
            </ShipsToFilters>

            <ShippingTimeFilter>
              <SectionSubtitle>{t("AdvancedFiltersModal.Label.ShippingTime")}</SectionSubtitle>
              <SectionDescription>
                {t("AdvancedFiltersModal.Label.ShippingTimeDescription")}
              </SectionDescription>
              <RadioGroup
                name="shippingTimeFilter"
                selectedValue={state.shipping_time}
                onChange={value => updateState({ shipping_time: value })}
                disabled={state.ships_to !== "united-states"}
              >
                <Radio value="any">{t("AdvancedFiltersModal.RadioOption.ShippingTime.Any")}</Radio>
                <Radio value="1">{t("AdvancedFiltersModal.RadioOption.ShippingTime.One")}</Radio>
                <Radio value="4">{t("AdvancedFiltersModal.RadioOption.ShippingTime.Four")}</Radio>
                <Radio value="8">{t("AdvancedFiltersModal.RadioOption.ShippingTime.Eight")}</Radio>
                <Radio value="15">{t("AdvancedFiltersModal.RadioOption.ShippingTime.Fifteen")}</Radio>
              </RadioGroup>
            </ShippingTimeFilter>
          </SectionContent>
          {/* END -  Shipping Section */}
        </Section>
        <Section>
          <SectionTitle>{t("AdvancedFiltersModal.Title.ItemsCost")}</SectionTitle>
          <SectionContent>
            <ItemConstFilter>
              <SectionSubtitle style={{ marginBottom: "20px" }}>
                {t("AdvancedFiltersModal.Label.ItemCost")}
              </SectionSubtitle>

              <InputRange
                minLabel="$0+"
                maxLabel="$100+"
                min={0}
                max={100}
                values={state.item_cost === undefined ? [0, 100] : state.item_cost}
                onChange={values => updateState({ item_cost: values })}
              />
            </ItemConstFilter>
            <ShippingTimeFilter>
              <SectionSubtitle>
                {t("AdvancedFiltersModal.Label.ShippingCost")} <Badge>Beta</Badge>
              </SectionSubtitle>
              <SectionDescription>
                {t("AdvancedFiltersModal.Label.ShippingTimeDescription")}
              </SectionDescription>
              <RadioGroup
                name="shippingUnderFilter"
                selectedValue={state.shipping_under}
                onChange={value => updateState({ shipping_under: value })}
                disabled={state.ships_to !== "united-states"}
              >
                <Radio value="any">{t("AdvancedFiltersModal.RadioOption.ShippingCost.Any")}</Radio>
                <Radio value="0">{t("AdvancedFiltersModal.RadioOption.ShippingCost.Free")}</Radio>
                <Radio value="5">{t("AdvancedFiltersModal.RadioOption.ShippingCost.Five")}</Radio>
                <Radio value="15">{t("AdvancedFiltersModal.RadioOption.ShippingCost.Fifteen")}</Radio>
                <Radio value="25">{t("AdvancedFiltersModal.RadioOption.ShippingCost.TwentyFive")}</Radio>
              </RadioGroup>
            </ShippingTimeFilter>
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>{t("AdvancedFiltersModal.Title.Supplier")}</SectionTitle>
          <Flex>
            <AlignLeft>
              <Select
                menuTitle={t("AdvancedFiltersModal.Select.MenuTitle.Suppliers")}
                value={
                  state.supplier_name ? { value: state.supplier_name, label: state.supplier_name } : null
                }
                options={suppliersAliases}
                onChange={option =>
                  updateState({
                    supplier_name: option !== null ? option.value : null
                  })
                }
                formatGroupLabel={data => (
                  <Group>
                    <GroupLabel>{t(`AdvancedFiltersModal.Label.${data.label}`)}</GroupLabel>

                    {data.label !== "All Suppliers" && <GroupBadge>{data.options.length}</GroupBadge>}
                  </Group>
                )}
                isClearable
                placeholder={t("AdvancedFiltersModal.Select.PlaceHolder.Suppliers")}
              />
            </AlignLeft>
            <AlignRight>
              <Checkbox
                description={t("AdvancedFiltersModal.Label.TopSupplierDescription")}
                checked={state.supplier_verified}
                onChange={e =>
                  updateState({
                    supplier_verified: e.target.checked ? true : null
                  })
                }
              >
                <Emoji label="Diamond Emoji" symbol="💎" /> {t("AdvancedFiltersModal.Label.TopSupplier")}
                {/* <BadgePro>
                  <Emoji label="Crown Emoji" symbol="👑" />Pro Plan
                </BadgePro> */}
              </Checkbox>
              {/* <Checkbox
                description="Suppliers that provide personalized invoices"
                checked={state.branded_invoicing}
                onChange={e =>
                  updateState({
                    branded_invoicing: e.target.checked ? true : null
                  })
                }
              >
                <Emoji label="Paper" symbol="📃" /> Personalized invoices
                <BadgePro>
                  <Emoji label="Crown Emoji" symbol="👑" />Pro Plan
                </BadgePro>
              </Checkbox> */}
            </AlignRight>
          </Flex>
        </Section>
        <Section>
          <SectionTitle>{t("AdvancedFiltersModal.Title.Advanced")}</SectionTitle>
          <Flex>
            <AlignLeft>
              <Checkbox
                description={t("AdvancedFiltersModal.Checkbox.Label.PremiumProductsDescription")}
                checked={state.premium}
                onChange={e =>
                  updateState({
                    premium: e.target.checked ? true : null
                  })
                }
              >
                <img style={{ marginRight: "4px" }} src={crownPremium} alt="Crow" />
                {t("AdvancedFiltersModal.Checkbox.Label.PremiumProducts")}
              </Checkbox>
            </AlignLeft>
            <AlignRight>
              <Checkbox
                description={t("AdvancedFiltersModal.Checkbox.Label.BestSellerDescription")}
                checked={state.best_selling}
                onChange={e =>
                  updateState({
                    best_selling: e.target.checked ? true : null
                  })
                }
              >
                <Emoji label="Fire Emoji" symbol="🔥" /> {t("AdvancedFiltersModal.Checkbox.Label.BestSeller")}
                {/* <BadgePro>
                  <Emoji label="Crown Emoji" symbol="👑" />Pro Plan
                </BadgePro> */}
              </Checkbox>
            </AlignRight>
          </Flex>
        </Section>
      </Body>
      <Footer>
        <Button variant="text" onClick={() => closeModal()}>
          {t("AdvancedFiltersModal.Button.Cancel")}
        </Button>
        <Button
          variant="primaryBig"
          onClick={() => {
            setStateIntoQuery();
            closeModal();
          }}
        >
          {t("AdvancedFiltersModal.Button.ViewResults")}
        </Button>
      </Footer>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    suppliersAliases: state.supplier.aliases.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedFiltersModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/AdvancedFiltersModal.js