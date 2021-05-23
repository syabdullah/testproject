import React from "react";
import PropTypes from "prop-types";

export const Emoji = ({ label, symbol }) => (
  <span className="emoji" role="img" aria-label={label} aria-hidden="true">
    {symbol}
  </span>
);

Emoji.propTypes = {
  label: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Emoji.js