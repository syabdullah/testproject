// Libs
import React from "react";
import PropTypes from "prop-types";
// Components
import Filler from "./progressBar/Filler";

// Style
import "./ProgressBar.css";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="ProgressBar__container">
      <Filler percentage={percentage} />
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default ProgressBar;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/ProgressBar.js