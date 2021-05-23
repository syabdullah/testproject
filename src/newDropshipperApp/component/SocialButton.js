// Libs
import React from "react";
import PropTypes from "prop-types";

// Images
import facebook from "../images/facebook-color.svg";
import google from "../images/google-color.svg";

// Style
import "./SocialButton.css";

const social = {
  google: {
    icon: google,
    link: `${process.env.REACT_APP_API_URL}/auth/google`,
    text: "Sign up with Google"
  },
  facebook: {
    icon: facebook,
    link: `${process.env.REACT_APP_API_URL}/auth/facebook`,
    text: "Sign up with Facebook"
  }
};

const SocialButton = ({ children, type }) => {
  return (
    <a className="SocialButton" href={social[type].link} data-cy={`social-${type}`}>
      <img src={social[type].icon} alt={type} />
      {children}
    </a>
  );
};

SocialButton.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired
};

export default SocialButton;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/SocialButton.js