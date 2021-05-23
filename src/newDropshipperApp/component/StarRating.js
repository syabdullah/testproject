import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import tooltipIcon from "../../assets/tooltip.svg";
import "./StarRating.css";

const StarRating = ({ value, tooltip }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={tooltip ? <Tooltip id="fees-tooltip">{tooltip}</Tooltip> : <span />}
    >
      <div className="star-ratings__container">
        <div className="star-ratings">
          <div className="fill-ratings" style={{ width: value + "%" }}>
            <span>★★★★★</span>
          </div>
          <div className="empty-ratings">
            <span>★★★★★</span>
          </div>
        </div>
        {tooltip && (
          <div className="star-ratings__tooltip">
            <img src={tooltipIcon} alt="tooltip" />
          </div>
        )}
      </div>
    </OverlayTrigger>
  );
};

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  tooltip: PropTypes.string
};

export default StarRating;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/StarRating.js