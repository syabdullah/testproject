// Libs
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment-timezone";

// Actions
import { isAnnual } from "../../../../actions/upgrade";
import { showModal } from "../../../../actions/ui";

// Components
import Countdown from "../../../../components/_Shared/Countdown/Countdown";

// Style
import "./StickyHolidaysBanner.css";

const StickyHolidaysBanner = ({ showPromotion, currentPromotionEndTime, isAnnual, showModal }) => {
  const getPromotionEndTimeFormated = () => {
    const date = moment.tz(currentPromotionEndTime, "America/Los_Angeles").format();
    return new Date(date).getTime();
  };

  return (
    showPromotion && (
      <Fragment>
        <div
          className="StickyHolidaysBanner__container"
          onClick={() => {
            isAnnual(true);
            showModal("UPGRADE_MODAL");
          }}
        >
          <span className="StickyHolidaysBanner__countdown">
            <Countdown splitTime convertDayInHours endDate={getPromotionEndTimeFormated()} />
          </span>
          <div className="StickyHolidaysBanner__title">
            Happy New Year Sale
            <div className="StickyHolidaysBanner__subtitle">Up to 60% off on all annual plans</div>
          </div>

          <button
            onClick={() => {
              isAnnual(true);
              showModal("UPGRADE_MODAL");
            }}
          >
            Upgrade NOW & save
          </button>
        </div>
      </Fragment>
    )
  );
};

StickyHolidaysBanner.propTypes = {
  currentPromotionEndTime: PropTypes.string.isRequired,
  isAnnual: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    showPromotion: state.settings.dropshipperData.show_promotion,
    currentPromotionEndTime: state.settings.dropshipperData.current_promotion_end_time
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isAnnual, showModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyHolidaysBanner);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/bannerConductor/holidaysBanner/StickyHolidaysBanner.js