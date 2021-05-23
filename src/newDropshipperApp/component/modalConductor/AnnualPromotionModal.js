// Libs
import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";

// Components
import Countdown from "../../../components/_Shared/Countdown/Countdown";
import { Emoji } from "newDropshipperApp/component/Emoji";

// Actions
import { showModal } from "../../../actions/ui";
import { isAnnual } from "../../../actions/upgrade";

// Images
import iconClose from "../../images/close-icon.svg";
import annualOfferBg from "../../images/annual-special-offer-image-bg.jpg";
import offer45 from "../../images/offer-45.svg";
import offer55 from "../../images/offer-55.svg";

// Hooks
import { useAttemptAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

// Components
import { Modal, Button } from "../../spocketUI";

// Style
import {
  Container,
  Header,
  CloseModalIcon,
  Body,
  Illustration,
  Background,
  TagOffer,
  Footer,
  CountdownContainer,
  CountdownTitle
} from "./AnnualPromotionModalStyle";
import { useTranslation } from "react-i18next";

const AnnualPromotionModal = ({ showModal, isAnnual, dataModal }) => {
  useEffect(() => {
    isAnnual(true);
    track("upgrade__post-annual-upgrade-modal");
  }, []);
  const { t } = useTranslation();
  const { track } = useAttemptAnalytics({ attemptIdFieldName: "upgrade_attempt_id" });

  const fiveMinutesFromNow = () => {
    return moment()
      .add(5, "minutes")
      .valueOf();
  };

  const openPlanUpgradeCreditCardModal = () => {
    /**
     * We will be using the Professional plan in replacement for our Starter plan, ergo they will not go to Starter Annual.
     */
    const getPlanName = ["Starter", "Pro"].includes(dataModal.plan.alias)
      ? "Professional"
      : dataModal.plan.alias;

    track("upgrade__post-annual-upgrade-modal--confirm-upgrade-to-annual");

    showModal("PLAN_UPGRADE_CREDIT_CARD", {
      planName: getPlanName,
      isAnnual: true,
      annualPromotion: true
    });
  };

  return (
    <Modal background="dark" shouldCloseOnOverlayClick={false}>
      <Container>
        <Header>
          {t("AnnualPromotionModal.Header", {
            planName: dataModal.plan.alias === "Professional" ? "Pro" : dataModal.plan.alias
          })}
          <CloseModalIcon
            onClick={() => {
              showModal("UPGRADE_REASON", {
                plan: dataModal.plan
              });
            }}
          >
            <img src={iconClose} alt="close" />
          </CloseModalIcon>
        </Header>
        <Body>
          <Illustration>
            <Background src={annualOfferBg} alt="Woman smiling pointing to the special offer" />
            <CountdownContainer>
              <CountdownTitle>
                <Emoji label="Clock" symbol="⏰" />
                {t("AnnualPromotionModal.CountdownTitle")}
              </CountdownTitle>
              <Countdown splitTime endDate={fiveMinutesFromNow()} />
            </CountdownContainer>
            <TagOffer src={dataModal.plan.alias !== "Unicorn" ? offer45 : offer55} alt="Offer" />
          </Illustration>
        </Body>
        <Footer>
          <Button variant="primaryBig" onClick={() => openPlanUpgradeCreditCardModal()}>
            {t("AnnualPromotionModal.Button.Yes")}
          </Button>
          <Button
            variant="text"
            onClick={() => {
              track("upgrade__post-annual-upgrade-modal--decline");
              showModal("UPGRADE_REASON", {
                plan: dataModal.plan
              });
            }}
          >
            {t("AnnualPromotionModal.Button.No")}
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    suppliersAliases: state.supplier.aliases.data,
    dataModal: state.ui.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, isAnnual }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnualPromotionModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/AnnualPromotionModal.js