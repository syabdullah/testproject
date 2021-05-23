import React, { useState } from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import * as Sentry from "@sentry/browser";
import { connect } from "react-redux";
import { setAlertMessage } from "../../actions";
import { Button } from "../spocketUI";

// Components
import { Row, Col } from "react-bootstrap";
import { ChargebeeCardInput } from "./ChargebeeCardInput";

// Hooks & Utils
import { useTranslation } from "react-i18next";
import { useChargebeeCard } from "../../hooks/useChargebeeCard";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { useSpocketAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const ActionsBar = styled.div`
  clear: both;
  height: 40px;
`;

const ChargebeeCardManagementComp = ({ setAlertMessage }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const card = useChargebeeCard();
  const { track } = useSpocketAnalytics();
  const hasCard = card.currentPaymentMethod !== null;
  if (!hasCard && !isEditing) {
    return (
      <div>
        <Row>
          <Col md={12}>
            {/* TODO: use translation here */}
            <p className="panel-text">
              You have not added any credit card yet. Please add a credit card below to allow us to process
              your membership automatically
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button
              bsStyle="success"
              onClick={() => {
                setIsEditing(true);
                track("billing-no-credit-card__add-card--clicked");
              }}
            >
              {t("CreditCard.AddCreditCard.Button")}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ChargebeeCardInput
        card={card}
        isEditing={isEditing}
        setIsEditing={isEditing => {
          setIsEditing(isEditing);
          if (isEditing) {
            track("billing-existing-credit-card__update-card--clicked");
          }
        }}
      />
      {isEditing && (
        <ActionsBar>
          <Button
            className="pull-right btn btn-sm btn-success"
            onClick={() => {
              const saveClickEventName = hasCard
                ? "billing-existing-credit-card__save-card--clicked"
                : "billing-no-credit-card__save-card--clicked";
              track(saveClickEventName);
              card
                .createPaymentMethod()
                .then(() => card.refetch())
                .then(() => {
                  const eventName = hasCard
                    ? "billing-existing-credit-card-added"
                    : "billing-no-credit-card-added";
                  track(eventName);
                  setAlertMessage("Credit card saved successfully", "success");
                  setIsEditing(false);
                })
                .catch(e => {
                  const errMessage = formatErrorMessage(e);
                  Sentry.captureException(`Chargebee Card Error - ${errMessage}`);
                  const alertMessage =
                    e.message === "Invalid Form"
                      ? "Please make sure to correctly fill the fields and try again"
                      : "Internal error";
                  setAlertMessage(alertMessage, "error");
                });
            }}
          >
            {hasCard
              ? t("UpdateCreditCardModal.Button.UpdateCard")
              : t("UpdateCreditCardModal.Button.AddCreditCard")}
          </Button>
          <Button className="pull-right btn btn-sm btn-default" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </ActionsBar>
      )}
    </React.Fragment>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage }, dispatch);
}

export const ChargebeeCardManagement = connect(
  null,
  mapDispatchToProps
)(ChargebeeCardManagementComp);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/ChargebeeCardManagement.js