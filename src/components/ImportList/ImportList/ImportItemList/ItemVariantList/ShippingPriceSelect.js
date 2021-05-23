import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const SelectHeader = styled.div`
  display: flex;
  span {
    margin-right: 5px;
  }
`;

const selectStyles = {
  control: () => ({
    width: 200,
    borderWidth: 0,
    cursor: "pointer"
  }),
  placeholder: () => ({
    color: "#000000de"
  }),
  menu: styles => ({
    ...styles,
    "@media only screen and (max-width: 768px)": {
      position: "relative"
    }
  }),
  valueContainer: () => ({
    padding: 0,
    display: "flex",
    alignItems: "flex-end"
  }),
  option: () => ({
    padding: "5px 15px"
  })
};

const StyledOption = styled.div`
  display: flex;
  cursor: pointer;
  span:first-child {
    margin-right: 10px;
  }
  :hover {
    color: #8144e5;
  }
`;

const renderOption = props => {
  const {
    handleClick,
    toggleShippingModal,
    t,
    data: { flag, label, value }
  } =
    props || {};

  // render flag + country lines, or a button at the bottom to show shipping details modal
  return (
    <components.Option {...props} style={{ padding: 0, margin: 0 }}>
      {flag ? (
        <StyledOption onClick={() => handleClick({ shippingPriceCountry: value })}>
          {flag} {label}
        </StyledOption>
      ) : (
        <StyledOption onClick={() => toggleShippingModal()}>
          {t("ImportListItem.Variants.ShowShippingPrices")}
        </StyledOption>
      )}
    </components.Option>
  );
};

const renderFlag = country => <span className={`flag-icon flag-icon-${country.toLowerCase()}`} />;

const ShippingPriceSelect = props => {
  const { shipping_countries, toggleShippingModal, handleClick, getSelectedShippingCountry } = props;
  const { t } = useTranslation();

  const renderHeader = () => (
    <SelectHeader>
      <span>{t("ItemVariantList.VariantsTable.ShippingPrice")}</span>
      {renderFlag(getSelectedShippingCountry().country)} ▾
    </SelectHeader>
  );

  const options = shipping_countries.map(shippingCountry => {
    // both label and value props are required for react-select to properly highlighted selected item on the list
    return {
      label: shippingCountry.country,
      value: shippingCountry.country,
      flag: renderFlag(shippingCountry.country)
    };
  });

  // add empty item that will be converted to a button with toggleShippingModal click handler
  options[options.length] = {}; // no 'flag' prop for this entry

  return (
    <Select
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
        SingleValue: renderHeader,
        Option: props =>
          renderOption({
            t,
            handleClick: prop => handleClick(prop),
            toggleShippingModal,
            ...props
          })
      }}
      styles={selectStyles}
      placeholder={renderHeader()}
      options={options}
      isSearchable={false}
      openOnFocus={true}
      autofocus={true}
    />
  );
};

ShippingPriceSelect.propTypes = {
  shipping_countries: PropTypes.object.isRequired,
  toggleShippingModal: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  getSelectedShippingCountry: PropTypes.func.isRequired
};

export { ShippingPriceSelect };



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemVariantList/ShippingPriceSelect.js