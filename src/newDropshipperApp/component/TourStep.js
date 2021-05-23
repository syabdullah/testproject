import React from "react";
import PropTypes from "prop-types";

import "./TourStep.css";

const TourStep = props => {
  const { step } = props;

  if (!!!step) return null;

  function currentStepBody() {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      default:
        return "";
    }
  }

  function stepHeader() {
    switch (step) {
      case 1:
        return <h1>Search for a product</h1>;
      case 2:
        return <h1>Add a product to import list</h1>;
      case 3:
        return <h1>Customize and push a product</h1>;
      case 4:
        return <h1>Have questions?</h1>;
      default:
        return "";
    }
  }

  function tourStepCounter() {
    switch (step) {
      case 1:
        return "Step 1 of 4";
      case 2:
        return "Step 2 of 4";
      case 3:
        return "3 of 4";
      case 4:
        return "Step 4 of 4";
      default:
        return "";
    }
  }

  function nextText() {
    switch (step) {
      case 1:
        return "On it!";
      case 3:
        return "Sounds great!";
      case 4:
        return "End Tour";
      default:
        return "Okay, cool";
    }
  }

  return (
    <div className={`Tour ${step === 4 && "arrow_box"} ${step === 2 && "high-index"}`}>
      <div className="TourStep_header">
        <div>{stepHeader()}</div>
        <span>{tourStepCounter()}</span>
      </div>
      <div className="TourStep_body">{currentStepBody()}</div>
      <div className="Tour_footer">
        <button className="Next_btn" onClick={props.handleNext}>
          {nextText()}
        </button>
        {step < 4 && (
          <button className="Skip_btn" onClick={props.handleSkip}>
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};

TourStep.propTypes = {
  step: PropTypes.number.isRequired
};

export default TourStep;

const StepOne = () => {
  return (
    <div>
      <p className="line-two">
        Type in a keyword such as ‘dress’ in the search bar, or simply select a category.
      </p>
    </div>
  );
};

const StepTwo = () => {
  return (
    <div>
      <p className="line-two">Found a product you like? Click on "Add to Import list" to save it.</p>
    </div>
  );
};

const StepThree = () => {
  return (
    <div>
      <p className="line-two">
        Edit the product details as required and push it to your store. Don’t worry, you can remove it later
        from your Product list.
      </p>
    </div>
  );
};

const StepFour = () => {
  return (
    <div>
      <p className="line-two">Click here to access the Help Centre!</p>
    </div>
  );
};



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/TourStep.js