// Libs
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment-timezone";

// Actions
import { isAnnual } from "../../../../actions/upgrade";
import { trackPaywallView } from "../../../../actions/tracker";
import { showModal } from "actions/ui";

// Components
import Countdown from "../../../../components/_Shared/Countdown/Countdown";

// Style
import "./StickyAnnualPlanBanner.css";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const StickyAnnualPlanBanner = ({
  showPromotion,
  currentPromotionEndTime,
  isAnnual,
  maxDiscountPercentage,
  trackPaywallView,
  showModal
}) => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  const getPromotionEndTimeFormated = () => {
    const date = moment.tz(currentPromotionEndTime, "America/Los_Angeles").format();
    return new Date(date).getTime();
  };

  return showPromotion && maxDiscountPercentage ? (
    <Fragment>
      <div
        className="AnnualPlanBanner-banner__container AnnualPlanBanner-banner__container-sticky"
        onClick={() => {
          isAnnual(true);
          trackPaywallView("navigation", "annual_promo", null, null, null, "viewed_all_plans");
          showModal("UPGRADE_MODAL");
          track("upgrade__onboarding-annual-promo--clicked", {}, { refreshAttemptId: true });
        }}
      >
        <span className="AnnualPlanBanner-banner__countdown">
          <Countdown splitTime endDate={getPromotionEndTimeFormated()} />
        </span>
        <div className="AnnualPlanBanner-banner__title">
          <div className="AnnualPlanBanner-banner__subtitle">
            Erin made <span>$442,991</span> in 6 months
          </div>
        </div>

        <button>Upgrade NOW & save</button>
      </div>
    </Fragment>
  ) : null;
};

StickyAnnualPlanBanner.propTypes = {
  currentPromotionEndTime: PropTypes.string.isRequired,
  isAnnual: PropTypes.func.isRequired,
  trackPaywallView: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { dropshipperData } = state.settings;
  return {
    showPromotion: dropshipperData.show_promotion,
    currentPromotionEndTime: dropshipperData.current_promotion_end_time,
    maxDiscountPercentage: state.store.plans.maxDiscountPercentage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isAnnual, trackPaywallView, showModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyAnnualPlanBanner);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/bannerConductor/annualPlanBanner/StickyAnnualPlanBanner.js