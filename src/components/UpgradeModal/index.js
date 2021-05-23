// Libs
import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { IntercomAPI } from "react-intercom";
import { useQueryParam, StringParam } from "use-query-params";
import { useTranslation } from "react-i18next";

// Components
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Plans from "../Plans";

// Actions
import { closeUpgradeModal } from "../../actions/upgrade.js";
import { closeModal } from "../../actions/ui";
import { trackPaywallView, updatePaywallView } from "../../actions/tracker";

// Utils
import { numberOfColumnsPerRow, calculatePositionForIndex } from "../../utils/columns";

// Style
import "./UpgradeModal.css";

const UpgradeModal = (
  {
    eventId,
    modalOpen,
    dataModal,
    closeModal,
    currentModal,
    trackPaywallView,
    updatePaywallView,
    closeUpgradeModal
  },
  props
) => {
  // When this modal is open, we are adding this query string to track it on Google Analytics
  const setPricing = useQueryParam("pricing", StringParam)[1];

  const { t } = useTranslation();

  useEffect(() => {}, []);

  useEffect(() => {
    IntercomAPI("trackEvent", "Paywall");
    triggerTrackPaywallView();

    setPricing(true, "pushIn");

    // returned function will be called on component unmount
    return () => {
      setPricing(null);
    };
  }, []);

  const triggerTrackPaywallView = () => {
    const {
      referrerContextEntityId,
      referrerPosition,
      referrerContext,
      referrerPage,
      upgradeStep
    } = dataModal;

    if (referrerPage && referrerContext) {
      trackPaywallView(
        referrerPage,
        referrerContext,
        referrerContextEntityId || "",
        calculatePositionForIndex(referrerPosition),
        numberOfColumnsPerRow(),
        upgradeStep
      );
    } else if (eventId) {
      updatePaywallView({
        eventId,
        upgradeStep: "viewed_all_plans"
      });
    }
  };

  return (
    <Modal
      bsSize="lg upgrade-modal__size"
      backdropClassName="UpgradeModal__backdrop"
      show={modalOpen || currentModal === "UPGRADE_MODAL"}
      onHide={() => {
        window.history.back();
        closeUpgradeModal();
        closeModal();
      }}
    >
      <Modal.Body className="text-center">
        <div className="upgrade-modal__body">
          <div className="Upgrade-modal-title" data-cy="upgrade-modal-title">
            {t("UpgradeModal.Modal.Title")}
          </div>
          <Plans {...props} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeUpgradeModal,
      updatePaywallView,
      trackPaywallView,
      closeModal
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    currentModal: state.ui.currentModal,
    modalOpen: state.upgrade.modalOpen,
    eventId: state.eventTracker.eventId,
    dataModal: state.ui.data || false
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpgradeModal);



// WEBPACK FOOTER //
// ./src/components/UpgradeModal/index.js