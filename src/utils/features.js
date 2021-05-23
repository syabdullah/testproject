export const PREMIUM_LISTINGS = "premium_listings";
export const BRANDED_INVOICING = "branded_invoicing";
export const SHIPMENT_TRACKING = "shipment_tracking";
export const LIVE_CHAT = "live_chat";

export function doesCurrentPlanSupport(planConst) {
  if (localStorage.getItem("auth_token") && localStorage.getItem("active_plan_supported_features")) {
    const supported_features = localStorage.getItem("active_plan_supported_features") || "{}";
    return supported_features.includes(planConst);
  }
}

export function isAuthenticated() {
  return localStorage.getItem("auth_token");
}

export function getActivePlan() {
  return localStorage.getItem("active_plan_name");
}

export function isCurrentPlanBasic() {
  return localStorage.getItem("active_plan_name") === "Basic";
}

export function isCurrentPlanPaid() {
  return localStorage.getItem("active_plan_name") !== "Basic";
}

export function isCurrentPlanEmpire() {
  return localStorage.getItem("active_plan_name") === "Empire";
}

export function isCurrentPlanAnnual() {
  return localStorage.getItem("annual_plan") === "true";
}

export function isCurrentPlanEmpireAnnual() {
  const isAnnualPlan = localStorage.getItem("annual_plan") === "true";
  const isCurrentPlanEmpire = localStorage.getItem("active_plan_name") === "Empire";
  return isAnnualPlan && isCurrentPlanEmpire;
}

export function isCurrentPlanProfessionalAnnual() {
  const isAnnualPlan = localStorage.getItem("annual_plan") === "true";
  const isCurrentPlanProfessional = localStorage.getItem("active_plan_name") === "Professional";
  return isAnnualPlan && isCurrentPlanProfessional;
}

export function isIntegratedStoreShopify() {
  return localStorage.getItem("integrated_store_name") === "shopify";
}

export function isIntegratedStoreWoocommerce() {
  return localStorage.getItem("integrated_store_name") === "woocommerce";
}

export function isIntegratedStoreSpocket() {
  return localStorage.getItem("integrated_store_name") === "spocket";
}

export function isIntegratedStoreBigcommerce() {
  return localStorage.getItem("integrated_store_name") === "bigcommerce";
}

export function isIntegratedStoreWix() {
  return localStorage.getItem("integrated_store_name") === "wix";
}

const defaultFeatures = [
  {
    name: "Real-time Inventory Update",
    tooltip: "Inventory is updated in real time to prevent selling out of stock products"
  },
  {
    name: "Currency Exchange",
    tooltip: "Spocket will automatically update currencies to your store currency"
  },
  {
    name: "Global Pricing Rules",
    tooltip: "Set pricing rules and automate the profit markups for each product"
  },
  {
    name: "Shipment Tracking Number",
    tooltip: "Spocket tracks the package and updates the customer about its location"
  }
  // {
  //   name: "Automated Order Updates",
  //   tooltip:
  //     "Your orders on your shop will automatically be set to fulfilled with a tracking number upon order shipment"
  // },
  // {
  //   name: "Process Sample Orders",
  //   tooltip:
  //     "Try out any Spocket product before selling them by placing a sample order directly with the supplier"
  // }
];

/**
 * @param  {String} price
 * @returns {String} name formated
 */
function formatPrice(price, isAnnual) {
  const dollars = parseInt(isAnnual ? price / 12 / 100 : price / 100, 10);
  return `$${dollars}`;
}

/**
 * @param  {String} brandedInvoicing
 * @returns {String} name formated
 */
function formatBrandedInvoicing(brandedInvoicing) {
  if (brandedInvoicing) {
    return {
      name: "Branded Invoicing",
      tooltip:
        "Build your brand by adding your own logo to all orders from suppliers who offer branded invoicing"
    };
  }
}

function formatMaxProducts(maxProducts) {
  if (maxProducts >= 10000) {
    return "Unlimited products";
  } else {
    return `Up to ${maxProducts.toLocaleString()} unique products`;
  }
}

function returnRegularPrice(plan_name, plan_annual) {
  // Temporary hardcoding for BFCM
  if (plan_name === "Professional") {
    if (plan_annual) {
      return "$39";
    } else {
      return "$39";
    }
  } else if (plan_name === "Empire") {
    if (plan_annual) {
      return "$99";
    } else {
      return "$59";
    }
  }
}

export function transpilerPlanAPI(data) {
  const plans = data.map(plan => {
    return {
      id: plan.id,
      name: plan.name,
      alias: plan.name === "Professional" ? "Pro" : plan.name,
      annual: plan.annual,
      trial_days: plan.trial_days,
      regular_price: returnRegularPrice(plan.name, plan.annual),
      price_plan: plan.price_cents / 100,
      full_price: plan.price_cents ? formatPrice(plan.price_cents, false) : "0",
      price: plan.price_cents ? formatPrice(plan.price_cents, plan.annual) : "0",
      price_exchanged_to_cad: plan.price_exchanged_to_cad,
      max_products: plan.max_products,
      max_special_products: plan.max_special_products,
      discount_percentage: plan.discount_percentage,
      features: [
        {
          name: formatMaxProducts(plan.max_products),
          tooltip: ""
        },
        { name: "Unlimited Orders", tooltip: "" },
        plan.name === "Professional" && {
          name: "Up to 25 Premium Products",
          tooltip: "Get higher margins. Unlock 35% extra discounts on select products!"
        },
        plan.name === "Empire" && {
          name: "Unlimited Premium Products",
          tooltip: "Sell exclusive, highly discounted and fast shipping products on your shop"
        },
        // plan.name === "Empire" && {
        //   name: "Unlimited Discounted Products",
        //   tooltip:
        //     "Get higher margins. Unlock 35% extra discounts on select products!"
        // },
        formatBrandedInvoicing(plan.features.branded_invoicing),
        plan.name === "Basic" && {
          name: "Email support only",
          tooltip: ""
        },
        plan.name === "Professional" && {
          name: "Premium 24/7 Support",
          tooltip: ""
        },
        plan.name === "Empire" && {
          name: "Premium 24/7 Support",
          tooltip: ""
        },
        plan.name === "Professional" && {
          name: "Exclusive Deals",
          tooltip: ""
        },
        plan.name === "Empire" && {
          name: "Exclusive Deals",
          tooltip: "Save up to $11,000/year on our partnered e-com services"
        },
        ["Empire", "Professional"].includes(plan.name) && {
          name: "Premium Search",
          tooltip: "Search for products made in the USA with high inventory"
        },
        ...defaultFeatures
      ]
    };
  });

  return plans.map(plan => {
    plan.features = plan.features.filter(element => element && element);
    return plan;
  });
}



// WEBPACK FOOTER //
// ./src/utils/features.js