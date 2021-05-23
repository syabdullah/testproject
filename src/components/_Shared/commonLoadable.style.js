import styled from "styled-components";

export const Container = styled.div`
  position: sticky !important;
  width: 100%;
`;

export const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  min-width: 100px;
  top: 0px;
  left: 0px;
  background: ${props => props.bgColor || "rgba(244,245,248,0.75)"};
  color: rgba(1, 1, 1, 0.75);
  transition: opacity 10ms ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 50;
`;

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;

  @keyframes bounce {
    to {
      opacity: 0.3;
      transform: translate3d(0, -1rem, 0);
    }
  }
`;

export const Circle = styled.div`
  width: ${props => props.spinnerSize || "1rem"};
  height: ${props => props.spinnerSize || "1rem"};
  margin: 2rem 0.3rem;
  background: #8144e5;
  border-radius: 50%;
  animation: 0.9s bounce infinite alternate;
`;

export const Circle1 = styled(Circle)``;

export const Circle2 = styled(Circle)`
  animation-delay: 0.3s;
`;

export const Circle3 = styled(Circle)`
  animation-delay: 0.6s;
`;

export const Text = styled.p`
  text-align: center;
  font-size: 1.2em;
  margin: 5px;
`;



// WEBPACK FOOTER //
// ./src/components/_Shared/commonLoadable.style.js