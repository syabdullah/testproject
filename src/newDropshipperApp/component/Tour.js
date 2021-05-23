import React from "react";

// Redux
import { connect } from "react-redux";

// Actions
import { updateTourStep } from "../../actions/settings";

// Tour
import TourStep from "./TourStep";

// History
import { browserHistory } from "react-router";

//CSS
import "./Tour.css";

class Tour extends React.Component {
  handleNext = () => {
    const { tourStep } = this.props;
    let nextStep = tourStep;

    if (tourStep === "step_one") {
      nextStep = "step_two";
    } else if (tourStep === "step_two") {
      nextStep = "step_three";
    } else if (tourStep === "step_three") {
      nextStep = "step_four";
    } else if (tourStep === "step_four") {
      nextStep = "outro";
    }

    this.props.updateTourStep(nextStep);
  };

  handleSkip = () => {
    this.props.updateTourStep("outro");
  };

  stepToShow() {
    const currentLocation = browserHistory.getCurrentLocation().pathname;
    const { tourStep } = this.props;

    if (currentLocation === "/search" && tourStep === "step_one") {
      return 1;
    } else if (currentLocation === "/search" && tourStep === "step_two") {
      return 2;
    } else if (currentLocation === "/import" && tourStep === "step_three") {
      return 3;
    } else if (tourStep === "step_four") {
      return 4;
    }
  }

  render() {
    const { showTour } = this.props;
    if (!showTour) return null;

    return <TourStep step={this.stepToShow()} handleNext={this.handleNext} handleSkip={this.handleSkip} />;
  }
}

function mapStateToProps(state) {
  const data = state.settings.dropshipperData;
  return {
    showTour: data.show_tour,
    tourStep: data.tour_step
  };
}

export default connect(
  mapStateToProps,
  { updateTourStep }
)(Tour);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/Tour.js