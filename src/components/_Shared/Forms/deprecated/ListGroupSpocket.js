import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledUl = styled.ul`
  width: 100%;
  padding: 15px;
`;

const ListGroupSpocket = ({ children, bsClass, style }) => {
  return (
    <StyledUl style={style} className={bsClass}>
      {children}
    </StyledUl>
  );
};

ListGroupSpocket.propTypes = {
  bsClass: PropTypes.string,
  style: PropTypes.object
};

export { ListGroupSpocket };



// WEBPACK FOOTER //
// ./src/components/_Shared/Forms/deprecated/ListGroupSpocket.js