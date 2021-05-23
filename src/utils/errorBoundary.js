import React, { Component } from "react";
import * as Sentry from "@sentry/browser";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops, Something went wrong!.</h1>
          <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
        </div>
      );
    }
    return this.props.children;
  }
}



// WEBPACK FOOTER //
// ./src/utils/errorBoundary.js