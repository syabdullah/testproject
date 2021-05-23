export function numberFormat(originalValue, value, decimals = 0, min = 0, max = 1000000) {
  let val = Number(value);
  if (val > max) {
    val = max;
  }
  if (val < min) {
    val = min;
  }
  const strVal = value.toString();
  if (isNaN(val)) {
    return originalValue;
  }
  if (decimals > 0) {
    if (strVal.indexOf(Math.floor(val) + ".") > -1) {
      if (strVal.split(".")[1].length > decimals) {
        return originalValue;
      }
      val = value;
    }
  }
  if (value === "") {
    val = "";
  }
  return val;
}

// Capitalize the first letter of a string
export function stringCapitalize(string) {
  const split = string.trim().split(" ");
  return split.map(function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1) + " ";
  });
}

export function etsyAffiliateLinkGenerator(supplier_listing_id) {
  const etsyUrl = "https://www.etsy.com/listing/" + supplier_listing_id + "/";
  return process.env.REACT_APP_ETSY_AFFILIATE_LINK + encodeURIComponent(etsyUrl);
}

export function firstName() {
  return localStorage.getItem("user_name").split(" ")[0];
}

/**
 * truncateNumber:
 *  Truncates numbers greater than 999 to show as 1k, 1m etc.
 * @param {number} - The number to be truncated.
 * @return {String} - Either the number if less than 1000 or or the k, m, ect value of the number
 */
export function truncateNumber(number) {
  if (number < 1000 || number === undefined) return number;

  let decimals = 1;
  let numberLength = ("" + number).length;
  const p = Math.pow;
  decimals = p(10, decimals);
  numberLength -= numberLength % 3;
  return Math.round((number * decimals) / p(10, numberLength)) / decimals + " kMGTPE"[numberLength / 3];
}



// WEBPACK FOOTER //
// ./src/utils/index.js