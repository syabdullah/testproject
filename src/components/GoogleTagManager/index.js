/* eslint no-eval: 0 */
import React from "react";
import gtmParts from "react-google-tag-manager";

class GoogleTagManager extends React.Component {
  componentDidMount() {
    const scriptId = this.props.scriptId || "react-google-tag-manager-gtm";

    const gtmScriptNode = document.getElementById(scriptId);
    eval(gtmScriptNode.textContent);
  }

  render() {
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || "dataLayer",
      additionalEvents: this.props.additionalEvents || {}
    });

    return (
      <div>
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || "react-google-tag-manager-gtm"}>{gtm.scriptAsReact()}</div>
      </div>
    );
  }
}

export default GoogleTagManager;



// WEBPACK FOOTER //
// ./src/components/GoogleTagManager/index.js