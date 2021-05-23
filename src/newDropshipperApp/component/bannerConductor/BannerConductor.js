// Libs
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment-timezone";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

// Actions
import { isAnnual } from "../../../actions/upgrade";
import { trackPaywallView } from "../../../actions/tracker";
import { showModal } from "actions/ui";

// Components
import Countdown from "../../../components/_Shared/Countdown/Countdown";
import StickyAnnualPlanBanner from "./annualPlanBanner/StickyAnnualPlanBanner";

// Image
import erinImage from "../../images/erin-image.png";

// Style
import "./AnnualPlanBanner.css";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const AnnualPlanBanner = ({
  storeId,
  currentPromotionEndTime,
  isAnnual,
  showPromotion,
  maxDiscountPercentage,
  trackPaywallView,
  showModal
}) => {
  const [scrollY, setScrollY] = useState(0);

  useScrollPosition(({ currPos }) => {
    setScrollY(currPos.y);
  });
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  const getPromotionEndTimeFormated = () => {
    const date = moment.tz(currentPromotionEndTime, "America/Los_Angeles").format();
    return new Date(date).getTime();
  };

  return (
    showPromotion && (
      <Fragment>
        {storeId && maxDiscountPercentage ? (
          <div
            className="annual-plan-banner__container"
            onClick={() => {
              isAnnual(true);
              trackPaywallView("navigation", "annual_promo", null, null, null, "viewed_all_plans");
              showModal("UPGRADE_MODAL");
              track("upgrade__onboarding-annual-promo--clicked", {}, { refreshAttemptId: true });
            }}
          >
            <span className="annual-plan-banner__countdown">
              Ends in
              <Countdown splitTime endDate={getPromotionEndTimeFormated()} />
            </span>
            <div className="annual-plan-banner__title">
              Erin made <span>$442,991</span> in 6 months
              <div className="annual-plan-banner__subtitle">
                Get up to <span>7 months off</span> a Spocket Annual Plan
              </div>
            </div>
            <img className="annual-plan-banner__img" src={erinImage} alt="Woman at the computer" />
          </div>
        ) : null}

        {scrollY < -180 && <StickyAnnualPlanBanner />}
      </Fragment>
    )
  );
};

AnnualPlanBanner.propTypes = {
  type: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
  currentPromotionEndTime: PropTypes.string.isRequired,
  isAnnual: PropTypes.func.isRequired,
  trackPaywallView: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { storeId, dropshipperData } = state.settings;

  return {
    currentPromotionEndTime: dropshipperData.current_promotion_end_time,
    showPromotion: dropshipperData.show_promotion,
    maxDiscountPercentage: state.store.plans.maxDiscountPercentage,
    storeId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isAnnual, trackPaywallView, showModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnualPlanBanner);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/bannerConductor/AnnualPlanBanner.js