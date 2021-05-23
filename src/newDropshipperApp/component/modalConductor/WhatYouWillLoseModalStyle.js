import styled from "styled-components";
import iconBg from "../../images/icon-bg.svg";

const Header = styled.div`
  font-weight: bold;
  letter-spacing: normal;
  color: #222939;
`;

const IconBg = styled.div`
  background: url(${iconBg});
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 8px;
`;

const Section = styled.div`
  border-radius: 8px;
  background-color: #f4f5f8;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
  flex-direction: column;
  cursor: ${props => (props.cursorPointer ? "pointer" : "default")};
`;

const CardsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
`;

const Card = styled.div`
  width: 120px;
  height: 160px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(89, 88, 121, 0.12);
  background-color: #ffffff;
  overflow: hidden;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
`;

const CardTitle = styled.div`
  font-size: 10px;
  font-weight: bold;
  line-height: 1.2;
  color: #222939;
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 6px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.09;
  color: #222939;
  margin-left: 16px;

  span {
    color: #8144e5;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #6f7582;
  margin-left: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Tag = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.09;
  color: #8144e5;
  background-color: #e9e6ff;
  padding: 4px 8px;
  display: table;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const WrapButton = styled.div`
  width: 100%;
  text-align: right;
`;

const PremiumTag = styled.div`
  height: 20px;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10.2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #fff;
  font-size: 7.7px;
  font-weight: 500;
  color: #222939;
  padding: 6px;
  position: relative;
  position: absolute;
  left: 8px;
  cursor: default;
  top: 90px;

  img {
    height: 10px;
    width: auto;
    margin-right: 3px;
  }
`;

const BestSellerIcon = styled(PremiumTag)`
  right: 8px;
  left: unset;

  img {
    margin-right: unset;
  }
`;

const SkeletonImage = styled.div`
  width: 120px;
  height: 120px;
  background: #ccd2e1;
  position: relative;

  div {
    position: absolute;

    font-size: 12px;
    font-weight: bold;
    color: #222939;
    padding: 8px 14px;
    width: fit-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 200px;
    background: white;
  }
`;

export {
  Tag,
  Card,
  Wrap,
  Title,
  Header,
  IconBg,
  Section,
  Subtitle,
  WrapButton,
  CardsWrap,
  CardTitle,
  PremiumTag,
  BestSellerIcon,
  SkeletonImage
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/WhatYouWillLoseModalStyle.js