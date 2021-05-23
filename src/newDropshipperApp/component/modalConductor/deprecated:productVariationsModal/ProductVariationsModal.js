import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Table, Row, Col } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import { withTranslation } from "react-i18next";

import colors from "newDropshipperApp/spocketUI/theme/colors";
import { Button, Flex } from "newDropshipperApp/spocketUI";
import noImageIcon from "./no-image-icon.svg";

import { BasicModal } from "newDropshipperApp/component/common/modals/BasicModal";
// this component along with many other components in the project uses CSS from globally imported deprecated.style.css in Navigation/index.js

const StyledButton = styled(Button)`
  font-weight: 600;
`;

const ModalWithZIndexDontCopyMe = styled(BasicModal)`
  z-index: 1051;
`;

const Title = styled.h4`
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 18px;
`;

const LowInventoryTag = styled.div`
  color: ${colors.white.colorWhite};
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  padding: ${props => (props.length > 9 ? "0px 4px" : "2px 4px")};
  margin: 0px;
  margin-left: 3px;
  border-radius: 4px;
  width: fit-content;
  background-color: #ffbb00;
  text-align: center;
`;

class VariationsModal extends Component {
  state = {
    currentImageIndex: 0,
    isLightboxOpen: false,
    lightboxImageUrl: ""
  };

  forceDownload(url, fileName) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(this.response);
      let tag = document.createElement("a");
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    };
    xhr.send();
  }

  openInNewTab(url) {
    window.open(url, "_blank");
  }

  renderLightbox(variations) {
    const { currentImageIndex } = this.state;
    const imagesUrls = variations.map(variation => variation.image);
    const customStyles = {
      overlay: {
        zIndex: 1060
      }
    };
    return (
      <Lightbox
        mainSrc={imagesUrls[currentImageIndex]}
        nextSrc={imagesUrls[(currentImageIndex + 1) % imagesUrls.length]}
        prevSrc={imagesUrls[(currentImageIndex + imagesUrls.length - 1) % imagesUrls.length]}
        onMovePrevRequest={() => {
          this.setState({
            currentImageIndex: (currentImageIndex + imagesUrls.length - 1) % imagesUrls.length
          });
        }}
        onMoveNextRequest={() =>
          this.setState({
            currentImageIndex: (currentImageIndex + 1) % imagesUrls.length
          })
        }
        reactModalStyle={customStyles}
        onCloseRequest={() => this.setState({ isLightboxOpen: false })}
      />
    );
  }

  render() {
    const { variations, variationProperties, imageSpecifications, closeModal, isOpen, t } = this.props;
    const imagesUrls = variations.filter(variation => variation.image !== null);

    return (
      <Fragment>
        {this.state.isLightboxOpen && this.renderLightbox(variations)}

        <ModalWithZIndexDontCopyMe open={isOpen} onClose={closeModal} withCloseButton>
          <Title>{t("ProductVariationsModal.Title")}</Title>
          <Row>
            <Col md={12}>
              <div
                style={{
                  height: "266px",
                  overflow: "auto",
                  marginBottom: "15px"
                }}
              >
                <Table
                  responsive
                  style={{ width: "100%", marginBottom: "15px" }}
                  className="product_variations_modal__table"
                >
                  <thead>
                    <tr>
                      {imagesUrls.length > 0 && <th>{t("ProductVariationsModal.Table.Image")}</th>}
                      <th>{variationProperties.property_one}</th>
                      <th>{variationProperties.property_two}</th>
                      <th>{variationProperties.property_three}</th>
                      <th>{t("ProductVariationsModal.Table.Inventory")}</th>
                      <th>{t("ProductVariationsModal.Table.Price")}</th>
                    </tr>
                  </thead>
                  <tbody className="product_variations_tbody">
                    {variations.map((variation, i) => {
                      const {
                        inventory,
                        image,
                        price_formatted,
                        full_price_formatted,
                        property_one_value,
                        property_two_value,
                        property_three_value
                      } = variation;
                      const showLowInventoryTag = inventory <= 10;
                      return (
                        <tr key={i}>
                          {imagesUrls.length > 0 && (
                            <td>
                              <img
                                key={i}
                                src={image ? image : noImageIcon}
                                alt="Product Variation"
                                onClick={() =>
                                  image &&
                                  this.setState({
                                    isLightboxOpen: true,
                                    currentImageIndex: i
                                  })
                                }
                              />
                            </td>
                          )}
                          <td>{property_one_value}</td>
                          <td>{property_two_value}</td>
                          <td>{property_three_value}</td>
                          <td>
                            <Flex alignItems="center" justifyContent="center">
                              {inventory}
                              {showLowInventoryTag && (
                                <LowInventoryTag>
                                  {t("ProductListItem.ItemVariant.LowStock.Label")}
                                </LowInventoryTag>
                              )}
                            </Flex>
                          </td>
                          <td>
                            {price_formatted}
                            <strike>
                              <small>{full_price_formatted}</small>
                            </strike>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          {imageSpecifications && (
            <div>
              <Row>
                <Col md={6}>
                  <h4 className="product_variations_title">
                    {t("ProductVariationsModal.ImageSpecifications.Title")}
                  </h4>
                </Col>
                <Col md={6} className="product_variations_download">
                  <StyledButton onClick={() => this.openInNewTab(imageSpecifications)} variant="brand">
                    <i className="fa fa-download" aria-hidden="true" style={{ marginRight: "7px" }} />
                    {t("ProductVariationsModal.ImageSpecifications.Button")}
                  </StyledButton>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <img style={{ width: "100%" }} src={imageSpecifications} alt="" />
                </Col>
              </Row>
            </div>
          )}
        </ModalWithZIndexDontCopyMe>
      </Fragment>
    );
  }
}

VariationsModal.propTypes = {
  variations: PropTypes.array.isRequired,
  variationProperties: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export const ProductVariationsModal = withTranslation()(VariationsModal);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/deprecated/productVariationsModal/ProductVariationsModal.js