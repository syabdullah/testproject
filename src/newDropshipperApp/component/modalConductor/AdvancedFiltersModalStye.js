import styled from "styled-components";

const Header = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(34, 41, 57, 0.1);
  background-color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  color: #222939;
  height: 100%;
  width: 700px;
  padding: 16px 24px;
  margin: -24px;
  text-align: left;
  margin-bottom: 16px;
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;

  @media (max-width: 768px) {
    width: calc(100% + 48px);
  }
`;

const Body = styled.div`
  height: 430px;
  width: 700px;
  overflow-y: auto;
  margin: -16px -24px;
  padding: 24px;

  > * {
    margin-bottom: 16px;
  }

  div:last-child {
    margin-bottom: unset;
  }

  @media (max-width: 768px) {
    width: calc(100% + 48px);
  }
`;

const Section = styled.div`
  border-radius: 4px;
  border: solid 1px #e6e8f0;
  text-align: left;
  padding: 16px;

  .emoji {
    margin-right: 4px;
  }
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  color: #222939;
  text-align: left;
  margin-bottom: 21px;
`;

const SectionSubtitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.14;
  color: #222939;
  text-align: left;
  margin-bottom: 8px;
`;

const SectionContent = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ShippingFilters = styled.div`
  width: 100%;
  padding-right: 10px;
  border-right: solid 1px #e6e8f0;
  margin-right: 12px;

  @media (max-width: 768px) {
    padding-right: unset;
    border-right: unset;
    margin-right: unset;
    > * {
      margin: 8px 0px !important;
    }
  }
`;

const ShippingTimeFilter = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    margin: 16px 0px;
  }
`;

const AlignLeft = styled.div`
  min-width: 180px;
  width: 40%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const AlignRight = styled.div`
  width: 45%;
  img {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const PopularFilters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 16px;

  > span {
    font-size: 10px;
    font-weight: bold;
    line-height: 1.6;
    letter-spacing: 1px;
    color: #9da5b8;
    text-transform: uppercase;
    text-align: left;
    display: flex;
    align-items: center;
  }
  img {
    width: 16px;
    height: 11px;
    border-radius: 2px;
    margin-right: 4px;
  }
`;

const ShipsToFilters = styled.div`
  width: 100%;
  margin-right: 48px;
`;

const TimeFilters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 180px;
  margin-left: 28px;
`;

const ItemConstFilter = styled.div`
  margin-right: 97px;
`;

const Footer = styled(Header)`
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  margin-bottom: -24px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  box-shadow: 0 0 8px 2px rgba(34, 41, 57, 0.1);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const GroupLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  line-height: 1.33;
  letter-spacing: 1px;
  color: #8144e5;
`;

const GroupBadge = styled(GroupLabel)`
  border-radius: 12px;
  background-color: #f6f5ff;
  padding: 4px 8px;
  margin-left: 4px;
`;

const Badge = styled.span`
  font-size: 12px;
  font-weight: bold;
  line-height: 1.33;
  color: #8144e5;
  border-radius: 4px;
  background-color: #f6f5ff;
  padding: 2px 4px;
  margin-left: 4px;
`;

const BadgePro = styled(Badge)`
  color: #222939;
  background-color: #e6e8f0;
  margin-left: 8px;

  .emoji {
    margin-right: 4px;
  }
`;

const SectionDescription = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  color: #6f7582;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    > * {
      margin: 8px 0px !important;
    }
  }
`;

const TopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

export {
  Header,
  Body,
  Section,
  SectionTitle,
  SectionContent,
  SectionSubtitle,
  Footer,
  ShippingFilters,
  ShipsToFilters,
  TimeFilters,
  PopularFilters,
  ItemConstFilter,
  AlignLeft,
  AlignRight,
  Group,
  GroupBadge,
  GroupLabel,
  ShippingTimeFilter,
  Badge,
  SectionDescription,
  BadgePro,
  Flex,
  TopHeader,
  CloseModalIcon
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/AdvancedFiltersModalStye.js