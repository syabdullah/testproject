// Libs
import React from "react";
import PropTypes from "prop-types";

// Style
import "./Divider.css";

const Divider = ({ children }) => {
  return (
    <div className="Divider__container">
      <span>{children}</span>
    </div>
  );
};

Divider.propTypes = {
  children: PropTypes.any.isRequired
};

export default Divider;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Divider.js