import styled from "styled-components";

const SideBarContainer = styled.div`
  height: 100%;

  .side-bar__logo {
    position: ${props => (props.sticky ? "fixed" : "unset")};
  }

  .side-bar__container {
    position: ${props => (props.sticky ? "fixed" : "unset")};
    top: 60px;
    height: 100vh;

    @media (max-width: 768px) {
      position: ${props => (props.sticky ? "fixed" : "absolute")};
    }
  }

  .side-bar__list {
    position: ${props => (props.sticky ? "fixed" : "unset")};
  }
`;

export { SideBarContainer };



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/SideBarStyle.js