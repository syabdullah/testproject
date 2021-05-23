// Libs
import React from "react";
import PropTypes from "prop-types";

// Components
import Item from "./checklist/Item";

const Checklist = ({ children }) => {
  return <ol className="Checklist__container">{children}</ol>;
};

Checklist.Item = Item;

Checklist.prototype = {
  children: PropTypes.Item,
  item: PropTypes.string.isRequired
};

Checklist.defaultProps = {
  completed: false
};

export default Checklist;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/onboarding/Checklist.js