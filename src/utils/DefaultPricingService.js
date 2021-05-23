export default class DefaultPricingService {
  static applyRule(priceFloat, type, amount) {
    amount = Number(amount);
    switch (type) {
      case "multiplier":
        return priceFloat * amount;
      case "percent":
        return priceFloat * (1 + amount / 100);
      case "fixed":
        return priceFloat + amount;
      default:
        return priceFloat;
    }
  }

  static calculateDefaultPrice(rules, priceCents, msrpCents) {
    const self = this;
    const priceFloat = priceCents / 100;
    const defaultPrice = (() => {
      for (let rule of rules.advanced_rules) {
        if (priceFloat > rule.from_cents / 100 && priceFloat < rule.to_cents / 100) {
          return self.applyRule(priceFloat, rule.markup_type, rule.markup_amount);
        }
      }

      const defaultRule = rules.default_markup;
      if (defaultRule.amount && defaultRule.type) {
        return self.applyRule(priceFloat, defaultRule.type, defaultRule.amount);
      }

      return msrpCents / 100;
    })();

    if (typeof rules.default_rounded_cents === "number") {
      return Math.floor(defaultPrice) + rules.default_rounded_cents / 100;
    }

    return defaultPrice;
  }
}



// WEBPACK FOOTER //
// ./src/utils/DefaultPricingService.js