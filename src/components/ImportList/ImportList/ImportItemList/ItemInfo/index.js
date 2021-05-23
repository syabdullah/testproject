// @flow
import React from "react";
import PropTypes from "prop-types";
import { Row, Col, FormControl, ControlLabel } from "react-bootstrap";
import { WithContext as ReactTags } from "react-tag-input";
import { connect } from "react-redux";
import shortid from "shortid";
import { withTranslation } from "react-i18next";
import placeholder from "../../../../../assets/place-holder.png";
import { etsyAffiliateLinkGenerator } from "../../../../../utils";
import alibabaLogo from "newDropshipperApp/images/alibaba-logo.svg";
import { Title } from "components/ImportList/ImportItemList/ImportListItem/ItemInfo/ItemInfo.style";

export function tagAlreadyExists(tags, tag) {
  return !!~tags.indexOf(tag);
}

class ItemInfo extends React.Component {
  static propTypes = {
    collections: PropTypes.array,
    tags: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    collectionID: PropTypes.any,
    images: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    provider: PropTypes.string.isRequired
  };

  state = {
    collections: []
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.collections) {
      this.setState({ collections: nextProps.collections });
    }
  }

  componentDidMount() {
    this.setState({ collections: this.props.collections || [] });
  }

  handleGenerateCollections = () => {
    // A collection is a user set product category on Shopify.
    return this.state.collections.map((collection, index) => (
      <option key={index} value={collection.id}>
        {collection.title}
      </option>
    ));
  };

  handleDisplayImage = () => {
    const images = this.props.images;
    if (images && images.length > 0) {
      return {
        backgroundImage: `url(${images[0].normal})`
      };
    }
    return {
      backgroundImage: `url(${placeholder})`
    };
  };

  openEtsyListing = () => {
    window.open(etsyAffiliateLinkGenerator(this.props.listingId));
  };

  handleGenerateImage = () => {
    const image = this.handleDisplayImage();
    if (this.props.listingId && this.props.provider === "Etsy") {
      return (
        <a onClick={this.openEtsyListing}>
          <div className="item-info__image" style={image} />
        </a>
      );
    }
    return <div className="item-info__image" style={image} />;
  };

  handleTagDelete = indexToDelete => {
    const updatedTags = [...this.props.tags]; // Clone for react diff
    updatedTags.splice(indexToDelete, 1);
    this.props.handleChange(updatedTags, "tags");
  };

  handleTagAddition = tag => {
    if (!tagAlreadyExists(this.props.tags, tag)) {
      const updatedTags = [...this.props.tags, tag];
      this.props.handleChange(updatedTags, "tags");
    }
  };

  deleteAllTags = () => {
    this.props.handleChange([], "tags");
  };

  handleCollectionChange = e => {
    this.props.handleChange(e.target.value, "collection_id");
  };

  onTitleChange = e => {
    this.props.handleChange(e.target.value, "title");
  };

  onproductTypeChange = e => {
    this.props.handleChange(e.target.value, "product_type");
  };

  render() {
    const { title, productType, t } = this.props;
    const tags = this.props.tags.map(t => ({
      text: t,
      id: shortid.generate()
    }));

    const collections = this.handleGenerateCollections();

    return (
      <div data-cy={`import-list-item-${title}`}>
        <Row>
          <Col xs={12} md={4} className="mb-20">
            {this.handleGenerateImage()}
          </Col>
          <Col xs={12} md={8}>
            <div className="data-holder">
              <Row>
                <Col xs={12} md={12}>
                  <Title>
                    {this.props.provider === "Alibaba" && <img src={alibabaLogo} alt="alibaba product" />}
                    <p data-cy="import-item-title">{title}</p>
                  </Title>
                </Col>
                <Col xs={12} md={12}>
                  <span>
                    <ControlLabel>{t("ItemInfo.ProductName.Label")}</ControlLabel>
                    <FormControl type="text" value={title} onChange={this.onTitleChange} maxLength="70" />
                  </span>
                </Col>
                <Col xs={12} md={12}>
                  <div className="import-list__tags">
                    <ControlLabel className="mt-20">{t("ItemInfo.ProductTags.Label")}</ControlLabel>
                    <a onClick={() => this.deleteAllTags()}>{t("ItemInfo.ProductTags.Remove")}</a>
                  </div>
                  <ReactTags
                    autofocus={false}
                    tags={tags}
                    maxLength="42"
                    handleAddition={this.handleTagAddition}
                    handleDelete={this.handleTagDelete}
                    draggable={false}
                    delimiters={[9, 13, 188]}
                    placeholder={t("ItemInfo.ProductTags.Placeholder")}
                    classNames={{
                      tags: "tags-container",
                      tagInput: "tag-input-container",
                      tagInputField: "form-control input-sm",
                      tag: "tag-style",
                      remove: "remove-btn"
                    }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <ControlLabel className="mt-20">{t("ItemInfo.ProductType.Label")}</ControlLabel>
                  <FormControl type="text" onChange={this.onproductTypeChange} value={productType} />
                </Col>
                <Col xs={12} md={6}>
                  <ControlLabel className="mt-20">{t("ItemInfo.Collection.Label")}</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder={t("ItemInfo.Collection.Placeholder")}
                    value={this.props.collectionID}
                    onChange={this.handleCollectionChange}
                  >
                    <option value="">{t("ItemInfo.Collection.Option")}</option>
                    {collections}
                  </FormControl>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    collections: state.settings.collections
  };
}

export default withTranslation()(connect(mapStateToProps)(ItemInfo));



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemInfo/index.js