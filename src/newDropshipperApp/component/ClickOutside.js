import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useClickOutside(ref, onClick) {
  /**
   * Run the onClick props if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

/**
 * Component that runs the onClick props if you click outside of it
 */

function ClickOutside({ children, onClick }) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, onClick);

  return <div ref={wrapperRef}>{children}</div>;
}

ClickOutside.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ClickOutside;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/ClickOutside.js