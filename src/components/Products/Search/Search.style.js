import styled from "styled-components";
import { Button } from "newDropshipperApp/spocketUI";
import { media } from "newDropshipperApp/utils/media";

const Container = styled.section`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
  padding: 20px;

  ${media.PHONE`
    flex-direction: column;
  `};
`;

const InputContainer = styled.div`
  flex-grow: 1;
`;

const ProductButton = styled(Button)`
  min-width: 170px;
  height: 34px;
  align-self: flex-end;
  margin-left: 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;

  ${media.TABLET`
    min-width: 100px;
  `};

  ${media.PHONE`
    width: 100%;
    margin-top: 10px;
  `};
`;

export { Container, InputContainer, ProductButton };



// WEBPACK FOOTER //
// ./src/components/Products/Search/Search.style.js