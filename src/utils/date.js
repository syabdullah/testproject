import moment from "moment";
require("moment/min/locales.min");

const addDaystoCurrentDate = (days, format, language) => {
  const date = new Date();
  return moment(date.setDate(date.getDate() + days))
    .locale(language)
    .format(format);
};

const addDaystoLongDateFormat = (days, language, removeYear) => {
  const date = new Date();
  const addedDays = moment(date.setDate(date.getDate() + days));
  // Format date using format and language
  const formatted = addedDays.locale(language).format("L");
  // If removeYear, extract the year.
  return removeYear ? formatted.substr(0, formatted.lastIndexOf("/")) : formatted;
};

const getTranslatedDate = (date, language) => {
  return moment(date)
    .locale(language)
    .format("LL");
};

export { addDaystoCurrentDate, addDaystoLongDateFormat, getTranslatedDate };



// WEBPACK FOOTER //
// ./src/utils/date.js