import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
// Icons
import checkMark from "../../../../assets/checked-1.svg";
import locationIcon from "../../../../assets/locationIcon.svg";
import moneyIcon from "../../../../assets/moneyIcon.svg";
import newIcon from "../../../../assets/newIcon.svg";
import tagIcon from "../../../../assets/tagIcon.svg";
// Components
import { default as Loadable } from "../../../_Shared/commonLoadable";
import CreditCard from "../../CreditCard";
import InputAddress from "../../Forms/inputAddress";
import OrderReview from "../../Forms/orderReview";
import PaymentComplete from "../../Forms/paymentComplete";
import ProductVariation from "../../Forms/productVariation";
import { BasicModal } from "newDropshipperApp/component/common/modals/BasicModal";
// Actions
import { updateForm, cleanForm } from "../../../../actions/forms";
// API Call
import StoreApiCall from "../../../../utils/storeApiCall";
// Utils
import { media } from "newDropshipperApp/utils/media";
//Modules
import { placeSampleOrder, cleanConfirmation } from "../../../../newDropshipperApp/module/store/order";
// Style
import { FooterButton } from "./index.style";

const ModalWithZIndexDontCopyMe = styled(BasicModal)`
  z-index: 1051;
  & .modal-content {
    max-height: 95%;
    overflow: auto;
  }

  ${media.PHONE`
    & .modal-content {
      min-width: 95%
    }
  `};
`;

const Header = styled.div`
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 18px;
  display: flex;
`;

const Footer = styled.div`
  padding: 20px 25px;
  background-color: #f2f2fa;
  border-radius: 0 0 6px 6px;
  position: relative;
  bottom: -24px;
  left: -24px;
  width: calc(100% + 48px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepLabel = styled.div`
  font-size: 14px;
`;

const Body = styled.div`
  font-size: 14px;
  max-width: 450px;
  width: 94%;
  min-width: 240px;
  padding: 20px 0;
  label {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: bold;
    letter-spacing: 0.4px;
  }
