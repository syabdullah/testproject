import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Modal } from "newDropshipperApp/spocketUI";
import warningIcon from "../../../assets/warning-icon.svg";

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #2e3039;
  margin-bottom: 16px;
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    margin-right: 8px;
  }
`;

const Error = styled.h1`
  color: #770d0d;
  padding: 4px 8px;
  border-radius: 4px;
  border: solid 1px #e24444;
  font-size: 12px;
  margin-bottom: 8px;
`;

const AlibabaOrderErrors = ({ dataModal: { alibabaErrors } }) => {
  return (
    // waiting for the right modal design
    <Modal>
      <Title>
        <img src={warningIcon} alt="warning" />
        Alibaba Order Errors
      </Title>

      {alibabaErrors.map(error => {
        return <Error> {error}</Error>;
      })}
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    dataModal: state.ui.data
  };
}

export default connect(mapStateToProps)(AlibabaOrderErrors);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/AlibabaOrderErrors.js