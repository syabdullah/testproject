// Libs
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Moment - List of locales https://stackoverflow.com/a/55827203
import moment from "moment";
import "moment/locale/da";
import "moment/locale/de";
import "moment/locale/es";
import "moment/locale/fr";
import "moment/locale/it";
import "moment/locale/ja";
import "moment/locale/ko";
import "moment/locale/nl";
import "moment/locale/pt";
import "moment/locale/tr";
import "moment/locale/zh-cn";

// Language files
import da from "utils/i18n/da.js";
import de from "utils/i18n/de.js";
import en from "utils/i18n/en.js";
import es from "utils/i18n/es.js";
import fr from "utils/i18n/fr.js";
import it from "utils/i18n/it.js";
import ja from "utils/i18n/ja.js";
import ko from "utils/i18n/ko.js";
import nl from "utils/i18n/nl.js";
import pt from "utils/i18n/pt.js";
import tr from "utils/i18n/tr.js";
import zh from "utils/i18n/zh.js";

const resources = {
  da,
  de,
  en,
  es,
  fr,
  it,
  ja,
  ko,
  nl,
  pt,
  tr,
  zh
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already protects from xss
      format: function (value, format, lng) {
        if (value instanceof Date)
          return moment(value).locale(lng).format(format);
        return value;
      }
    }
  });

export default i18n;

// WEBPACK FOOTER //
// ./src/i18n.js
