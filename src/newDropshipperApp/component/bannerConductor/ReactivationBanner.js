import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import { Button } from "../../spocketUI";

// Actions
import { showModal } from "../../../actions/ui";

// Icon
import premiumIcon from "../../../assets/premiumIcon.svg";
import crownPremium from "../../images/crown-premium-products.png";
import iconCheckmark from "../../images/icon-checkmark.svg";
import premiumCard from "../../images/premium-card-bg.png";
import basicCard from "../../images/basic-card.png";
import arrowRight from "../../images/arrow-right.svg";
import star from "../../images/star.png";

// Style
import "./ReactivationBanner.css";

// i18n
import { Trans, useTranslation } from "react-i18next";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const ReactivationBanner = ({
  showModal,
  dropshipperData: { show_reactivation_promotion, most_recent_downgrade }
}) => {
  const { t } = useTranslation();
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  const textByPlan = () => {
    return {
      starter: {
        description: (
          <span>
            <Trans i18nKey="ReactivationBanner.TextByPlan.Starter.Description">
              You will no longer be able to <strong>push any Products</strong>
            </Trans>
          </span>
        ),
        title: t("ReactivationBanner.TextByPlan.Starter.Title"),
        subtitle: t("ReactivationBanner.TextByPlan.Starter.Subtitle"),
        icon: star,
        bg: basicCard
      },
      others: {
        description: (
          <span>
            <Trans i18nKey="ReactivationBanner.TextByPlan.Others.Description.PartOne">
              You will no longer be able to <strong>push any Products</strong>
            </Trans>
            <img src={premiumIcon} alt="premium" />{" "}
            <strong>{t("ReactivationBanner.TextByPlan.Others.Description.PartTwo")}</strong>
          </span>
        ),
        title: t("ReactivationBanner.TextByPlan.Others.Title"),
        subtitle: t("ReactivationBanner.TextByPlan.Others.Subtitle"),
        icon: crownPremium,
        bg: premiumCard
      }
    };
  };

  const getText = () => {
    if (most_recent_downgrade.name === "Starter") {
      return textByPlan()["starter"];
    } else if (["Professional", "Empire", "Unicorn", "Promotional"].includes(most_recent_downgrade.name)) {
      return textByPlan()["others"];
    }
  };

  return (
    <Fragment>
      {show_reactivation_promotion ? (
        <div>
          <div
            onClick={() => {
              showModal("PLAN_UPGRADE_CREDIT_CARD", {
                planName: most_recent_downgrade.name,
                isAnnual: most_recent_downgrade.annual
              });
              track("upgrade__reactivation-banner--clicked", {}, { refreshAttemptId: true });
            }}
            className="ReactivationBanner__container"
          >
            <div className="ReactivationBanner__alert">
              <span>{t("ReactivationBanner.Alert")}</span>
              {getText().description}
            </div>

            <div className="ReactivationBanner__info">
              <span className="ReactivationBanner__info-image-divider">
                <img src={arrowRight} alt="Arrow Right" />
              </span>
              <span className="ReactivationBanner__info-image">
                <img src={getText().icon} alt="Crown Premium" />
              </span>
              <div className="ReactivationBanner__info-container">
                <div className="ReactivationBanner__info-title">
                  {t("ReactivationBanner.InfoSubtitle")} <span>{getText().title}</span>
                </div>
                <div className="ReactivationBanner__info-subtitle">{getText().subtitle}</div>
                <div className="ReactivationBanner__info-checklist">
                  <div className="ReactivationBanner__info-checklist-list">
                    <img src={iconCheckmark} alt="Icon Checkmark" />
                    {t("ReactivationBanner.CheckList.HighQuality")}
                  </div>
                  <div className="ReactivationBanner__info-checklist-list">
                    <img src={iconCheckmark} alt="Icon Checkmark" />
                    {t("ReactivationBanner.CheckList.Curated")}
                  </div>
                  <div className="ReactivationBanner__info-checklist-list">
                    <img src={iconCheckmark} alt="Icon Checkmark" />
                    {t("ReactivationBanner.CheckList.FastShipping")}
                  </div>
                  <div className="ReactivationBanner__info-checklist-list">
                    <img src={iconCheckmark} alt="Icon Checkmark" />
                    {t("ReactivationBanner.CheckList.FromUSAndEU")}
                  </div>
                </div>
                <Button>{t("ReactivationBanner.Button")}</Button>
              </div>
              <div className="ReactivationBanner__info-promotion">
                <img
                  className="ReactivationBanner__info-promotion-image"
                  src={getText().bg}
                  alt="Premium Card"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}

function mapStateToProps(state) {
  return {
    dropshipperData: state.settings.dropshipperData
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactivationBanner);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/bannerConductor/ReactivationBanner.js