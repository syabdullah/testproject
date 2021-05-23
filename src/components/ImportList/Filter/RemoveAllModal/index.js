// @flow
import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class RemoveAllModal extends React.Component {
  static propTypes = {
    onRemoveAll: PropTypes.func.isRequired
  };

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleRemove = e => {
    if (e.handled) return;
    e.handled = true;
    this.toggle();
    this.props.onRemoveAll(e);
  };

  render() {
    const { isRemoving, isLoading, t } = this.props;
    return (
      <div>
        <Button
          bsStyle="default"
          className="btn-block btn-big btn-wide"
          disabled={isRemoving || isLoading}
          onClick={this.toggle}
        >
          {isRemoving ? (
            <span>{t("RemoveAllModal.Button.Active")}</span>
          ) : (
            <span>{t("RemoveAllModal.Button.Inactive")}</span>
          )}
        </Button>
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Body className="text-center">
            <p className="mb-20">{t("RemoveAllModal.Modal.Text")}</p>
            <Button bsStyle="default" bsSize="small" onClick={this.toggle}>
              {t("RemoveAllModal.Modal.Cancel")}
            </Button>
            <Button bsStyle="primary" bsSize="small" className="ml-10" onClick={this.handleRemove}>
              {t("RemoveAllModal.Modal.Remove")}
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(RemoveAllModal);



// WEBPACK FOOTER //
// ./src/components/ImportList/Filter/RemoveAllModal/index.js