import React from "react";
import styled from "styled-components";

// Icons
import americanExpressIcon from "../images/cardBrands/american_express.svg";
import dinersClubIcon from "../images/cardBrands/diners_club.svg";
import discoverIcon from "../images/cardBrands/discover.svg";
import jcbIcon from "../images/cardBrands/jcb.svg";
import mastercardIcon from "../images/cardBrands/mastercard.svg";
import visaIcon from "../images/cardBrands/visa.svg";
import defaultIcon from "../images/cardBrands/default.svg";

const CARD_BRAND_INFO = {
  american_express: {
    icon: americanExpressIcon,
    label: "American Express"
  },
  diners_club: {
    icon: dinersClubIcon,
    label: "Diners Club"
  },
  discover: {
    icon: discoverIcon,
    label: "Discover"
  },
  jcb: {
    icon: jcbIcon,
    label: "JCB"
  },
  mastercard: {
    icon: mastercardIcon,
    label: "Master"
  },
  visa: {
    icon: visaIcon,
    label: "Visa"
  },
  default: {
    icon: defaultIcon,
    label: "Credit Card"
  }
};

const Wrapper = styled.div`
  padding: 8px;
  border-radius: 2px;
  background-color: #fafbfc;
  border: 1px #d9d9d9 solid;
`;

const CardBrandImg = styled.img`
  height: 20px;
`;

const CardLast4 = styled.span`
  margin-left: 8px;
  line-height: 20px;
  vertical-align: middle;
`;

const ChangeLink = styled.a`
  float: right;
  line-height: 20px;
  cursor: pointer;
  &,
  &:hover {
    text-decoration: none;
  }
`;

export const ChargebeeSavedCardInfo = ({ paymentMethod, onUpdateCardClick }) => {
  if (!paymentMethod) {
    return null;
  }
  const cardBrandInfo = CARD_BRAND_INFO[paymentMethod.brand] || CARD_BRAND_INFO.default;
  return (
    <Wrapper>
      <CardBrandImg src={cardBrandInfo.icon} />
      <CardLast4>
        {cardBrandInfo.label} Ending in {paymentMethod.last4}
      </CardLast4>
      <ChangeLink onClick={() => onUpdateCardClick()}>Update Card</ChangeLink>
    </Wrapper>
  );
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/ChargebeeSavedCardInfo.js