import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(WrappedComponent) {
  class Shop extends React.Component {
    static propTypes = {
      registered: PropTypes.bool
    };

    hasShop = () => {
      if (!this.props.registered) {
        if (localStorage.shop_id === null) {
          return false;
        }
        return true;
      }
      return true;
    };

    render() {
      if (this.hasShop()) {
        return <WrappedComponent {...this.props} />;
      }
      return false;
    }
  }

  function mapStateToProps(state) {
    return { registered: state.auth.registered };
  }

  return connect(mapStateToProps)(Shop);
}



// WEBPACK FOOTER //
// ./src/components/RequireShop/index.js