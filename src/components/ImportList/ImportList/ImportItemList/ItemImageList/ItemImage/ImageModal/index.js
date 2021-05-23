// @flow
import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import placeholder from "../../../../../../../assets/place-holder.png";
import "./style.css";

class ImageModal extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const backgroundImageCSS = {
      backgroundImage: `url(${this.props.url})`
    };

    return (
      <div>
        <a role="button" onClick={this.toggle}>
          <i className="fa fa-search" />
        </a>
        <Modal show={this.state.modal} onHide={this.toggle} className="img-modal">
          <Modal.Body>
            <img alt="" src={placeholder} style={backgroundImageCSS} className="modal-img" />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ImageModal;



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemImageList/ItemImage/ImageModal/index.js