// Libs
import React from "react";
import { browserHistory } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "../../../../newDropshipperApp/spocketUI";

// Actions
import { closeModal } from "../../../../actions/ui";

// Components
import ModalWrapper from "../../ModalWrapper";

// Style
import "./RemindMeLaterModal.css";
import { Trans, useTranslation } from "react-i18next";

function RemindMeLaterModal({ closeModal }) {
  const { t } = useTranslation();

  return (
    <ModalWrapper onHide={() => browserHistory.push("/search")}>
      <div className="remind-me-later-modal__container">
        <ModalWrapper.Header>
          <div className="remind-me-later-modal__title">{t("RemindMeLaterModal.Header.ReminderSet")}</div>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          <p>
            <Trans i18nKey="RemindMeLaterModal.Body.ReminderSet">
              Your reminder is set and we will{" "}
              <strong>{{ daysBefore: t("RemindMeLaterModal.Body.DaysBefore") }}</strong> your benefits are
              renewed, until then keep going with your entrepreneurial journey.
            </Trans>
          </p>
          <footer className="remind-me-later-modal__footer">
            <Button
              variant="primaryBig"
              onClick={() => {
                closeModal();
                browserHistory.push("/search");
              }}
              bsStyle="success"
            >
              {t("RemindMeLaterModal.Button.Continue")}
            </Button>
          </footer>
        </ModalWrapper.Body>
      </div>
    </ModalWrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(RemindMeLaterModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/RemindMeLaterModal/RemindMeLaterModal.js