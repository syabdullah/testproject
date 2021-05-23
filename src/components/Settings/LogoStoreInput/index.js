import React, { Component } from "react";
import ImageInput from "../../_Shared/ImageInput";
import StoreLogoAPI from "../../../api/StoreLogoAPI";

export default class LogoStoreInput extends Component {
  state = {
    url: "",
    updateInProcess: false
  };

  componentDidMount() {
    this.getLogoStoreUrl();
  }

  /**
   * Get image
   * @return {null}
   */
  getLogoStoreUrl = () => {
    this.setState({ updateInProcess: true });

    StoreLogoAPI.index()
      .then(({ status, json }) => {
        this.setState({
          url: json.url_thumb
        });
      })
      .catch()
      .then(() => this.setState({ updateInProcess: false }));
  };

  /**
   * Update url and updateInProcess state
   * @param  {Object} image
   * @return {null}
   */
  handleImageAdd(image) {
    this.setState({ url: image.url_thumb, updateInProcess: image.inProgress });
  }

  /**
   * Remove image
   * @return {null}
   */
  handleImageRemove(e) {
    let imageToBeRemovedID = e.target.id;
    this.setState({ updateInProcess: true });

    StoreLogoAPI.destroy(imageToBeRemovedID)
      .then(() => this.getLogoStoreUrl())
      .catch()
      .then(() => this.setState({ updateInProcess: false }));
  }

  /*===============================
  =            Renders            =
  ===============================*/
  render() {
    return (
      <ImageInput
        onAddImage={this.handleImageAdd.bind(this)}
        onRemoveImage={this.handleImageRemove.bind(this)}
        apiCall={StoreLogoAPI}
        updateInProcess={this.state.updateInProcess}
        imageUrl={this.state.url || ""}
      />
    );
  }
}



// WEBPACK FOOTER //
// ./src/components/Settings/LogoStoreInput/index.js