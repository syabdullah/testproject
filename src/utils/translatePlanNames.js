import i18n from "i18n";

// Receive plan name from Component
// Return translated plan name
export const getTranslatedPlans = name => {
  switch (name) {
    case "Starter":
      return i18n.t("Config.Plan.Starter");
    case "Professional":
      return i18n.t("Config.Plan.Professional");
    case "Empire":
      return i18n.t("Config.Plan.Empire");
    case "Unicorn":
      return i18n.t("Config.Plan.Unicorn");
    default:
      return "";
  }
};



// WEBPACK FOOTER //
// ./src/utils/translatePlanNames.js