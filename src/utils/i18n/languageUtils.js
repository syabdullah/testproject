// * Language helper functions

// Check if current language is one of the languages in array and return string
// Ex: languagesArray is ["ko", "it"] and selected language is "ko", we return a string that will be used on css styling
export const checkLanguageAndReturnClassName = (languagesArray, currentLanguage) => {
  const isLanguageActive = languagesArray.includes(currentLanguage);
  const returnedClassName = isLanguageActive ? "special-language" : "";
  return returnedClassName
}

// Check if any of the words in a string is too long
// Ex: String is "Accessoires technologiques" and max is 14, we return class name because technologiques is too big
export const checkEachStringLengthAndReturnClassName = (string, max, languagesArray, currentLanguage) => {
  // Split complete string into array of strings
  const stringsArray = string.split(" ")
  // Get longest string
  const longestString = stringsArray.sort((a, b) => { return b.length - a.length })[0];
  // Check if longest string is larger than allowed max
  const isStringEqualOrLargerThanMax = longestString.length >= max;
  const isLanguageActive = languagesArray.length === 0 || languagesArray.includes(currentLanguage);
  const returnedClassName = (isLanguageActive && isStringEqualOrLargerThanMax) ? "special-string" : "";
  return returnedClassName
}


// WEBPACK FOOTER //
// ./src/utils/i18n/languageUtils.js