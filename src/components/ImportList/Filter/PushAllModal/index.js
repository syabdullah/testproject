// @flow
import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { withAnalytics } from "use-analytics";

class PushAllModal extends React.Component {
  static propTypes = {
    onPushAll: PropTypes.func.isRequired
  };

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handlePush = e => {
    const { track } = this.props.analytics;
    
    if (e.handled) return;
    e.handled = true;
    this.toggle();
    this.props.onPushAll(e);
    track("import_list_push_all_clicked");
  };

  render() {
    const { isPushing, isLoading, t } = this.props;
    return (
      <div>
        <Button
          bsStyle="success"
          className="btn-block btn-success btn-big btn-wide"
          disabled={isPushing || isLoading}
          onClick={this.toggle}
        >
          {isPushing ? (
            <span>{t("PushAllModal.Button.Active")}</span>
          ) : (
            <span>{t("PushAllModal.Button.Inactive")}</span>
          )}
        </Button>
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Body className="text-center">
            <p className="mb-20">{t("PushAllModal.Modal.Text")}</p>
            <Button bsStyle="default" bsSize="small" onClick={this.toggle}>
              {t("PushAllModal.Modal.Cancel")}
            </Button>
            <Button bsStyle="primary" bsSize="small" className="ml-10" onClick={this.handlePush}>
              {t("PushAllModal.Modal.Push")}
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(withAnalytics(PushAllModal));



// WEBPACK FOOTER //
// ./src/components/ImportList/Filter/PushAllModal/index.js