import React from "react";

import InputAddressModal from "../Modals/InputAddressModal";
import SampleOrderModal from "../Modals/SampleOrderModal";
import UpgradeSuccessModal from "../Modals/UpgradeSuccessModal";
import CreditCardModal from "../Modals/CreditCardModal";
import DowngradeSuccessModal from "../Modals/DowngradeSuccessModal";
import SignOutModal from "../Modals/SignOutModal";
import UpgradeReasonModal from "../Modals/UpgradeReasonModal";
import TutorialModal from "../Modals/TutorialModal/TutorialModal";
import WistiaModal from "../Modals/WistiaModal/WistiaModal";
import ConnectStoreModal from "../Modals/ConnectStoreModal/ConnectStoreModal";
import SpocketDealsModal from "../Modals/SpocketDealsModal/SpocketDealsModal";
import InviteShareModal from "../Modals/InviteShareModal/InviteShareModal";
import CardDeclineModal from "../Modals/CardDeclineModal/CardDeclineModal";
import UpgradeModal from "../../UpgradeModal";
import CountdownPaywallModal from "../Modals/CountdownPaywallModal/CountdownPaywallModal";
import ReturnPolicyModal from "../Modals/ReturnPolicyModal/ReturnPolicyModal";
import PauseStoreModal from "../Modals/PauseStoreModal/PauseStoreModal";
import ConfirmCheckoutOrderModal from "../Modals/ConfirmCheckoutOrderModal/ConfirmCheckoutOrderModal";
import AfterConfirmCheckoutOrderModal from "../Modals/AfterConfirmCheckoutOrderModal/AfterConfirmCheckoutOrderModal";
import RatingCaptureModal from "../Modals/RatingCaptureModal/RatingCaptureModal";
import ConfirmPasswordModal from "../Modals/ConfirmPasswordModal/ConfirmPasswordModal";
import DowngradeReasonModal from "../Modals/DowngradeReasonModal/DowngradeReasonModal";

// New Dropshipper
import TopCategoriesModal from "../../../newDropshipperApp/component/modalConductor/TopCategoriesModal";
import UpgradeConfirmationModal from "../../../newDropshipperApp/component/UpgradeConfirmationModal";
import FiftyOff3MonthsOfferModal from "../../../newDropshipperApp/component/modalConductor/FiftyOff3MonthsOfferModal";
import FreeTrialOfferSuccessModal from "../../../newDropshipperApp/component/modalConductor/FreeTrialOfferSuccessModal";
import FiftyOff3MonthsOfferSuccessModal from "../../../newDropshipperApp/component/modalConductor/FiftyOff3MonthsOfferSuccessModal";
import ReviewSpocketModal from "../../../newDropshipperApp/component/modalConductor/ReviewSpocketModal";
import FeedbackFormModal from "../../../newDropshipperApp/component/modalConductor/FeedbackFormModal";
import FeedbackDynamicStoreModal from "../../../newDropshipperApp/component/modalConductor/FeedbackDynamicStoreModal";
import AdvancedFiltersModal from "../../../newDropshipperApp/component/modalConductor/AdvancedFiltersModal";
import AnnualPromotionModal from "../../../newDropshipperApp/component/modalConductor/AnnualPromotionModal";
import TwoWeeksFreeTrialOfferModal from "../../../newDropshipperApp/component/modalConductor/TwoWeeksFreeTrialOfferModal";
import RemindMeLaterModal from "../Modals/RemindMeLaterModal/RemindMeLaterModal";
import AlibabaOrderDetails from "newDropshipperApp/component/modalConductor/AlibabaOrderDetails";
import AlibabaOrderErrors from "newDropshipperApp/component/modalConductor/AlibabaOrderErrors";
import WhatYouWillLoseModal from "newDropshipperApp/component/modalConductor/WhatYouWillLoseModal";
import ListingDetailModal from "newDropshipperApp/component/modalConductor/ListingDetailModal";
import { LoadingModal } from "newDropshipperApp/component/modalConductor/LoadingModal";

const ModalConductor = ({ currentModal }) => {
  const modalConductor = {
    INPUT_ADDRESS: <InputAddressModal />,
    SAMPLE_ORDER: <SampleOrderModal />,
    UPGRADE_REASON: <UpgradeReasonModal />,
    PLAN_UPGRADE_CREDIT_CARD: <UpgradeConfirmationModal />,
    UPGRADE_SUCCESS: <UpgradeSuccessModal />,
    CREDIT_CARD: <CreditCardModal />,
    CREDIT_CARD_ORDERS: <CreditCardModal type="v2" stripeApiKey={process.env.REACT_APP_STRIPE_KEY2} />,
    DOWNGRADE_SUCCESS: <DowngradeSuccessModal />,
    SIGN_OUT: <SignOutModal />,
    TUTORIAL: <TutorialModal />,
    WISTIA: <WistiaModal />,
    SPOCKET_DEALS: <SpocketDealsModal />,
    CONNECT_STORE: <ConnectStoreModal />,
    INVITE_SHARE: <InviteShareModal />,
    CARD_DECLINE: <CardDeclineModal />,
    UPGRADE_MODAL: <UpgradeModal />,
    COUNTDOWN_PAYWALL_MODAL: <CountdownPaywallModal />,
    RETURN_POLICY_MODAL: <ReturnPolicyModal />,
    PAUSE_STORE_MODAL: <PauseStoreModal />,
    REMIND_ME_LATER_STORE_MODAL: <RemindMeLaterModal />,
    CONFIRM_CHECKOUT_ORDER_MODAL: <ConfirmCheckoutOrderModal />,
    RATING_CAPTURE_MODAL: <RatingCaptureModal />,
    AFTER_CONFIRM_CHECKOUT_ORDER_MODAL: <AfterConfirmCheckoutOrderModal />,
    CONFIRM_PASSWORD_MODAL: <ConfirmPasswordModal />,
    DOWNGRADE_REASON_MODAL: <DowngradeReasonModal />,
    TOP_CATEGORIES_MODAL: <TopCategoriesModal />,
    FIFTY_OFF_3_MONTHS_OFFER_MODAL: <FiftyOff3MonthsOfferModal />,
    FREE_TRIAL_OFFER_SUCCESS_MODAL: <FreeTrialOfferSuccessModal />,
    FIFTY_OFF_3_MONTHS_OFFER_SUCCESS_MODAL: <FiftyOff3MonthsOfferSuccessModal />,
    REVIEW_SPOCKET_MODAL: <ReviewSpocketModal />,
    FEEDBACK_FORM_MODAL: <FeedbackFormModal />,
    FEEDBACK_DYNAMIC_STORE: <FeedbackDynamicStoreModal />,
    ADVANCED_FILTERS_MODAL: <AdvancedFiltersModal />,
    ANNUAL_PROMOTION_MODAL: <AnnualPromotionModal />,
    TWO_WEEKS_FREE_TRIAL_OFFER_MODAL: <TwoWeeksFreeTrialOfferModal />,
    WHAT_YOU_WILL_LOSE_MODAL: <WhatYouWillLoseModal />,
    ALIBABA_ORDER_DETAILS: <AlibabaOrderDetails />,
    ALIBABA_ORDER_ERRORS: <AlibabaOrderErrors />,
    LISTING_DETAIL_MODAL: <ListingDetailModal />,
    LOADING_MODAL: <LoadingModal />
  };

  return currentModal ? modalConductor[currentModal] : null;
};

export default ModalConductor;



// WEBPACK FOOTER //
// ./src/components/_Shared/ModalConductor/index.js