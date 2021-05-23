/*global $*/
// @flow
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Button, ControlLabel, FormControl } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import PushAllModal from "./PushAllModal";
import RemoveAllModal from "./RemoveAllModal";
import { setAlertMessage } from "../../../actions";
import { openUpgradeModal, closeUpgradeModal } from "../../../actions/upgrade.js";
import "./style.css";

class Filter extends React.Component {
  static propTypes = {
    displayHeader: PropTypes.bool.isRequired,
    filterText: PropTypes.string.isRequired,
    searchText: PropTypes.string.isRequired,
    onFilterTextInput: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
    onResetSearch: PropTypes.func.isRequired,
    onItemsAction: PropTypes.func.isRequired,
    setAlertMessage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    openUpgradeModal: PropTypes.func.isRequired,
    closeUpgradeModal: PropTypes.func.isRequired,
    handlePushAll: PropTypes.func.isRequired
  };

  static defaultProps = {
    filterText: "",
    searchText: ""
  };

  state = {
    isRemoving: false,
    isPushing: false
  };

  handleFilterTextInputChange = e => {
    this.props.onFilterTextInput(e.target.value);
  };

  handlePushAll = e => {
    this.props.handlePushAll();
    e.handled = false;
  };

  handleRemoveAll = e => {
    $('.import-list-item__remove:enabled:Contains("Remove Product")').click();
    e.handled = false;
  };

  render() {
    const { onSearchSubmit, filterText, isLoading, t } = this.props;
    if (this.props.displayHeader) {
      return (
        <div className="card mt-30 import-list__filter">
          <form action="" onSubmit={onSearchSubmit}>
            <Row>
              <Col xs={12} md={8} lg={4}>
                <ControlLabel>{t("ImportList.Search.Label")}</ControlLabel>
                <FormControl
                  type="text"
                  placeholder={t("ImportList.Search.Placeholder")}
                  value={filterText}
                  onChange={this.handleFilterTextInputChange}
                />
              </Col>
              <Col xs={12} md={4} lg={2}>
                <Button
                  type="submit"
                  bsStyle="primary"
                  className="btn-block btn-big btn-wide import-list__filter--button"
                  disabled={isLoading}
                  onClick={onSearchSubmit}
                >
                  {t("ImportList.Search.Button")}
                </Button>
              </Col>
              <Col xs={12} md={5} lg={3}>
                <PushAllModal
                  isPushing={this.state.isPushing}
                  isLoading={isLoading}
                  onPushAll={this.handlePushAll}
                />
              </Col>
              <Col xs={12} md={5} lg={3}>
                <RemoveAllModal
                  isRemoving={this.state.isRemoving}
                  isLoading={isLoading}
                  onRemoveAll={this.handleRemoveAll}
                />
              </Col>
            </Row>
          </form>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlertMessage, openUpgradeModal, closeUpgradeModal }, dispatch);
}

export default withTranslation()(
  connect(
    null,
    mapDispatchToProps
  )(Filter)
);



// WEBPACK FOOTER //
// ./src/components/ImportList/Filter/index.js