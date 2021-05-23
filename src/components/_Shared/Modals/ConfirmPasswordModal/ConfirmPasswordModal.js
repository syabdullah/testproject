// Libs
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { default as Loadable } from "../../commonLoadable";

// Components
import ModalWrapper from "../../ModalWrapper";
import { Input, Button } from "../../../../newDropshipperApp/spocketUI";

// Context
import { UserContext } from "contexts/UserContext";

// Actions
import { verifyPassword } from "../../../../newDropshipperApp/module/password/verify";
import { closeModal } from "../../../../actions/ui";

// Style
import { Title, Subtitle, Footer } from "./ConfirmPasswordModalStyle";
import "./ConfirmPasswordModal.css";
import { useTranslation } from "react-i18next";

// Utils
import { useSpocketAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

// Monthly plan users going to the downgrade process, will get this modal.
const ConfirmPasswordModal = ({
  closeModal,
  isFetching,
  verifyPassword,
  activeUpgradeType,
  isTheChurnOfferCreated
}) => {
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const { downgradeAttemptId } = useContext(UserContext);
  const { track } = useSpocketAnalytics();

  const verifyPasswordByPaymentProvider = password => {
    if (activeUpgradeType === "stripe" && isTheChurnOfferCreated !== true) {
      verifyPassword({ password, paymentProvider: "stripe" });
    } else {
      verifyPassword({ password }).then(() =>
        track("plan_downgrade_password_confirmed", { downgrade_attempt_id: downgradeAttemptId })
      );
    }
  };

  return (
    <ModalWrapper
      backdropClassName="ConfirmPasswordModal__backdrop"
      onHide={() => {
        track("plan_downgrade_password_cancelled", { downgrade_attempt_id: downgradeAttemptId });
        closeModal();
      }}
    >
      <Loadable active={isFetching}>
        <ModalWrapper.Header>
          <Title>{t("ConfirmPasswordModal.Title")}</Title>
          <Subtitle>{t("ConfirmPasswordModal.SubTitle")}:</Subtitle>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <Input
            data-cy="confirm-password-input"
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder={`${t("ConfirmPasswordModal.Input.Placeholder")}...`}
          />
        </ModalWrapper.Body>
        <ModalWrapper.Footer>
          <Footer>
            <Button
              variant="text"
              onClick={() => {
                track("plan_downgrade_password_cancelled", { downgrade_attempt_id: downgradeAttemptId });
                closeModal();
              }}
            >
              {t("ConfirmPasswordModal.Button.Cancel")}
            </Button>
            <Button
              data-cy="confirm-password-confirm-button"
              variant="primaryBig"
              onClick={() => verifyPasswordByPaymentProvider(password)}
              disabled={password.length === 0}
            >
              {t("ConfirmPasswordModal.Button.Confirm")}
            </Button>
          </Footer>
        </ModalWrapper.Footer>
      </Loadable>
    </ModalWrapper>
  );
};

ConfirmPasswordModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  verifyPassword: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { activeUpgradeType } = state.settings;
  const testGroupOffer = "churn_2_month_free";
  const offerStatus = state.store.offers.allOffers[0];

  return {
    isFetching: state.verifyPassword.isFetching,
    activeUpgradeType: activeUpgradeType || "",
    isTheChurnOfferCreated: offerStatus && offerStatus.created_at.length > 0,
    testGroupOffer: testGroupOffer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal, verifyPassword }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPasswordModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/ConfirmPasswordModal/ConfirmPasswordModal.js