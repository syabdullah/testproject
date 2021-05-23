import React from "react";
import styled from "styled-components";
import { CardComponent, CardNumber, CardExpiry, CardCVV } from "@chargebee/chargebee-js-react-wrapper";
import { ChargebeeCountrySelect } from "./ChargebeeCountrySelect";
import { ChargebeeSavedCardInfo } from "./ChargebeeSavedCardInfo";
import { default as Loadable } from "../../components/_Shared/commonLoadable";

const CHARGEBEE_STYLE = {
  base: {
    fontSize: "14px",
    "::placeholder": {
      color: "#999"
    }
  }
};

const FieldWrapper = styled.span.attrs({ className: "form-control" })`
  display: block;
  margin-bottom: 8px;
`;

const ChargebeeFieldWrapper = styled(FieldWrapper)`
  padding-top: 8px;
  ${props => props.invalid && `border-color: #d43f3a !important;`};
`;

const Input = styled.input.attrs({ className: "form-control" })`
  margin-bottom: 8px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, sans-serif;
  font-size: 14px;
  font-weight: 500;
  &.form-control:focus {
    background-color: #fafbfc !important;
  }
  ${props => props.invalid && `border-color: #d43f3a !important;`};
`;

const Row = styled.div`
  overflow: auto;
  ${FieldWrapper}, input, select {
    float: left;
    width: calc(50% - 4px);
    &:first-child {
      margin-right: 8px;
    }
  }
`;

export const ChargebeeCardInput = ({ card, isEditing, setIsEditing }) => {
  const createFieldProps = field => ({
    onChange: e => card.setFormField(field, e.target.value),
    value: card.form[field],
    invalid: card.invalidFields[field],
    onBlur: () => card.validateField(field)
  });
  const isInvalidField = field => {
    return card.invalidFields[field];
  };
  const onCardFieldStatusChange = status => {
    const isInvalid = !!status.error;
    card.setInvalidField(status.field, isInvalid);
  };
  const onCardFieldBlur = status => {
    if (status.empty) {
      card.setInvalidField(status.field, true);
    }
  };
  const hasCard = card.currentPaymentMethod !== null;
  if (hasCard && !isEditing) {
    return (
      <ChargebeeSavedCardInfo
        paymentMethod={card.currentPaymentMethod}
        onUpdateCardClick={() => setIsEditing(true)}
      />
    );
  }
  return (
    <CardComponent
      ref={card.ref}
      className="fieldset field"
      styles={CHARGEBEE_STYLE}
      onChange={status => onCardFieldStatusChange(status)}
    >
      <Loadable active={card.loading}>
        <Row>
          <Input placeholder="First Name" {...createFieldProps("first_name")} />
          <Input placeholder="Last Name" {...createFieldProps("last_name")} />
        </Row>
        <ChargebeeFieldWrapper invalid={isInvalidField("number")}>
          <CardNumber onBlur={onCardFieldBlur} />
        </ChargebeeFieldWrapper>
        <Row>
          <ChargebeeFieldWrapper invalid={isInvalidField("expiry")}>
            <CardExpiry onBlur={onCardFieldBlur} />
          </ChargebeeFieldWrapper>
          <ChargebeeFieldWrapper invalid={isInvalidField("cvv")}>
            <CardCVV onBlur={onCardFieldBlur} />
          </ChargebeeFieldWrapper>
        </Row>
        <Row>
          <Input placeholder="City" {...createFieldProps("city")} />
          <Input placeholder="Zip" {...createFieldProps("zip")} />
        </Row>
        <Row>
          <Input placeholder="State" {...createFieldProps("state")} />
          <ChargebeeCountrySelect {...createFieldProps("country")} />
        </Row>
      </Loadable>
    </CardComponent>
  );
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/ChargebeeCardInput.js