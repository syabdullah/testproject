import React from "react";
import PropTypes from "prop-types";

import "./Container.css";

const themes = {
  regular: "Container__regular",
  dropShadow: "Container__drop_shadow"
};

const Container = ({ children, style, theme, onClick, alignItems }) => {
  return (
    <div
      style={{
        ...style,
        cursor: onClick ? "pointer" : "default",
        alignItems: alignItems
      }}
      theme={theme}
      className={themes[theme]}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  alignItems: PropTypes.string
};

Container.defaultProps = {
  theme: "regular"
};

export default Container;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Container.js