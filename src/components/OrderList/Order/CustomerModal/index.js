// @flow
import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, Row, Col } from "react-bootstrap";

// i18n
import { withTranslation } from "react-i18next";

// Utils
import { withAnalytics } from "use-analytics";

class CustomerModal extends React.Component {
  static propTypes = {
    buyer: PropTypes.object.isRequired
  };

  static defaultProps = {
    buyer: {}
  };

  state = {
    modal: false
  };

  toggle = () => {
    const { track } = this.props.analytics;

    this.setState({
      modal: !this.state.modal
    });
    track("customer_info_clicked");
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <Button bsSize="sm" bsStyle="default" className="btn-block" onClick={this.toggle}>
          {t("CustomerModal.Button.ViewCustomerInfo")}
        </Button>

        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>{t("CustomerModal.Modal.Title.CustomerInfo")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <p>
                  <b>{t("CustomerModal.Modal.Body.CustomerInfo")}</b>
                </p>
                <p className="mt-10">{this.props.buyer.name}</p>
                <p className="mt-5">{this.props.buyer.email}</p>
                <p className="mt-5">{this.props.buyer.phone}</p>
              </Col>
              <Col md={6}>
                <p>
                  <b>{t("CustomerModal.Modal.Body.Address")}</b>
                </p>
                <p className="mt-10">{this.props.buyer.address1}</p>
                {this.props.buyer.address2 ? <p className="mt-5">{this.props.buyer.address2}</p> : null}
                <p className="mt-5">
                  {this.props.buyer.city}, {this.props.buyer.province}
                </p>
                <p className="mt-5">
                  {this.props.buyer.country} {this.props.buyer.zip}
                </p>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(withAnalytics(CustomerModal));



// WEBPACK FOOTER //
// ./src/components/OrderList/Order/CustomerModal/index.js