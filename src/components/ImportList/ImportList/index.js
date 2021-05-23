// @flow
import React from "react";
import PropTypes from "prop-types";
import ImportListItem from "./ImportListItem";
import { connect } from "react-redux";
import Tour from "../../../newDropshipperApp/component/Tour";

class ImportItemList extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    removedItems: PropTypes.array.isRequired,
    onRegenerateItems: PropTypes.func.isRequired,
    saveAndPush: PropTypes.bool,
    totalPushedProducts: PropTypes.number.isRequired,
    specialPushedProducts: PropTypes.number.isRequired,
    toggleIsPushing: PropTypes.func.isRequired,
    lastProductAction: PropTypes.func.isRequired
  };

  renderListItems = () => {
    return this.props.items.reduce((renderedItems, item, index) => {
      if (this.props.removedItems.indexOf(item.id) === -1) {
        renderedItems.push(
          <ImportListItem
            key={item.id}
            itemIndex={index}
            item={item}
            removeItem={this.props.removeItem}
            lastProductAction={this.props.lastProductAction}
            saveAndPush={this.props.saveAndPush}
            onRegenerateItems={this.props.onRegenerateItems}
            totalPushedProducts={this.props.totalPushedProducts}
            specialPushedProducts={this.props.specialPushedProducts}
            refreshPushedProductCount={this.props.refreshPushedProductCount}
            toggleIsPushing={this.props.toggleIsPushing}
            location={this.props.location}
          />
        );
      }
      return renderedItems;
    }, []);
  };

  render() {
    return (
      <div>
        {this.props.tourStep === "step_three" && <Tour />}
        {this.renderListItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tourStep: state.settings.dropshipperData.tour_step
  };
}

export default connect(mapStateToProps)(ImportItemList);



// WEBPACK FOOTER //
// ./src/components/ImportList/ImportItemList/index.js