// Libs
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Style
import "./Item.css";

const List = ({ completed, children, onClick, tooltip, disabled }) => {
  /**
   * Render Tooltip
   *
   * @returns {ReactElement} <a />
   */
  const renderTooltip = () => {
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip id="checklist-item-tooltip">{tooltip}</Tooltip>}>
        <span className="Item__list-tootip" />
      </OverlayTrigger>
    );
  };

  /**
   * Render list
   *
   * @returns {ReactElement} <a />
   */
  const renderList = () => {
    return (
      <div className="Item__container">
        <a
          className={`Item__link 
            ${completed ? "Item__link-completed" : ""} 
            ${disabled ? "Item__link-disabled" : ""}`}
          onClick={() => (completed ? null : onClick())}
        >
          <li className="Item__list" key={tooltip}>
            <div className="Item__list-wrap">
              {children} {renderTooltip()}
            </div>
          </li>
        </a>
      </div>
    );
  };

  return <Fragment>{completed ? <strike>{renderList()}</strike> : renderList()}</Fragment>;
};

List.prototype = {
  completed: PropTypes.bool,
  children: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

List.defaultProps = {
  completed: false
};

export default List;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/onboarding/checklist/Item.js