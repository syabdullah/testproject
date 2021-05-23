import "./style.css";

import { default as Loadable } from "../../_Shared/commonLoadable";
import PropTypes from "prop-types";
import React, { Component } from "react";

import plus from "../../../assets/plus.svg";
import del from "../../../assets/delete.svg";

export default class ImageInput extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onAddImage: PropTypes.func.isRequired,
    onRemoveImage: PropTypes.func.isRequired,
    updateInProcess: PropTypes.bool.isRequired,
    apiCall: PropTypes.func.isRequired
  };

  /**
   * Select image
   * @return {null}
   */
  handleAddImageClick = e => {
    e.stopPropagation();
    let imageClickEvent = new MouseEvent("click", {
      view: window,
      bubbles: false,
      cancelable: true
    });
    this.refs.imageInput.dispatchEvent(imageClickEvent);
  };

  /**
   * Upload image
   * @returns {null}
   */
  onPhotoInputChange(e) {
    let that = this;
    let FR = new FileReader();

    FR.addEventListener("load", e => {
      that.props.onAddImage({ inProgress: true });
      this.props.apiCall
        .save({
          attachment: e.target.result
        })
        .then(({ json, status }) => {
          that.props.onAddImage({
            url_thumb: e.target.result,
            inProgress: false
          });
        });
    });

    FR.readAsDataURL(e.target.files[0]);
  }

  /**
   * Render the input uploaded image with remove option
   * @return {ReactElement}
   */
  renderImageAdded() {
    return (
      <div className="Input-Image__added-img" style={{ backgroundImage: `url(${this.props.imageUrl})` }}>
        <img src={del} className="Input-Image__img-delete" alt="delete" onClick={this.props.onRemoveImage} />
      </div>
    );
  }

  /**
   * Render the input upload image
   * @return {ReactElement}
   */
  renderInputImage() {
    return (
      <div>
        <input
          ref="imageInput"
          type="file"
          className="hidden"
          onChange={this.onPhotoInputChange.bind(this)}
        />
        <div className="Input-Image__add-img" role="button" onClick={this.handleAddImageClick}>
          <img src={plus} alt="plus" />
        </div>
      </div>
    );
  }

  /*===============================
  =            Renders            =
  ===============================*/
  render() {
    return (
      <Loadable active={this.props.updateInProcess}>
        <div style={{ height: "139px" }}>
          {this.props.imageUrl ? this.renderImageAdded() : this.renderInputImage()}
        </div>
      </Loadable>
    );
  }
}



// WEBPACK FOOTER //
// ./src/components/_Shared/ImageInput/index.js