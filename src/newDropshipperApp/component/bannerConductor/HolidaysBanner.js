import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import moment from "moment-timezone";

// Actions
import { isAnnual } from "../../../actions/upgrade";
import { showModal } from "../../../actions/ui";

// Components
import Countdown from "../../../components/_Shared/Countdown/Countdown";
import StickyHolidaysBanner from "./holidaysBanner/StickyHolidaysBanner";

// Image

// Style
import "./HolidaysBanner.css";

const HolidaysBanner = ({ showPromotion, currentPromotionEndTime, isAnnual, showModal }) => {
  const [scrollY, setScrollY] = useState(0);

  const getPromotionEndTimeFormatted = () => {
    const date = moment.tz(currentPromotionEndTime, "America/Los_Angeles").format();

    return new Date(date).getTime();
  };

  useScrollPosition(({ currPos }) => {
    setScrollY(currPos.y);
  });

  return (
    showPromotion && (
      <Fragment>
        <div
          className="HolidaysBanner__container"
          onClick={() => {
            isAnnual(true);
            showModal("UPGRADE_MODAL");
          }}
        >
          <div className="HolidaysBanner__info">
            <span className="HolidaysBanner__tag">Last chance to invest in your growth</span>

            <span className="HolidaysBanner__countdown">
              Ends in
              <Countdown splitTime convertDayInHours endDate={getPromotionEndTimeFormatted()} />
            </span>
          </div>

          <div className="HolidaysBanner__title">
            <div className="HolidaysBanner__subtitle">
              <span>Happy New Year Sale</span>
              <span>Up to 60% off on all annual plans</span>
            </div>
          </div>
        </div>
        {scrollY < -180 && <StickyHolidaysBanner />}
      </Fragment>
    )
  );
};

HolidaysBanner.propTypes = {
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
)(HolidaysBanner);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/bannerConductor/HolidaysBanner.js