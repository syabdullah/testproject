// Mocks
const listings = require("mockdata/listings.json");
const listingsPageTwo = require("mockdata/listings2.json");
const importListIds = require("mockdata/import_list.json");
const pushedItemsIds = require("mockdata/pushed_items.json");
const supplier = require("mockdata/supplier.json");

const useMockdata = url => {
  if (url.includes("/listings")) {
    if (url.includes("category=")) {
      return { status: 200, json: [] };
    } else if (url.includes("1")) {
      return { status: 200, json: listings };
    } else if (url.includes("2")) {
      return { status: 200, json: listingsPageTwo };
    } else {
      return { status: 200, json: [] };
    }
  } else if (url.includes("/import_list/ids")) {
    return new Promise(resolve => {
      resolve({ status: 200, json: importListIds });
    });
  } else if (url.includes("/pushed_listing_customizations/ids")) {
    return new Promise(resolve => {
      resolve({ status: 200, json: pushedItemsIds });
    });
  } else if (url.includes("/suppliers")) {
    return { status: 200, json: supplier };
  }
};

export default useMockdata;



// WEBPACK FOOTER //
// ./src/utils/useMockdata.js