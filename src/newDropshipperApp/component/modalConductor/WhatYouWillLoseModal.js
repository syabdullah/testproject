// Libs
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import { showModal } from "../../../actions/ui";
import { trackDowngradeStep } from "../../module/downgradeStep";
import { createOffer } from "../../module/store/offers";

// Components
import ModalWrapper from "../../../components/_Shared/ModalWrapper";
import { Button } from "../../spocketUI";
import { default as Loadable } from "../../../components/_Shared/commonLoadable";
import { Emoji } from "newDropshipperApp/component/Emoji";

// Modules
import { getChurnProducts } from "../../module/churnProducts";

// Images
import crownPremiumIcon from "../../images/crown-premium.svg";
import fireIcon from "../../images/fire-icon.svg";

// i18n
import { Trans, useTranslation } from "react-i18next";

// Style
import "./WhatYouWillLoseModal.css";
import {
  Tag,
  Wrap,
  Title,
  Header,
  IconBg,
  Section,
  Subtitle,
  WrapButton,
  Card,
  CardsWrap,
  CardTitle,
  PremiumTag,
  BestSellerIcon,
  SkeletonImage
} from "./WhatYouWillLoseModalStyle";

const WhatYouWillLoseModal = ({ showModal, trackDowngradeStep, isFetching, activeOffer, createOffer }) => {
  const [churnProducts, setChurnProducts] = useState({ products: [] });
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const resultChurnProducts = await getChurnProducts();
      setChurnProducts(resultChurnProducts.json);
    })();
  }, []);

  const getUserName = () => {
    const userName = localStorage.getItem("user_name");

    return userName ? `${userName}, ` : "";
  };

  const getOfferButton = () => {
    return (
      <WrapButton>
        <Button variant="primaryBig" onClick={() => createOffer({ offerType: "fifty_off_3_months" })}>
          {t("WhatYouWillLoseModal.Button.Offer")}
        </Button>
      </WrapButton>
    );
  };

  const getDowngradeButton = () => {
    return (
      <Button variant="text" onClick={() => showModal("DOWNGRADE_REASON_MODAL")}>
        {t("WhatYouWillLoseModal.Button.Downgrade")}
      </Button>
    );
  };

  const renderProductSection = () => {
    if (churnProducts.product_count >= 5) {
      return (
        <Section>
          <Wrap>
            <IconBg>
              <Emoji label="Card File Box" symbol="🗃" />
            </IconBg>
            <Title>
              <Trans i18nKey="WhatYouWillLoseModal.ProductSection.Title">
                You’ll lose all{" "}
                <span>{{ product_count: churnProducts.product_count }} imported products</span>
              </Trans>
            </Title>
          </Wrap>
          {renderProducts()}
        </Section>
      );
    }
  };

  const renderProducts = () => {
    return (
      <CardsWrap>
        {churnProducts.products.map((product, index) => {
          if (churnProducts.product_count === 5) {
            return (
              <Card>
                <img src={product.listing_images[0].normal} alt="card" />

                {product.premium && (
                  <PremiumTag>
                    <img src={crownPremiumIcon} alt="crown" />
                    {t("WhatYouWillLoseModal.Product.PremiumTag")}
                  </PremiumTag>
                )}

                {product.best_selling && (
                  <BestSellerIcon src={fireIcon}>
                    <img src={fireIcon} alt="fire" />
                  </BestSellerIcon>
                )}
                <CardTitle>{product.title}</CardTitle>
              </Card>
            );
          } else {
            if (index <= 3) {
              return (
                <Card>
                  <img src={product.listing_images[0].normal} alt="card" />

                  {product.premium && (
                    <PremiumTag>
                      <img src={crownPremiumIcon} alt="crown" />
                      {t("WhatYouWillLoseModal.Product.PremiumTag")}
                    </PremiumTag>
                  )}

                  {product.best_selling && (
                    <BestSellerIcon src={fireIcon}>
                      <img src={fireIcon} alt="fire" />
                    </BestSellerIcon>
                  )}
                  <CardTitle>{product.title}</CardTitle>
                </Card>
              );
            }
          }
          // eslint-disable-next-line
          return;
        })}

        {churnProducts.product_count > 5 && (
          <Card>
            <SkeletonImage>
              <div>
                {t("WhatYouWillLoseModal.Product.SkeletonImage", {
                  product_count: churnProducts.product_count - 4
                })}
              </div>
            </SkeletonImage>
          </Card>
        )}
      </CardsWrap>
    );
  };

  return (
    <ModalWrapper
      className="WhatYouWillLoseModal__container"
      backdropClassName="WhatYouWillLoseModal__backdrop"
    >
      <Loadable active={!("product_count" in churnProducts) || isFetching}>
        <ModalWrapper.Header>
          <Header>
            {getUserName()} {t("WhatYouWillLoseModal.ModalWrapper.Header")}
          </Header>
        </ModalWrapper.Header>
        <ModalWrapper.Body>
          {renderProductSection()}

          <Section onClick={() => createOffer({ offerType: "fifty_off_3_months" })} cursorPointer>
            <Wrap>
              <IconBg>
                <Emoji label="Card File Box" symbol="🏷" />
              </IconBg>
              <div>
                <Title>
                  <Tag>{t("WhatYouWillLoseModal.ModalWrapper.Title.Tag")}</Tag>
                  {t("WhatYouWillLoseModal.ModalWrapper.Title")}
                </Title>
                <Subtitle>{t("WhatYouWillLoseModal.ModalWrapper.Subtitle")}</Subtitle>
              </div>
            </Wrap>
            {getOfferButton()}
          </Section>

          {getDowngradeButton()}
        </ModalWrapper.Body>
      </Loadable>
    </ModalWrapper>
  );
};

function mapStateToProps(state) {
  const { currentSubscription } = state.settings;

  return {
    isFetching: state.store.offers.isFetching,
    currentPlan: state.settings.currentPlan,
    currentSubscription: currentSubscription
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, trackDowngradeStep, createOffer }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatYouWillLoseModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/WhatYouWillLoseModal.js