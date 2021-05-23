import styled from "styled-components";

export const Images = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  img:not(:first-child) {
    margin: 0 4px;
  }
  img {
    height: 24px;
  }

  .premium-order {
    height: 18px;
  }
`;



// WEBPACK FOOTER //
// ./src/components/OrderList/Order/OrderLine/OrderLine.style.js