import styled from "styled-components";
import { Typography, Button } from "newDropshipperApp/spocketUI";
import { media } from "newDropshipperApp/utils/media";

const Container = styled.section`
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;

  & .dropdown {
    margin-top: 12px;
    box-shadow: 0px 4px 20px rgba(34, 41, 57, 0.15);
    border-radius: 8px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const CloseDrawerIcon = styled.button`
  background-color: #fff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const CloseDrawerImg = styled.img`
  height: 30px;
  width: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const Title = styled(Typography.H2)`
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: #6342ff;
  padding: 0;
`;

const Subtitle = styled(Typography.p)`
  font-size: 16px;
  line-height: 22px;
  color: #5a5a5a;
`;

const ClearButton = styled.button`
  position: absolute;
  top: 20px;
  right: 40px;
  border-width: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  margin-right: 4px;

  &:hover {
    background-color: #dce0ea;
  }
`;

const CloseIcon = styled.img`
  width: 8px;
  height: 8px;
`;

const Trigger = styled.div`
  background: #ffffff;
  border: 1px solid #ccd2e1;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: max-content;
  cursor: pointer;
  width: 100%;
`;

const TriggerText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #222939;
  margin-bottom: 0;
`;

const TriggerIcon = styled.img``;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: flex-end;

  ${media.PHONE`
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
  `};
`;

const FilterButton = styled(Button)`
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  width: 47%;
  padding: 8px;

  ${media.PHONE`
    width: 100%;
    margin-top: 10px;
  `};
`;

export {
  Container,
  TopContainer,
  CloseDrawerIcon,
  CloseDrawerImg,
  TitleContainer,
  Image,
  Title,
  Subtitle,
  ClearButton,
  CloseIcon,
  Trigger,
  TriggerIcon,
  TriggerText,
  DropdownContainer,
  ButtonsContainer,
  FilterButton
};



// WEBPACK FOOTER //
// ./src/components/Products/Filters/Filters.style.js