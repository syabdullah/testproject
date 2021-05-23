import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  width: 600px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #222939;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CloseModalIcon = styled.div`
  background-color: #f4f5f8;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    height: 12px;
    width: 12px;
    opacity: 0.5;
  }
`;

const Body = styled.div``;

const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
  right: 32px;
  @media (max-width: 375px) {
    top: 16px;
    right: 16px;
  }
  .ReactCountdownMoment__hours {
    display: none;
  }
  .ReactCountdownMoment__minutes {
    margin-right: 12px;
  }
  .ReactCountdownMoment__minutes,
  .ReactCountdownMoment__seconds {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    border-radius: 8px;
    background-color: #ffffff;
    padding: 8px;
    span:first-of-type {
      font-size: 26px;
      line-height: 0.92;
      color: #8144e5;
    }
    span:last-of-type {
      font-size: 12px;
      line-height: 1;
      color: #222939;
    }
  }
  .ReactCountdownMoment__splitted-time {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 510px) {
    .ReactCountdownMoment__splitted-time > div {
      margin: unset;
    }
    .ReactCountdownMoment__minutes {
      margin-right: 12px !important;
    }
  }
`;

const CountdownCreditCardModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .ReactCountdownMoment__hours {
    display: none;
  }
  .ReactCountdownMoment__minutes {
    margin-right: 12px;
  }
  .ReactCountdownMoment__minutes,
  .ReactCountdownMoment__seconds {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    border-radius: 8px;
    background-color: #ffffff;
    padding: 8px;
    span:first-of-type {
      font-size: 26px;
      line-height: 0.92;
      color: #8144e5;
    }
    span:last-of-type {
      font-size: 12px;
      line-height: 1;
      color: #222939;
    }
  }
  .ReactCountdownMoment__splitted-time {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CountdownTitleCreditCardModal = styled.div`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.14;
  color: #ffffff;
  margin-right: 8px;
`;

const CountdownTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.14;
  color: #ffffff;
  margin-right: 8px;
  .emoji {
    margin-right: 4px;
  }
`;

const Illustration = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

const Background = styled.img`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  position: relative;
  height: 290px;
  border-radius: 8px;
  object-position: left;
`;

const TagOffer = styled.img`
  right: 24px;
  bottom: 24px;
  position: absolute;
  @media (max-width: 375px) {
    right: 8px;
    bottom: 16px;
  }
`;

const Footer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  button:last-of-type {
    margin-top: 16px;
  }
`;

export {
  Container,
  Header,
  CloseModalIcon,
  Body,
  CountdownContainer,
  CountdownCreditCardModal,
  Illustration,
  Background,
  TagOffer,
  Footer,
  CountdownTitle,
  CountdownTitleCreditCardModal
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/AnnualPromotionModalStyle.js