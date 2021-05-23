import styled from "styled-components";
import { Typography } from "newDropshipperApp/spocketUI";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 32px;
  min-width: 540px;

  section:first-of-type {
    margin-right: 16px;
  }

  .supplier-link {
    color: #8144e5;
    cursor: pointer;

    :hover {
      color: #8144e5;
    }
  }

  @media (max-width: 1200px) {
    align-items: center;
    flex-direction: column;
    padding: 0 32px;

    section:first-of-type {
      margin-right: unset;
      margin-bottom: 16px;
    }

    section:last-of-type {
      width: 480px;
    }
  }

  @media (max-width: 544px) {
    min-width: 90%;
    padding: 0;

    section {
      width: 100%;
    }
    section:last-of-type {
      width: 100%;
    }
  }
`;

const Section = styled.section`
  padding: 24px;
  background-color: #fff;
  border-radius: ${props => (props.isInsideModal ? "8px" : "0")};
  box-shadow: ${props => (props.isInsideModal ? "0 4px 20px 0 rgba(34, 41, 57, 0.15)" : "none")};
`;

const LeftSection = styled(Section)`
  width: 480px;
  max-width: 100%;
  text-align: left;
  overflow: hidden;

  h3 {
    margin-top: 16px;
  }
`;

const ProductDescription = styled(Typography.p)`
  overflow: hidden;
  max-width: 100%;

  * {
    max-width: 100%;
  }
`;

const RightSection = styled(Section)`
  max-width: 100%;
  width: 380px;
  text-align: left;
`;

const ProductButton = styled.div`
  margin-bottom: 16px;
  button {
    width: 100%;
    margin-bottom: 4px;
  }
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 32px;
  right: -16px;
  background-color: #cdd0d4;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  img {
    height: 12px;
    width: 12px;
    opacity: 0.5;
  }
  @media (max-width: 1034px) {
    right: 0;
  }
`;

const ShippingTime = styled.div`
  &::last-child {
    margin-bottom: 4px;
  }
`;

const TooltipIcon = styled.img`
  margin: ${props => (props.marginRight ? "0 4px 0 0" : "0 0 0 4px")};
`;

export {
  Container,
  TooltipIcon,
  LeftSection,
  ProductDescription,
  ShippingTime,
  RightSection,
  ProductButton,
  CloseIcon
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Product/ListingDetails.style.js