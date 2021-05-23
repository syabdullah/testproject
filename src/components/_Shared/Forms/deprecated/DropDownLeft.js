import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ListGroupSpocket } from "./ListGroupSpocket";

const Container = styled.div`
  box-shadow: none !important;
  border-radius: 0;
  width: 100%;

  button:focus {
    outline: 0 !important;
    box-shadow: none;
  }
  button {
    background-color: #fff;
    font-weight: 500;
    border: 1px solid #dadde0;
    border-radius: 0 !important;
    width: 100%;
    height: 40px;
    white-space: normal;
    word-wrap: break-word;
  }
  ul {
    border-radius: 0;
    border-top: 0;
    margin-top: 0;
    padding: 15px;

    ul {
      padding: 0;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
`;

class DropdownSpocket extends Component {
  componentDidMount() {
    if (this.props.dontCloseOnClick) {
      this.dontCloseOnClick();
    }
    this.actionWhenDropdownIsClosed();
    this.shownDropdown();
  }

  dontCloseOnClick() {
    window.$(".dropdown-menu-dont-close").click(e => {
      e.stopPropagation();
    });
  }

  // Occurs when the dropdown is fully hidden (after CSS transitions have completed)
  actionWhenDropdownIsClosed() {
    window.$(`#${this.props.id}`).on("hidden.bs.dropdown", () => {
      this.props.actionWhenClose();
    });
  }

  // Occurs when the dropdown is fully shown (after CSS transitions have completed)
  shownDropdown() {
    window.$(`#${this.props.id}`).on("shown.bs.dropdown", () => {
      this.props.shownDropdown && this.props.shownDropdown();
    });
  }

  render() {
    const {
      children,
      title,
      placeholder,
      customButton,
      customArrow,
      dontCloseOnClick,
      customDropdown,
      id
    } = this.props;
    return (
      <Container id={id} className="btn-group">
        <button data-cy="spocketDropdown" type="button" data-toggle="dropdown" style={customButton}>
          <span>
            {title ? title : placeholder}
            <span style={customArrow} className="caret" />
          </span>
        </button>
        <ListGroupSpocket
          style={customDropdown}
          bsClass={`dropdown-menu
          ${dontCloseOnClick && "dropdown-menu-dont-close"}`}
        >
          <form data-cy="spocketDropdownMenu">{children}</form>
        </ListGroupSpocket>
      </Container>
    );
  }
}

DropdownSpocket.propTypes = {
  title: PropTypes.any,
  placeholder: PropTypes.string,
  customButton: PropTypes.object,
  dontCloseOnClick: PropTypes.bool,
  maxTitle: PropTypes.number,
  customArrow: PropTypes.object,
  customDropdown: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  actionWhenClose: PropTypes.func
};

const DropdownLeft = props => {
  const customProps = {
    customArrow: {
      right: "15px",
      position: "absolute",
      top: "50%"
    },
    customButton: {
      textAlign: "left",
      paddingLeft: "15px",
      backgroundColor: "#fafbfc"
    },
    ...props
  };
  return <DropdownSpocket {...customProps} />;
};

export { DropdownLeft };



// WEBPACK FOOTER //
// ./src/components/_Shared/Forms/deprecated/DropDownLeft.js