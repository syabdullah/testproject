import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "react-bootstrap";
import "./style.css";

class PageHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="container">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{this.props.title}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default PageHeader;



// WEBPACK FOOTER //
// ./src/components/PageHeader/index.js