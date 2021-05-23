// Libs
import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import moment from "moment-timezone";

// Actions
import { isAnnual } from "../../../../actions/upgrade";
import { closeModal } from "../../../../actions/ui";

// Modules
import { promotionClick } from "../../../../newDropshipperApp/module/store/promotion";

// Components
import ModalWrapper from "../../ModalWrapper";
import Countdown from "../../../_Shared/Countdown/Countdown";

// Style
import "./CountdownPaywallModal.css";

const CountdownPaywallModal = ({
  isAnnual,
  showPromotion,
  hasClickedCurrentPromotion,
  currentPromotionEndTime,
  promotionClick,
  closeModal
}) => {
  useEffect(() => {
    return () => {
      promotionClick();
    };
  }, []);

  const startFinalDate = () => {
    const date = moment.tz(currentPromotionEndTime, "America/Los_Angeles").format();
    return new Date(date).getTime();
  };

  return (
    <Fragment>
      {!hasClickedCurrentPromotion && showPromotion && currentPromotionEndTime ? (
        <ModalWrapper size="countdown-paywall-modal-size">
          <div className="countdown-paywall-modal__container">
            <ModalWrapper.Header>
              <div className="countdown-paywall-modal-header">
                Cyber Monday Only!
                <span>
                  Up to <strong>55%</strong> off Spocket Annual Plans!
                </span>
              </div>
            </ModalWrapper.Header>
            <ModalWrapper.Body>
              <div className="countdown-paywall-modal__body">
                <div className="countdown-paywall-modal__timer">
                  <Countdown splitTime showDays={false} endDate={startFinalDate()} />
                </div>
                <a
                  className="countdown-paywall-modal__btn"
                  onClick={() => {
                    isAnnual(true);
                    browserHistory.push("/settings/plan?annual=true");
                    closeModal();
                  }}
                >
                  {" "}
                  Upgrade NOW!
                </a>
              </div>
            </ModalWrapper.Body>
          </div>
        </ModalWrapper>
      ) : null}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    showPromotion: state.settings.dropshipperData.show_promotion,
    hasClickedCurrentPromotion: state.settings.dropshipperData.has_clicked_current_promotion,
    currentPromotionEndTime: state.settings.dropshipperData.current_promotion_end_time
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isAnnual, promotionClick, closeModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountdownPaywallModal);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/CountdownPaywallModal/CountdownPaywallModal.js