import styled from "styled-components";

export const Bubble = styled.div`
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 1px rgba(0, 0, 0, 0.2);
  height: 18px;
  margin-left: 8px;
  margin-top: -1px;
  padding: 0 6px;
  border: ${props => (props.isActive ? "1px solid #8144e5" : "1px solid rgba(73, 69, 99, 0.7)")};
  background-color: ${props => (props.isActive ? "#8144e5" : "transparent")};
`;

export const BubbleText = styled.p`
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  text-shadow: 0 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 0;
  color: ${props => (props.isActive ? "#fff" : "rgba(73, 69, 99, 0.7)")};
`;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/sidebar/ItemsCount.style.js