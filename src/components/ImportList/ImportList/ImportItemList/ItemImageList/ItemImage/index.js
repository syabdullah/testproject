// @flow
import React from "react";
import PropTypes from "prop-types";
import AltTextModal from "./AltTextModal";
import ImageModal from "./ImageModal";
import placeholder from "../../../../../../assets/place-holder.png";

class ItemImage extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    handleImageToggle: PropTypes.func.isRequired,
    handleAltTextChange: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    alt: PropTypes.string
  };

  static defaultProps = {
    alt: ""
  };

  handleSelectImage = () => {
    this.props.handleImageToggle(this.props.id);
  };

  handleAltTextChange = value => {
    this.props.handleAltTextChange(value, this.props.id);
  };

  render() {
    const backgroundImageCSS = {
      backgroundImage: `url("${this.props.url}")`
    };
    return (
      <li
        className={this.props.selected ? "import-selected" : ""}
        onClick={this.handleSelectImage}
        style={{ listStyleType: "none" }}
      >
        {this.props.selected && (
          <div className="img-selected">
            <i className="fa fa-check-circle" />
          </div>
        )}
        <img alt={this.props.alt} src={placeholder} style={backgroundImageCSS} className="import-img" />
        <div className="img-controls" />
        <div className="img-edit">
          <AltTextModal
            url={this.props.url}
            alt={this.props.alt}
            handleAltTextChange={this.handleAltTextChange}
          />
        </div>
        <div className="img-zoom">
          <ImageModal url={this.props.url} />
        </div>
      </li>
    );
  }
}

export default ItemImage;



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemImageList/ItemImage/index.js