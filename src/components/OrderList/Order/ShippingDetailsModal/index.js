// @flow
import React from "react";
import PropTypes from "prop-types";
import { Modal, Row, Col } from "react-bootstrap";

class ShippingDetailsModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    shippingDetails: PropTypes.object.isRequired
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
    return (
      <div>
        <Modal bsSize="sm" show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Tracking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} className="mb-10">
                <p>
                  <b>Carrier:</b> {this.props.shippingDetails.carrier_name}
                </p>
              </Col>
              <Col md={12}>
                <p>
                  <b>Tracking Number:</b>{" "}
                  <a href={this.props.shippingDetails.tracking_url} target="_blank" rel="noreferrer noopener">
                    {this.props.shippingDetails.tracking_number}
                  </a>
                </p>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ShippingDetailsModal;



// WEBPACK FOOTER //
// ./src/components/OrderList/Order/ShippingDetailsModal/index.js