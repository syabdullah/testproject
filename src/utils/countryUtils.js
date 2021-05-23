import React from "react";

// UI
import { CountryFlag } from "newDropshipperApp/spocketUI";

// Static data
import allCountries from "newDropshipperApp/utils/staticData/allCountries";

// Receive country (Ex: Canada)
// Return country flag component
export const getCountryFlag = country => {
  const selectedCountry = allCountries.filter(element => {
    return element.label === country;
  });

  if (selectedCountry[0] && selectedCountry[0].iso_country_code) {
    const countryObj = {
      isoCountryCode: selectedCountry[0].iso_country_code.toLowerCase(),
      label: selectedCountry[0].label
    };

    return <CountryFlag isoCountryCode={countryObj.isoCountryCode} label={countryObj.label} />;
  } else {
    return null;
  }
};

// Send code (Ex: GB)
// Return country name (Ex: United Kingdom or GB if not found)
export const getCountryName = countryCode => {
  const country = allCountries.filter(elem => elem.iso_country_code === countryCode.toLowerCase())[0];
  return (country && country["label"]) || countryCode;
};

// Send code (Ex: India)
// Return country name (Ex: in or India if not found)
export const getCountryCode = countryName => {
  const country = allCountries.filter(elem => elem.label === countryName)[0];
  return (country && country["iso_country_code"]) || countryName;
};



// WEBPACK FOOTER //
// ./src/utils/countryUtils.js