// Libs
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { default as Loadable } from "../../commonLoadable";
import { useTranslation } from "react-i18next";

// Components
import ModalWrapper from "../../ModalWrapper";
import { TextArea } from "newDropshipperApp/spocketUI";

// Context
import { UserContext } from "contexts/UserContext";

// Actions
import { closeModal } from "../../../../actions/ui";
import { downgradePlan } from "../../../../actions/settings";
import { trackDowngradeStep } from "../../../../newDropshipperApp/module/downgradeStep";

// Images
import chatting from "../../../../newDropshipperApp/images/chatting.svg";

// Style
import "./DowngradeReasonModal.css";
import { StyledButton } from "./DowngradeReasonModal.style";
import { Button } from "newDropshipperApp/spocketUI";

// Utils
import { useSpocketAnalytics } from "newDropshipperApp/utils/hooks/useSpocketAnalytics";

const DowngradeReasonModal = ({
  storeId,
  storeName,
  closeModal,
  isDowngrading,
  downgradePlan,
  trackDowngradeStep
}) => {
  const [reasonMoreInfo, setReasonMoreInfo] = useState("");
  const { t } = useTranslation();
  const { downgradeAttemptId } = useContext(UserContext);
  const { track } = useSpocketAnalytics();

  const renderDowngradeSection = () => {
    return (
      <div className="downgrade-reason-modal__reason-text-container" data-cy="downgrade-reason-modal">
        {t("DowngradeReasonModal.DowngradeSection")}
        <TextArea
          testId="text-area-downgrade-modal"
          rows={3}
          placeholder={t("DowngradeReasonModal.DowngradeSection.TextArea.PlaceHolder")}
          onChange={e => setReasonMoreInfo(e.target.value)}
        />
        {reasonMoreInfo.length < 100 && (
          <div className="downgrade-reason-modal__feedback">
            {t("DowngradeReasonModal.DowngradeSection.Tooltip")}
          </div>
        )}
      </div>
    );
  };

  return (
    <ModalWrapper
      backdropClassName="downgrade-reason-modal__backdrop"
      onHide={() => {
        track("plan_downgrade_cancelled_on_reason", { downgrade_attempt_id: downgradeAttemptId });
        closeModal();
      }}
    >
      <Loadable active={isDowngrading}>
        <ModalWrapper.Header>
          {t("DowngradeReasonModal.ModalWrapper.Header", { storeName })}
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <div
            className="downgrade-reason-modal__contact-us"
            id="downgrade-reason-modal-contact-us"
            onClick={() => {
              trackDowngradeStep("has_clicked_to_contact_us");
              closeModal();
            }}
          >
            <img src={chatting} alt="contact us" />
            {t("DowngradeReasonModal.ModalWrapper.ContactUs")}
          </div>

          {renderDowngradeSection()}
        </ModalWrapper.Body>
        <ModalWrapper.Footer>
          <Button
            variant="text"
            onClick={() => {
              track("plan_downgrade_cancelled_on_reason", { downgrade_attempt_id: downgradeAttemptId });
              closeModal();
            }}
          >
            {t("DowngradeReasonModal.ModalWrapper.Footer.Button.Cancel")}
          </Button>
          <StyledButton
            data-cy="downgrade-modal-button"
            variant="warning"
            onClick={() => {
              downgradePlan(reasonMoreInfo, storeId).then(() =>
                track("plan_downgrade_provided_reason", { downgrade_attempt_id: downgradeAttemptId })
              );
            }}
            disabled={reasonMoreInfo.length < 100}
          >
            {t("DowngradeReasonModal.Button.Downgrade")}
          </StyledButton>
        </ModalWrapper.Footer>
      </Loadable>
    </ModalWrapper>
  );
};

DowngradeReasonModal.propTypes = {
  storeId: PropTypes.string.isRequired,
  isDowngrading: PropTypes.bool.isRequired,
  downgradePlan: PropTypes.func.isRequired,
  storeName: PropTypes.string.isRequired,
  trackDowngradeStep: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isDowngrading: state.settings.isDowngrading,
    storeId: state.settings.storeId,
    storeName: state.store.information.account.name
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal, downgradePlan, trackDowngradeStep }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DowngradeReasonModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/DowngradeReasonModal/DowngradeReasonModal.js