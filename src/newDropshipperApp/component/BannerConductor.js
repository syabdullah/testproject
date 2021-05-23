// Libs
import React from "react";
import PropTypes from "prop-types";

// Components
import AnnualPlanBanner from "./bannerConductor/AnnualPlanBanner";
import HolidaysBanner from "./bannerConductor/HolidaysBanner";
// import BlackFridayBanner from "./bannerConductor/BlackFridayBanner";

const BannerConductor = ({ currentBanner }) => {
  const bannerConductor = {
    introductory_annual: <AnnualPlanBanner />,
    promotional_annual: <HolidaysBanner />
  };

  return currentBanner ? bannerConductor[currentBanner] : null;
};

BannerConductor.propTypes = {
  currentBanner: PropTypes.string.isRequired
};

export default BannerConductor;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/BannerConductor.js