import styled from "styled-components";

export const Container = styled.div`
  font-family: Avenir, Nunito, sans-serif !important;

  & .tooltip {
    font-family: Avenir, Nunito, sans-serif !important;
    max-width: 210px;
    padding: 8px;
    background-color: #222939;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 16px;
    color: #ffffff;
    animation: fadein 0.2s ease-in;

    &.place-top {
      margin-top: 0px;

      &:after {
        border-left: transparent;
        border-right: transparent;
      }
    }

    @media (max-width: 768px) {
      max-width: 150px;
      padding: 6px;
      font-size: 10px;
      line-height: 14px;
    }

    @keyframes fadein {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 0.75;
      }
    }
  }
`;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Tooltip.style.js