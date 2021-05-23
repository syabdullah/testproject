// Libs
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// Components
import { Modal, Button } from "newDropshipperApp/spocketUI";
// Utils
import { openLink } from "newDropshipperApp/utils/openLink";

const Td = styled.td`
  text-align: left;
`;

const Title = styled.h4`
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

const TipText = styled.div`
  padding-bottom: 24px;
`;

const AlibabaOrderDetails = ({ dataModal: { orders } }) => {
  const { t } = useTranslation();
  const status = {
    pay_failed: "Failed",
    paying: "Pending",
    paid: "Completed",
    shipped: "Shipped",
    waiting_payment: "Waiting Payment"
  };
  return (
    // waiting for the right modal design
    <Modal>
      <Title>{t("AlibabaOrderDetails.Title")}</Title>
      <TipText>{t("AlibabaOrderDetails.Subtitle")}</TipText>
      <table className="table">
        <thead>
          <tr>
            <th>{t("AlibabaOrderDetails.TableHeader.OrderId")}</th>
            <th>{t("AlibabaOrderDetails.TableHeader.Status")}</th>
            <th>{t("AlibabaOrderDetails.TableHeader.Action")}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            return (
              <tr>
                <Td>{order.id}</Td>
                <Td>{status[order.status]}</Td>
                <Td>
                  <Button variant="brand" onClick={() => openLink(order.payment_url)}>
                    {t("AlibabaOrderDetails.Button.OpenOrder")}
                  </Button>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    dataModal: state.ui.data
  };
}

export default connect(mapStateToProps)(AlibabaOrderDetails);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/AlibabaOrderDetails.js