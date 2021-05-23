// @flow
import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

// i18n
import { withTranslation } from "react-i18next";

class RefreshModal extends React.Component {
  static propTypes = {
    onOrderRefresh: PropTypes.func.isRequired
  };

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onOrderRefresh = () => {
    this.toggle();
    this.props.onOrderRefresh();
  };

  render() {
    const { t } = this.props;

    return (
      <div className="div-inline">
        <button className="btn btn-success refresh_modal__sync_button" onClick={this.toggle}>
          {t("RefreshModal.Button.SynchronizeOrders")}
        </button>
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Body className="text-center">
            <p className="mb-20">{t("RefreshModal.Modal.Body")}</p>
            <Button bsStyle="default" bsSize="small" onClick={this.toggle}>
              {t("RefreshModal.Button.Cancel")}
            </Button>
            <Button bsStyle="primary" bsSize="small" className="ml-10" onClick={this.onOrderRefresh}>
              {t("RefreshModal.Button.Synchronize")}
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(RefreshModal);



// WEBPACK FOOTER //
// ./src/components/OrderList/RefreshModal/index.js