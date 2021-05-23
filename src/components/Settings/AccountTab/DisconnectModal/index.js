// @flow
import React from "react";
import PropTypes from "prop-types";

class DisconnectModal extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onShopDisconnect: PropTypes.func.isRequired
  };

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onShopDisconnect = () => {
    this.toggle();
    this.props.onShopDisconnect();
  };

  openAppStore = () => {
    window.open("https://apps.shopify.com/spocket", "_blank");
  };

  render() {
    if (this.props.active) {
      return <div />;
    }
    return (
      <div>
        <button className="btn btn-sm btn-default" onClick={this.openAppStore}>
          Reactivate This Shop
        </button>
      </div>
    );
  }
}

export default DisconnectModal;



// WEBPACK FOOTER //
// ./src/components/Settings/AccountTab/DisconnectModal/index.js