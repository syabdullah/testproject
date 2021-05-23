import styled from "styled-components";

const BarContainer = styled.div`
  background-color: #311e76;
  padding: 11px;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: calc(100% - 200px);
  z-index: 10;
  bottom: 0;
  margin-left: -54px;
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  z-index: 900;

  button {
    white-space: nowrap;
  }

  .StickyPromotionBar__text {
    padding-left: 200px;
    margin-right: 40px;
  }

  @media (max-width: 1075px) {
    font-size: 17px;
  }

  @media (max-width: 850px) {
    font-size: 15px;

    .StickyPromotionBar__text {
      margin-right: 20px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PopupContainer = styled.div`
  background-color: #311e76;
  border-radius: 8px;
  box-shadow: 0 4px 40px 0 rgba(34, 41, 57, 0.25);
  padding: 16px;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  left: 224px;
  bottom: 24px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  z-index: 900;

  button {
    margin-top: 8px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    left: 24px;
  }

  @media (max-width: 600px) {
    left: 4px;
    font-size: 12px;
    bottom: 4px;
  }
`;

const PopupTextContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 7px;
  }

  p {
    margin-bottom: 0;
  }
`;

const CountdownTheme = styled.div`
  margin-right: 40px;

  .ReactCountdownMoment__splitted-time {
    display: flex;
    color: #7020ff;
    font-weight: 600;
    margin-left: 15px;
    background-color: #e9e6ff;
    border-radius: 4px;
    padding: 8px;
  }

  .ReactCountdownMoment__minutes:after {
    content: ":";
  }

  .ReactCountdownMoment__splitted-time > * span:nth-child(2) {
    display: none;
  }
`;

export { BarContainer, PopupContainer, PopupTextContainer, CountdownTheme };



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/onboarding/StickyPromotionBarStyle.js