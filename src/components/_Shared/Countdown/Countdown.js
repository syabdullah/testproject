import React, { Component } from "react";
import moment from "moment";
import { pluralize } from "../../../newDropshipperApp/utils/string";

class Countdown extends Component {
  state = {
    countdown: "",
    showDays: this.props.showDays || false,
    endDate: this.props.endDate || new Date().getTime()
  };

  UNSAFE_componentWillMount() {
    this.tick();

    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      endDate: props.endDate
    });
  }

  formatTime(time) {
    return time.toString().length === 1 ? `0${time}` : time;
  }

  tick() {
    const currentTime = new Date().getTime();
    const diffTime = this.state.endDate - currentTime;
    const duration = moment.duration(diffTime, "milliseconds");
    const countdown = `${this.formatTime(duration.hours())}:${this.formatTime(
      duration.minutes()
    )}:${this.formatTime(duration.seconds())}`;

    const countdownAsObject = {
      days: duration.days(),
      hours: this.props.convertDayInHours
        ? this.formatTime(duration.days() * 24 + duration.hours())
        : this.formatTime(duration.hours()),
      minutes: this.formatTime(duration.minutes()),
      seconds: this.formatTime(duration.seconds())
    };

    // getCurrentTime props return the countdown's current time
    this.props.getCurrentTime && this.props.getCurrentTime(diffTime);

    if (diffTime <= 0) {
      this.setState({
        countdown: "00:00:00",
        countdownAsObject: {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        }
      });
      this.props.countdownEnds && this.props.countdownEnds();
    } else {
      this.setState({ countdown, countdownAsObject });
    }
  }

  render() {
    const { countdownAsObject } = this.state;
    return (
      <span className="ReactCountdownMoment">
        {this.props.splitTime ? (
          <div className="ReactCountdownMoment__splitted-time">
            {this.state.showDays && (
              <div className="ReactCountdownMoment__days">
                <span>{countdownAsObject.days}</span>
                <span>{pluralize(Number(countdownAsObject.days), "day")}</span>
              </div>
            )}
            {this.props.showHours && (
              <div className="ReactCountdownMoment__hours">
                <span>{countdownAsObject.hours}</span>

                <span>{pluralize(Number(countdownAsObject.hours), "hr")}</span>
              </div>
            )}
            <div className="ReactCountdownMoment__minutes">
              <span>{countdownAsObject.minutes}</span>
              <span>{pluralize(Number(countdownAsObject.minutes), "min")}</span>
            </div>
            <div className="ReactCountdownMoment__seconds">
              <span>{countdownAsObject.seconds}</span>
              <span>{pluralize(Number(countdownAsObject.seconds), "sec")}</span>
            </div>
          </div>
        ) : (
          <span>{this.state.countdown}</span>
        )}
      </span>
    );
  }
}

Countdown.defaultProps = {
  showHours: true
};

export default Countdown;



// WEBPACK FOOTER //
// ./src/components/_Shared/Countdown/Countdown.js