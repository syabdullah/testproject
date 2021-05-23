// @flow
import React from "react";
import { withTranslation } from "react-i18next";
import "./style.css";

class PageFooter extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="footer">
        {t("Footer.Copyright", { year: new Date().getFullYear() })}
        {". "}
        <a
          href="https://d3eyb8shadqthh.cloudfront.net/PrivacyPolicy.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Footer.PrivacyPolicy")}
        </a>
        ,{" "}
        <a
          href="https://d3eyb8shadqthh.cloudfront.net/retailer/TermsOfService.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Footer.TermsConditions")}
        </a>
        ,{" "}
        <a
          href="https://d3eyb8shadqthh.cloudfront.net/retailer/DataProcessingAddendum.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Footer.DataProcessingAddendum")}
        </a>
        .
      </div>
    );
  }
}

export default withTranslation()(PageFooter);



// WEBPACK FOOTER //
// ./src/components/PageFooter/index.js