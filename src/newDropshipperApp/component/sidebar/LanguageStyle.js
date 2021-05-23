import styled from "styled-components";

const Container = styled.div`
  padding: 8px 4px 4px 8px;
  width: 100%;
`;

const SelectedLanguage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.71;
  letter-spacing: 0.2px;
  color: #6f7582;
  border-radius: 4px;
  padding: 4px 8px;

  :hover {
    background-color: #f4f5f8;
  }

  img:first-of-type {
    margin-right: 8px;
  }

  img {
    width: 14px;
    height: 14px;
  }
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: bold;
  line-height: 1.33;
  letter-spacing: 1px;
  color: #6f7582;
  margin-left: 8px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export { Container, SelectedLanguage, Title };



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/sidebar/LanguageStyle.js