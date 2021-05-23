import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover, FormGroup, InputGroup, Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import "./style.css";

class ContextPopover extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onApply: PropTypes.func
  };

  hide = () => {
    this.overlay.hide();
  };

  handleApply = e => {
    this.props.onApply(e);
    this.hide();
  };

  render() {
    const { children, title, t } = this.props;
    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close" title={t("ItemVariantList.ContextPopover.Title")}>
        <FormGroup className="mb-0">
          <InputGroup>
            {children}
            <InputGroup.Button>
              <Button bsSize="sm" bsStyle="primary" onClick={this.handleApply}>
                {t("ItemVariantList.ContextPopover.Apply")}
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Popover>
    );
    return (
      <div>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="bottom"
          overlay={popoverClickRootClose}
          ref={overlay => {
            this.overlay = overlay;
          }}
        >
          <span role="button" className="button text-primary">
            {title}
          </span>
        </OverlayTrigger>
      </div>
    );
  }
}

export default withTranslation()(ContextPopover);



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/ImportListItem/ItemVariantList/ContextPopover/index.js