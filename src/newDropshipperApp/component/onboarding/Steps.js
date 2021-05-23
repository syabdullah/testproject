// React & Redux
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Libs
import { browserHistory } from "react-router";
import { useTranslation } from "react-i18next";

// Actions
import { showModal } from "../../../actions/ui";
import { getStore } from "../../module/store";
import { featureFlagEnabled } from "../../utils/featureFlag";

// Components
import Container from "../Container";
import ProgressBar from "../ProgressBar";
import Checklist from "../onboarding/Checklist";

// Style
import "./Steps.css";

const Steps = ({
  integratedStoreName,
  hasClickedToReviewA,
  hasClickedToReviewB,
  productListCount,
  dropshipperData,
  importListCount,
  disableReview,
  featureFlags,
  showModal,
  getStore,
  subtitle,
  title
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    getStore();
  }, []);

  const showForTestUser = () => {
    return featureFlagEnabled({
      name: "Review Modal",
      user: dropshipperData,
      featureFlags: featureFlags
    });
  };

  const hasReviewed = () => {
    return showForTestUser() ? hasClickedToReviewB : hasClickedToReviewA;
  };

  const checklistItem = [
    {
      text: t("Steps.ChecklistItem.Connect.Text"),
      value: "connect_account",
      tooltip: t("Steps.ChecklistItem.Connect.Tooltip"),
      onClick: () => showConnectStoreModal(),
      completed: integratedStoreName,
      disabledText: t("Steps.ChecklistItem.Connect.Disabled")
    },
    {
      text: t("Steps.ChecklistItem.Search.Text"),
      value: "search_products",
      tooltip: t("Steps.ChecklistItem.Search.Tooltip"),
      onClick: () => document.getElementById("searchProductSection").scrollIntoView({ behavior: "smooth" }),
      completed: importListCount || productListCount,
      disabledText: t("Steps.ChecklistItem.Search.Disabled")
    },
    {
      text: t("Steps.ChecklistItem.Push.Text"),
      value: "push_product",
      tooltip: t("Steps.ChecklistItem.Push.Tooltip"),
      onClick: () => browserHistory.push("/import"),
      completed: productListCount,
      disabledText: t("Steps.ChecklistItem.Push.Disabled")
    },
    {
      text: t("Steps.ChecklistItem.Review.Text"),
      value: "review",
      tooltip: t("Steps.ChecklistItem.Review.Tooltip"),
      onClick: () => {
        integratedStoreName && showModal("RATING_CAPTURE_MODAL", { integratedStoreName });
      },
      completed: hasReviewed(),
      disabled: !integratedStoreName,
      disabledText: t("Steps.ChecklistItem.Review.Disabled")
    }
  ];

  /**
   * @returns {Function}
   */
  const showConnectStoreModal = () => {
    if (!integratedStoreName) {
      showModal("CONNECT_STORE");
    }
  };

  /**
   * Calculating the percentage
   *
   * @returns {Number}
   */
  const getPercentageCompleted = () => {
    const completedItems = checklistItem.filter(item => item.completed);

    return (completedItems.length * 100) / checklistItem.length;
  };

  return (
    <Fragment>
      {hasReviewed() === false && (
        <Container>
          <div className="Steps__container">
            <div className="Steps__title">
              <span>{title}</span>
            </div>
            <div className="Steps__subtitle">{subtitle}</div>
            <ProgressBar percentage={getPercentageCompleted()} />
            <Checklist>
              {checklistItem.map(item => {
                if (disableReview && item.value === "review") {
                  return null;
                } else {
                  return (
                    <Checklist.Item
                      key={item.text}
                      onClick={() => item.onClick()}
                      tooltip={item.tooltip}
                      completed={item.completed}
                      disabled={item.disabled || false}
                    >
                      {item.text} {item.disabled && `(${item.disabledText})`}
                    </Checklist.Item>
                  );
                }
              })}
            </Checklist>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

function mapStateToProps(state) {
  const {
    product_list_count: productListCount,
    import_list_count: importListCount
  } = state.settings.dropshipperData;

  const { integrated_stores } = state.store.information.account;

  return {
    productListCount,
    importListCount,
    hasClickedToReviewA: state.settings.dropshipperData.has_clicked_to_review,
    hasClickedToReviewB: state.store.information.account.review.created_at.length > 0,
    integratedStoreName: integrated_stores.length > 0 ? integrated_stores[0].name : "",
    dropshipperData: state.settings.dropshipperData,
    featureFlags: state.featureFlags.featureFlags
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, getStore }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Steps);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/onboarding/Steps.js