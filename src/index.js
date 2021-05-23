// Libs
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
// Redux
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
// Context
import { UserProvider } from "contexts/UserContext";
// Analytics Libs
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import GoogleTagManager from "./components/GoogleTagManager";
import { AnalyticsProvider } from "use-analytics";
// Components
import Routes from "./routes";
import "./i18n";
// Styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ThemeProvider } from "styled-components";
import theme from "./newDropshipperApp/spocketUI/theme";
// Utils
import { analytics } from "newDropshipperApp/utils/analytics";
import ErrorBoundary from "./utils/errorBoundary";
import registerServiceWorker from "./registerServiceWorker";

const RELEASE = process.env.REACT_APP_VERSION;
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  ReactGA.initialize(process.env.REACT_APP_GA_KEY, {
    gaOptions: {
      allowLinker: true,
      cookieDomain: "auto"
    }
  });
  ReactGA.ga("require", "linker");
  ReactGA.ga("linker:autoLink", ["shopify.com", "shopify.ca"]);

  /* Configuring sentry error reporting START */
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: RELEASE
  });
  /* Configuring sentry error reporting END */
}

// eslint-disable-next-line no-undef
Chargebee.init({
  site: process.env.REACT_APP_CHARGEBEE_SITE,
  publishableKey: process.env.REACT_APP_CHARGEBEE_PUBLISHABLE_KEY
});

// React Facebook Pixel
ReactPixel.init(
  process.env.REACT_APP_FACEBOOK_PIXEL,
  {},
  { debug: false, autoConfig: false }
);

ReactDOM.render(
  <ErrorBoundary>
    <AnalyticsProvider instance={analytics}>
      <Provider store={store}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <GoogleTagManager gtmId="GTM-M9SWBMH" />
            <Routes />
          </ThemeProvider>
        </UserProvider>
      </Provider>
    </AnalyticsProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);

registerServiceWorker();

// WEBPACK FOOTER //
// ./src/index.js
