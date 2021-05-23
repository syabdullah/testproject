import React from "react";
import ReactTooltip from "react-tooltip"; // https://github.com/wwayne/react-tooltip
import PropTypes from "prop-types";

// Style
import { Container } from "./Tooltip.style";

const Tooltip = ({ children, message, place, effect }) => {
  return (
    <Container>
      <div data-tip={message}>{children}</div>
      <ReactTooltip place={place} effect={effect} className="tooltip" data-offset={{ top: 10, left: 10 }} />
    </Container>
  );
};

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  place: PropTypes.string,
  effect: PropTypes.string
};

Tooltip.defaultProps = {
  place: "top",
  effect: "solid"
};

export default Tooltip;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Tooltip.js