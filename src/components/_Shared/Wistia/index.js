import React from "react";
import PropTypes from "prop-types";

export default class Wistia extends React.Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script1.src = `https://fast.wistia.com/embed/medias/${this.props.videoId}.jsonp`;
    script1.async = true;

    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }

  render() {
    return (
      <div>
        <div className={`wistia_embed wistia_async_${this.props.videoId} videoFoam=true`} />
      </div>
    );
  }
}



// WEBPACK FOOTER //
// ./src/components/_Shared/Wistia/index.js