import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Contexts
import { UserContext } from "contexts/UserContext";

// Utils
import { truncateNumber } from "utils/";

// Style
import * as S from "./ItemsCount.style";

function ItemsCount(props) {
  // const { option, isActive, fixedNumber } = props; // * THESE WILL BE USED WHEN CONTEXT IS 100% IN USE
  const { isActive, fixedNumber } = props;
  const { importedListings, pushedListings } = useContext(UserContext);
  const [currentNumber, setCurrentNumber] = useState(fixedNumber);

  // Update component if fixedNumber changes
  useEffect(
    () => {
      setCurrentNumber(fixedNumber);
    },
    [importedListings, pushedListings, fixedNumber]
  );

  // If parent sent number (fixedNumber) return truncateNumber of this number
  // Else return truncateNumber length of context[option] (ex: option = pushedListings) // * THESE WILL BE USED WHEN CONTEXT IS 100% IN USE
  const countIsValid = () => {
    const number = currentNumber;
    if (number !== undefined && number !== null && number > 0) return truncateNumber(number);
  };

  if (!countIsValid()) return null;
  return (
    <S.Bubble isActive={isActive}>
      <S.BubbleText data-cy="count-bubble" isActive={isActive}>
        {countIsValid()}
      </S.BubbleText>
    </S.Bubble>
  );
}

ItemsCount.propTypes = {
  option: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  fixedNumber: PropTypes.number
};

export default ItemsCount;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/sidebar/ItemsCount.js