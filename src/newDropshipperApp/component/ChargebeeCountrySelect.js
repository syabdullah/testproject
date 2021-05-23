import React from "react";
import { COUNTRIES } from "../../consts/chargebeeCountries";
import styled from "styled-components";

const Select = styled.select.attrs({ className: "form-control" })`
  margin-bottom: 8px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, sans-serif;
  &.form-control:focus {
    background-color: #fafbfc !important;
  }
  ${props => props.invalid && `border-color: #d43f3a !important;`};
`;

export const ChargebeeCountrySelect = ({ value, onChange, className, invalid, onBlur }) => {
  return (
    <Select className={className} value={value} onChange={onChange} onBlur={onBlur} invalid={invalid}>
      <option disabled selected value="">
        Select a Country
      </option>
      {COUNTRIES.map(c => (
        <option key={c.code} value={c.code}>
          {c.name}
        </option>
      ))}
    </Select>
  );
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/ChargebeeCountrySelect.js