`;

class SampleOrderModal extends Component {
  state = {
    currentStep: 0,
    variationSelected: "",
    isLoading: false,
    orderSample: {
      characteristics: {}
    },
    paymentConfirmationLink: null
  };

  handleFormChanged = event => {
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    let fieldLabel = event.target.label;
    const currentForm = ["PRODUCT_VARIATION", "INPUT_ADDRESS"];
    // Check what step and update the right form
    this.props.updateForm(currentForm[this.state.currentStep], {
      [fieldName]: fieldValue
    });
    this.props.updateForm("INFORMATIONS", { [fieldName]: fieldLabel });
  };

  handleListingSelected = listing => {
    this.props.updateForm("INFORMATIONS", {
      listingSelected: listing
    });
  };

  handleVariantSelected = product => {
    this.props.updateForm("INFORMATIONS", {
      productSelected: product
    });
  };

  handleStripeCardAssignment = card => {
    this.props.updateForm("INFORMATIONS", { card: card });
  };

  handleOrderReviewLoaded = bool => {
    this.props.updateForm("INFORMATIONS", { orderReviewLoaded: bool });
  };

  steps = [
    {
      icon: newIcon,
      component: (
        <ProductVariation
          handleFormChanged={this.handleFormChanged}
          handleListingSelected={this.handleListingSelected}
          handleVariantSelected={this.handleVariantSelected}
          listing={this.props.listing}
          state={this.state}
        />
      )
    },
    {
      icon: locationIcon,
      component: <InputAddress handleFormChanged={this.handleFormChanged} />
    },
    {
      icon: moneyIcon,
      component: (
        <CreditCard
          renderModal={false}
          includeSubtext={false}
          handleStripeCardAssignment={this.handleStripeCardAssignment}
          stripeApiKey={process.env.REACT_APP_STRIPE_KEY2}
          type="v2"
        />
      )
    },
    {
      stepText: "Final Step",
      icon: tagIcon,
      component: <OrderReview handleOrderReviewLoaded={this.handleOrderReviewLoaded} />
    },
    {
      icon: checkMark,
      component: <PaymentComplete />
    }
  ];

  nextStep = () => {
    const { currentStep } = this.state;
    currentStep < this.steps.length - 1 && this.setState({ currentStep: currentStep + 1 });
  };

  prevStep = () => {
    const { currentStep } = this.state;

    if (currentStep === 3) {
      this.handleOrderReviewLoaded(false);
    }

    if (currentStep > 0) {
      this.setState({ currentStep: currentStep - 1 });
    } else {
      this.props.closeModal();
      this.props.cleanForm();
    }
  };

  // TODO - improve this code
  currentAction = () => {
    const { currentStep } = this.state;
    const { inputAddress } = this.props.form;
    if (currentStep === 0) {
      this.nextStep();
    } else if (currentStep === 1) {
      inputAddress.line_one ? this.updateAddress() : this.saveAddress();
    } else if (currentStep === 2) {
      this.nextStep();
    } else if (currentStep === 3) {
      this.placeOrder();
    } else if (currentStep === 4) {
      this.props.closeModal();
      this.props.cleanForm();
      this.props.cleanConfirmation();
    }
  };

  // TODO - improve this code
  isButtonDisabled() {
    const { currentStep } = this.state;
    const form = this.props.form;
    const isAddressFormValid = Object.keys(form.inputAddress).every(k => form.inputAddress[k]);

    if (form.characteristics && form.quantity && currentStep === 0) {
      return false;
    } else if (isAddressFormValid && currentStep === 1) {
      return false;
    } else if (form.card && currentStep === 2) {
      return false;
    } else if (form.orderReviewLoaded && currentStep === 3) {
      return false;
    } else if (currentStep === 4) {
      return false;
    } else {
      return true;
    }
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  // Step 2 - Input Address
  saveAddress() {
    this.setLoading(true);
    const { inputAddress } = this.props.form;
    StoreApiCall.validateAddress(inputAddress)
      .then(() => {
        StoreApiCall.saveAddress(inputAddress);
        this.setLoading(false);
        this.nextStep();
      })
      .catch(error => {
        this.setLoading(false);
        this.props.setAlertMessage(error.json.errors, "error");
      });
  }

  updateAddress() {
    this.setLoading(true);
    const { inputAddress } = this.props.form;
    StoreApiCall.validateAddress(inputAddress)
      .then(() => {
        StoreApiCall.updateAddress(inputAddress);
        this.setLoading(false);
        this.nextStep();
      })
      .catch(error => {
        this.setLoading(false);
        this.props.setAlertMessage(error.json.errors, "error");
      });
  }

  placeOrderSuccess = () => {
    this.setLoading(false);
    this.nextStep();
  };

  placeOrderFailure = () => {
    this.setLoading(false);
  };

  // Step 4 - Order Review
  placeOrder = () => {
    const form = this.props.form;
    const address = form.inputAddress;
    this.setLoading(true);
    const data = {
      integrated_store_id: localStorage.getItem("integrated_store_id"),
      listing_id: form.listingSelected.id,
      quantity: form.quantity,
      phone_number: address.phone,
      note: form.productVariation.note,
      variation_id: form.productSelected.id,
      address: {
        ...address
      }
    };
    this.props.placeSampleOrder(data, this.placeOrderSuccess, this.placeOrderFailure);
  };

  renderTitle = () => {
    const { paymentConfirmationRequired, t } = this.props;
    const { currentStep } = this.state;

    if (currentStep === 0) {
      return t("SampleOrderModal.Title.SelectVariation");
    } else if (currentStep === 1) {
      return t("SampleOrderModal.Title.ShippingAddress");
    } else if (currentStep === 2) {
      return t("SampleOrderModal.Title.PaymentMethod");
    } else if (currentStep === 3) {
      return t("SampleOrderModal.Title.Review");
    } else if (currentStep === 4 && paymentConfirmationRequired) {
      return t("SampleOrderModal.Title.PaymentConfirmationRequired");
    } else if (currentStep === 4 && !paymentConfirmationRequired) {
      return t("SampleOrderModal.Title.OrderPlaced");
    }
  };

  rendeStepText = () => {
    const { paymentConfirmationRequired, t } = this.props;
    const { currentStep } = this.state;
    const totalSteps = 4;

    if (currentStep < totalSteps - 1) {
      return t("SampleOrderModal.Steps", { current: currentStep + 1, total: totalSteps });
    } else if (currentStep === 3) {
      return t("SampleOrderModal.FinalStep");
    } else if (currentStep === 4 && paymentConfirmationRequired) {
      return t("SampleOrderModal.ConfirmPayment");
    } else if (currentStep === 4 && !paymentConfirmationRequired) {
      return t("SampleOrderModal.Finished");
    }
  };

  render() {
    const { currentStep } = this.state;
    const { icon, component } = this.steps[currentStep];
    const title = this.renderTitle(currentStep);
    const stepText = this.rendeStepText(currentStep);
    const { isOpen, closeModal, cleanForm } = this.props;

    return (
      <ModalWithZIndexDontCopyMe
        open={isOpen}
        onClose={() => {
          closeModal();
          cleanForm();
        }}
        withCloseButton
      >
        <Loadable active={this.state.isLoading}>
          <Header>
            <img src={icon} alt="" style={{ marginRight: "10px", maxHeight: "25px" }} />
            <span>{title}</span>
          </Header>
          <Body>{component}</Body>
          <Footer>
            <StepLabel>{stepText}</StepLabel>
            {this.renderFooterButtons()}
          </Footer>
        </Loadable>
      </ModalWithZIndexDontCopyMe>
    );
  }

  renderFooterButtons() {
    const { currentStep } = this.state;
    const { t } = this.props;

    let continueButtonText = t("SampleOrderModal.Footer.Continue");
    if (currentStep === 3) {
      continueButtonText = t("SampleOrderModal.Footer.PlaceOrder");
    } else if (currentStep === 4) {
      continueButtonText = t("SampleOrderModal.Footer.Close");
    }
    return (
      <div>
        {currentStep < 4 && (
          <FooterButton variant="text" onClick={this.prevStep}>
            {currentStep === 0 ? t("SampleOrderModal.Footer.Cancel") : t("SampleOrderModal.Footer.GoBack")}
          </FooterButton>
        )}
        <FooterButton disabled={this.isButtonDisabled()} variant="brand" onClick={this.currentAction}>
          {continueButtonText}
        </FooterButton>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateForm,
      cleanForm,
      placeSampleOrder,
      cleanConfirmation
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    form: state.forms,
    paymentConfirmationRequired: state.order.paymentConfirmationRequired
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SampleOrderModal)
);



// WEBPACK FOOTER //
// ./src/components/_Shared/Modals/SampleOrderModal/index.js