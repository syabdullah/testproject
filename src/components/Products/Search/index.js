import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FormControl, ControlLabel } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Hooks
import useKeyPress from "newDropshipperApp/utils/hooks/useKeyPress";

// Style
import { Container, InputContainer, ProductButton } from "./Search.style";

function Search(props) {
  const { displayHeader, searchText, onSearchTextInputChange, onSearchSubmit, openFilters } = props;
  const { t } = useTranslation();
  // Checked if user pressed Enter key (keyCode: 13)
  const pressedEnter = useKeyPress(13, "keyCode");

  useEffect(
    () => {
      if (pressedEnter) onSearchSubmit(searchText);
    },
    [pressedEnter]
  );

  if (!displayHeader) return null;
  return (
    <Container>
      <InputContainer>
        <ControlLabel>{t("Products.Search.Label")}</ControlLabel>
        <FormControl
          type="text"
          placeholder={t("Products.Search.Placeholder")}
          value={searchText}
          onChange={e => onSearchTextInputChange(e.target.value)}
        />
      </InputContainer>
      <ProductButton variant="brand" onClick={onSearchSubmit}>
        {t("Products.Search.Button")}
      </ProductButton>
      <ProductButton variant="basic" onClick={() => openFilters(true)}>
        {t("Products.Search.Filter.Button")}
      </ProductButton>
    </Container>
  );
}

Search.propTypes = {
  displayHeader: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  onSearchTextInputChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  openFilters: PropTypes.func.isRequired
};

Search.defaultProps = {
  searchText: ""
};

export default Search;



// WEBPACK FOOTER //
// ./src/components/Products/Search/index.js