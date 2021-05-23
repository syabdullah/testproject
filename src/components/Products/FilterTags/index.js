import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Components
import ActiveFilter from "newDropshipperApp/pages/search/activeFilters/ActiveFilter";

// Data
import { statusFilters } from "newDropshipperApp/utils/staticData/productsPageFilters";

// Styles
const Container = styled.div`
  margin-top: 10px;
`;

const ActiveFilterTag = styled(ActiveFilter)`
  background-color: #fff;

  & strong {
    text-transform: none;
  }
`;

const FilterTags = ({ selectedFilter, setSelectedFilter }) => {
  const [activeFilter, setActiveFilter] = useState("");
  const { t } = useTranslation();

  useEffect(
    () => {
      const filteredActiveFilter = statusFilters().filter(option => option.id === selectedFilter)[0];
      setActiveFilter(filteredActiveFilter);
    },
    [selectedFilter, t]
  );

  if (!selectedFilter || !activeFilter || !activeFilter.text) return null;
  return (
    <Container>
      <ActiveFilterTag
        label={t("Products.Filters.Tag.InventoryStatus")}
        onClick={() => {
          setSelectedFilter("");
        }}
      >
        {activeFilter.text}
      </ActiveFilterTag>
    </Container>
  );
};

FilterTags.propTypes = {
  setSelectedFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string
};

export default FilterTags;



// WEBPACK FOOTER //
// ./src/components/Products/FilterTags/index.js