// Libs
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import { showModal, closeModal } from "../../../actions/ui";
import { trackDowngradeStep } from "../../module/downgradeStep";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";
import Category from "./topCategoriesModal/Category";

// Images
import bgKidBabies from "./topCategoriesModal/images/bg-kid-babies.jpg";
import bgPets from "./topCategoriesModal/images/bg-pets.jpg";
import bgWomenClothing from "./topCategoriesModal/images/bg-women-clothing.jpg";
import bgHomeGarden from "./topCategoriesModal/images/bg-home-garden.jpg";
import bgHealthcare from "./topCategoriesModal/images/bg-healthcare.jpg";
import bgBathBeauty from "./topCategoriesModal/images/bg-bath-beauty.jpg";

// Style
import "./TopCategoriesModal.css";

const categories = [
  {
    name: "Women's Clothing",
    image: bgWomenClothing,
    soldQty: "16,650",
    qs: "category=Women%27s%20Clothing"
  },
  {
    name: "Healthcare",
    image: bgHealthcare,
    soldQty: "7,460",
    qs: "category=Bath%20%26%20Beauty&subcategory=Healthcare"
  },
  {
    name: "Kids & Babies",
    image: bgKidBabies,
    soldQty: "4,900",
    qs: "category=Kids%20%26%20Babies"
  },
  {
    name: "Pets",
    image: bgPets,
    soldQty: "1,310",
    qs: "category=Pets"
  },
  {
    name: "Bath & Beauty",
    image: bgBathBeauty,
    soldQty: "1,140",
    qs: "category=Bath%20%26%20Beauty"
  },
  {
    name: "Home & Garden",
    image: bgHomeGarden,
    soldQty: "894",
    qs: "category=Home%20%26%20Garden"
  }
];

const TopCategoriesModal = ({ showModal, closeModal, trackDowngradeStep }) => {
  const getUserName = () => {
    const userName = localStorage.getItem("user_name");

    return userName ? `, ${userName}...` : "";
  };

  return (
    <ModalWrapper
      size="small"
      className="TopCategoriesModal__container"
      backdropClassName="TopCategoriesModal__backdrop"
    >
      <ModalWrapper.Header>
        <div className="TopCategoriesModal__header">
          Before you downgrade{getUserName()}
          <span>Why not take a look at our best selling categories?</span>
        </div>
      </ModalWrapper.Header>

      <ModalWrapper.Body>
        <div className="TopCategoriesModal__body">
          {categories.map(({ name, image, soldQty, qs }, index) => {
            return (
              <Category
                onClick={closeModal}
                name={name}
                image={image}
                soldQty={soldQty}
                stampText={index + 1}
                qs={qs}
              />
            );
          })}
        </div>
      </ModalWrapper.Body>
      <ModalWrapper.Footer>
        <div className="TopCategoriesModal__downgrade-btn">
          <span
            onClick={() => {
              trackDowngradeStep("has_clicked_past_offer");
              showModal("CONFIRM_PASSWORD_MODAL");
            }}
          >
            Continue to downgrade
          </span>
        </div>
      </ModalWrapper.Footer>
    </ModalWrapper>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, closeModal, trackDowngradeStep }, dispatch);
}
export default connect(
  null,
  mapDispatchToProps
)(TopCategoriesModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/TopCategoriesModal.js