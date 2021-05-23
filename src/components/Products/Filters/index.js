import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// Components
import { Dropdown } from "newDropshipperApp/spocketUI";

// Data
import { statusFilters } from "newDropshipperApp/utils/staticData/productsPageFilters";

// Style
import {
  Container,
  TopContainer,
  CloseDrawerIcon,
  CloseDrawerImg,
  TitleContainer,
  Image,
  Title,
  Subtitle,
  ClearButton,
  CloseIcon,
  Trigger,
  TriggerIcon,
  TriggerText,
  DropdownContainer,
  ButtonsContainer,
  FilterButton
} from "./Filters.style";

// Assets
import iconFilter from "assets/filter_icon_purple.svg";
import iconExpand from "newDropshipperApp/images/icon-expand.svg";
import iconClose from "newDropshipperApp/spocketUI/components/select/images/icon-close.svg";
import iconCheckMark from "newDropshipperApp/images/icon-check-grey.svg";
import drawerClose from "assets/purple-close-icon.svg";

function Filters({ setSelectedFilter, selectedFilter, setDrawerOpen }) {
  const [inventoryFilter, setInventoryFilter] = useState(selectedFilter);
  const { t } = useTranslation();

  useEffect(
    () => {
      setInventoryFilter(selectedFilter);
    },
    [selectedFilter]
  );

  const getDropdownText = () => {
    const option = statusFilters().filter(option => option.id === inventoryFilter)[0];
    return (option && option.text) || t("Products.Filters.Option.Default");
  };

  const renderDropdownOptions = () => {
    return statusFilters().map(option => {
      const isSelected = inventoryFilter === option.id;
      return (
        <Dropdown.Item checked={isSelected} onClick={() => setInventoryFilter(option.id)} key={option.id}>
          <DropdownContainer>
            {option.text}
            {isSelected && <img src={iconCheckMark} alt="checkmark" />}
          </DropdownContainer>
        </Dropdown.Item>
      );
    });
  };
  return (
    <Container>
      <TopContainer>
        <TitleContainer>
          <Image src={iconFilter} alt="Filters image" />
          <Title>{t("Products.Filters.Title")}</Title>
        </TitleContainer>
        <CloseDrawerIcon onClick={() => setDrawerOpen(false)}>
          <CloseDrawerImg src={drawerClose} alt="Close drawer" />
        </CloseDrawerIcon>
      </TopContainer>
      <Subtitle>{t("Products.Filters.Subtitle")}</Subtitle>
      <Dropdown position="right">
        {/* Only show clear button if there is an option selected */}
        {inventoryFilter && (
          <ClearButton onClick={() => setInventoryFilter("")}>
            <CloseIcon src={iconClose} alt="Clear icon" />
          </ClearButton>
        )}
        <Dropdown.Trigger>
          <Trigger>
            <TriggerText>{getDropdownText()}</TriggerText>
            <TriggerIcon src={iconExpand} alt="expand" />
          </Trigger>
        </Dropdown.Trigger>
        <Dropdown.Content minWidth="fill-available">{renderDropdownOptions()}</Dropdown.Content>
      </Dropdown>
      <ButtonsContainer>
        <FilterButton
          variant="basic"
          title={t("Products.Filters.Button.Title.Reset")}
          onClick={() => {
            setDrawerOpen(false);
            setTimeout(() => {
              setInventoryFilter("");
              setSelectedFilter("");
            }, 500);
          }}
        >
          {t("Products.Filters.Button.Reset")}
        </FilterButton>
        <FilterButton
          variant="brand"
          title={t("Products.Filters.Button.Title.Apply")}
          onClick={() => {
            setSelectedFilter(inventoryFilter);
            setDrawerOpen(false);
          }}
        >
          {t("Products.Filters.Button.Apply")}
        </FilterButton>
      </ButtonsContainer>
    </Container>
  );
}

Filters.propTypes = {
  setSelectedFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string,
  setDrawerOpen: PropTypes.func.isRequired
};

export default Filters;



// WEBPACK FOOTER //
// ./src/components/Products/Filters/index.js