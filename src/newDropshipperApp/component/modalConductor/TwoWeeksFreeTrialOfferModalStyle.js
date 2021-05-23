import styled from "styled-components";

const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 20px;

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

export { CountdownContainer, CountdownTitle };



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/TwoWeeksFreeTrialOfferModalStyle.js