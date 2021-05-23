// @flow
import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Button, Modal, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import placeholder from "../../../../../../../assets/place-holder.png";
import "./style.css";

class AltTextModal extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    handleAltTextChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    alt: ""
  };

  state = {
    modal: false,
    alt: ""
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onAltTextChange = e => {
    this.setState({
      alt: e.target.value
    });
  };

  onAltTextSave = () => {
    this.props.handleAltTextChange(this.state.alt);
    this.toggleModal();
  };

  render() {
    const { t } = this.props;

    const backgroundImageCSS = {
      backgroundImage: `url(${this.props.url})`
    };

    const alt = this.state.alt ? this.state.alt : this.props.alt;

    return (
      <div>
        <a role="button" onClick={this.toggleModal}>
          <i className="fa fa-pencil" />
        </a>
        <Modal show={this.state.modal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t("AltTextModal.Header.Title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="modal-table">
              <tbody>
                <tr>
                  <Row>
                    <Col md={12}>
                      <img alt="" src={placeholder} style={backgroundImageCSS} className="modal-img" />
                    </Col>
                  </Row>
                  <td className="col-md-8">
                    <p className="mb-20">{t("AltTextModal.Body.Description")}</p>
                    <Row>
                      <Col xs={12} md={12}>
                        <InputGroup bsSize="sm">
                          <InputGroup.Addon>{t("AltTextModal.Input.Label")}</InputGroup.Addon>
                          <FormControl
                            type="text"
                            value={alt}
                            placeholder={t("AltTextModal.Input.Placeholder")}
                            onChange={this.onAltTextChange}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="default" bsSize="small" onClick={this.toggleModal}>
              {t("AltTextModal.Button.Cancel")}
            </Button>
            <Button bsStyle="primary" bsSize="small" onClick={this.onAltTextSave}>
              {t("AltTextModal.Button.Save")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(AltTextModal);



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemImageList/ItemImage/AltTextModal/index.js