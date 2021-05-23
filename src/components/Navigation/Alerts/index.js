import React from "react";
import PropTypes from "prop-types";
import AlertContainer from "react-alert";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { clearAlertMessage } from "../../../actions";

class Alerts extends React.Component {
  static propTypes = {
    clearAlertMessage: PropTypes.func.isRequired,
    messageType: PropTypes.string,
    messageDelay: PropTypes.bool,
    messageTime: PropTypes.number,
    message: PropTypes.string
  };

  delayedNotification = null;
  delayedNotificationMessage = null;
  delayedNotificationType = null;

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.message && nextProps.messageType) {
      if (!nextProps.messageDelay) {
        this.handleAlert(nextProps.message, nextProps.messageType);
        this.props.clearAlertMessage();
      } else {
        if (this.delayedNotification) {
          clearTimeout(this.delayedNotification);
        }
        this.delayedNotificationMessage = nextProps.message;
        this.delayedNotificationType = nextProps.messageType;
        this.delayedNotification = setTimeout(() => {
          this.handleDelayedAlert();
          this.props.clearAlertMessage();
        }, 2500);
      }
    }
  };

  alertOptions = {
    offset: 50,
    position: "bottom left",
    theme: "dark",
    time: 5000,
    transition: "fade"
  };

  handleAlert = (text, type) => {
    this.msg.show(text, {
      time: 3000,
      type: type
    });
  };

  handleDelayedAlert = () => {
    this.msg.show(this.delayedNotificationMessage, {
      time: 3000,
      type: this.delayedNotificationType
    });
  };

  render() {
    return (
      <div className={this.props.messageGoalsTheme ? "Alerts__container" : ""}>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearAlertMessage }, dispatch);
}

function mapStateToProps(state) {
  return {
    messageType: state.message.messageType,
    messageDelay: state.message.messageDelay,
    messageTime: state.message.messageTime,
    messageGoalsTheme: state.message.goalsTheme,
    message: state.message.message
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);



// WEBPACK FOOTER //
// ./src/components/Navigation/Alerts/index.js