// Libs
import React from "react";
import PropTypes from "prop-types";

// Style
import "./Filler.css";

const Filler = ({ percentage }) => {
  return <div className="Filler__container" style={{ width: `${percentage}%` }} />;
};

Filler.propTypes = {
  percentage: PropTypes.string.isRequired
};

export default Filler;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/progressBar/Filler.js