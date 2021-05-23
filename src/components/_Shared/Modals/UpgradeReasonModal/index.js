// React and Redux
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import styled from "styled-components";

// Libs
import { default as Loadable } from "../../commonLoadable";

// Components
import ModalWrapper from "../../ModalWrapper";
import { TextArea, Checkbox } from "newDropshipperApp/spocketUI";

// Actions
import { updatePlanChargeReason } from "../../../../actions/upgrade";

// Icon
import unlimitedProductIcon from "../../../../assets/upgradeReason/unlimited-products-square.svg";
import unlimitedOrdersIcon from "../../../../assets/upgradeReason/unlimited-orders-square.svg";
import discountedProductsIcon from "../../../../assets/upgradeReason/discount-icon.svg";
import premiumProductsIcon from "../../../../assets/upgradeReason/premium-products-square.svg";
import chatSupportIcon from "../../../../assets/upgradeReason/chat-support-square.svg";
import brandedInvoiceIcon from "../../../../assets/upgradeReason/branded-invoice-square.svg";

// Utils
import { randomArray } from "../../../../newDropshipperApp/utils/array";

// Style
import "./style.css";
import { StyledButton } from "./UpgradeReasonModal.style";

// i18n
import { withTranslation } from "react-i18next";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const UpgradeReasonModalAnalyticsWrapper = props => {
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });
  return <UpgradeReasonModal {...props} track={track} />;
};

const StyledCheckBox = styled(Checkbox)`
  background-color: white;
`;

class UpgradeReasonModal extends Component {
  state = {
    upgradeReasons: [],
    upgradeComment: null,
    loading: false
  };

  UNSAFE_componentWillMount() {
    this.setState({ benefits: randomArray(this.benefits()) });
  }

  componentDidMount() {
    this.props.track("upgrade__success-survey-modal");
  }

  handleListClick = name => {
    let upgradeReasons = this.state.upgradeReasons;
    const reasonChosen = upgradeReasons.includes(name);
    if (!reasonChosen) {
      upgradeReasons = upgradeReasons.concat(name);
    } else if (reasonChosen) {
      upgradeReasons = upgradeReasons.filter(reason => reason !== name);
    }

    this.setState({ upgradeReasons });
  };

  handleCommentChange = e => {
    const value = e.target.value;

    this.setState({ upgradeComment: value });
  };

  handleStartPlan = () => {
    const { upgradeReasons, upgradeComment } = this.state;
    if (upgradeReasons.length > 0) {
      this.setState({ loading: true });
      this.props.track("upgrade__success-survey-modal--submit");
      this.props.updatePlanChargeReason(upgradeReasons, upgradeComment);
    }
  };

  benefits = () => {
    const { t } = this.props;
    return [
      {
        text: t("UpgradeReasonModal.Benefits.IncreasedProducts"),
        icon: unlimitedProductIcon,
        name: "increased_products"
      },
      {
        text: t("UpgradeReasonModal.Benefits.UnlimitedOrders"),
        icon: unlimitedOrdersIcon,
        name: "unlimited_orders"
      },
      {
        text: t("UpgradeReasonModal.Benefits.BrandedInvoicing"),
        icon: brandedInvoiceIcon,
        name: "branded_invoicing"
      },
      {
        text: t("UpgradeReasonModal.Benefits.PremiumProducts"),
        icon: premiumProductsIcon,
        name: "premium_products"
      },
      {
        text: t("UpgradeReasonModal.Benefits.ExclusiveDeals"),
        icon: discountedProductsIcon,
        name: "exclusive_deals"
      },
      {
        text: t("UpgradeReasonModal.Benefits.ChatCallSupport"),
        icon: chatSupportIcon,
        name: "support"
      }
    ];
  };

  render() {
    const { upgradeReasons, loading } = this.state;
    const { plan, t } = this.props;
    return (
      <ModalWrapper
        keyboard={false}
        size="Upgrade_Reason__upgrade_reason_container"
        onHide={() => browserHistory.push("/search")}
      >
        <Loadable active={loading}>
          <ModalWrapper.Body>
            <p className="heading-text">{t("UpgradeReasonModal.Modal.Title")}</p>
            <TextArea
              rows={3}
              placeholder={t("UpgradeReasonModal.UpgradeComment.PlaceHolder")}
              onChange={this.handleCommentChange}
            />
            <div className="benefits-container" data-cy="upgradeReasonModal">
              <p className="heading-text">{t("UpgradeReasonModal.Modal.Question")}</p>
              <ul>
                {this.state.benefits.map(benefit => {
                  return (
                    <li key={benefit.name}>
                      <StyledCheckBox
                        name={benefit.name}
                        checked={upgradeReasons.includes(benefit.name)}
                        onChange={() => this.handleListClick(benefit.name)}
                      >
                        <img src={benefit.icon} alt={benefit.name} />
                        <span>{benefit.text}</span>
                      </StyledCheckBox>
                    </li>
                  );
                })}
              </ul>
              <StyledButton
                variant="brandBig"
                onClick={this.handleStartPlan}
                disabled={upgradeReasons.length === 0}
              >
                <span>{t("UpgradeReasonModal.Modal.Button", { plan: plan.alias })}</span>
              </StyledButton>
            </div>
          </ModalWrapper.Body>
        </Loadable>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePlanChargeReason }, dispatch);
}
function mapStateToProps(state) {
  return {
    plan: state.ui.data.plan
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpgradeReasonModalAnalyticsWrapper)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/UpgradeReasonModal/index.js