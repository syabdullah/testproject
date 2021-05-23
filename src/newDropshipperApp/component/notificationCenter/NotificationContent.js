// Libs
import React, { Fragment } from "react";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

import { showModal } from "actions/ui";
import { getListingDetail } from "newDropshipperApp/module/shared/listings";

// Images
import dollarIcon from "../../images/dollar-sign-icon.png";
import alertIcon from "../../images/alert-icon.png";

// Style
import "./NotificationContent.css";

const NotificationContent = ({
  showModal,
  notification: {
    notification_type,
    payload: { supplier_alias, start_date, end_date, listing_id, listing_title, message },
    created_at
  }
}) => {
  const notificationType = {
    shipping_price_change_on_listing: {
      icon: dollarIcon,
      component: (
        <Fragment>
          Shipping fees for <a onClick={() => goToProductLink(listing_id)}>{listing_title}</a> have changed
        </Fragment>
      )
    },
    vacation_set_on_supplier: {
      icon: alertIcon,
      component: (
        <Fragment>
          Supplier <strong>{supplier_alias}</strong> is experiencing an order fulfillment delay from{" "}
          <strong> {start_date}</strong> to
          <strong> {end_date}</strong>
        </Fragment>
      )
    },
    variation_price_change_on_listing: {
      icon: dollarIcon,
      component: (
        <Fragment>
          One or more variants of <a onClick={() => goToProductLink(listing_id)}>{listing_title}</a> has price
          changes
        </Fragment>
      )
    },
    shipping_price_change_on_supplier: {
      icon: dollarIcon,
      component: (
        <Fragment>
          Supplier <strong>{supplier_alias}</strong> has changed their shipping price
        </Fragment>
      )
    },
    global: {
      icon: alertIcon,
      component: <Fragment> {message} </Fragment>
    }
  };

  const goToProductLink = async listingId => {
    browserHistory.push("/search");
    try {
      const listingDetailsResult = await getListingDetail(listingId);
      showModal("LISTING_DETAIL_MODAL", { listing: listingDetailsResult.json });
    } catch (err) {
      console.log(err); // failed to fetch
    }
  };

  return (
    <div className="NotificationContent__container">
      <img src={notificationType[notification_type].icon} alt="Dollar" />
      <div className="NotificationContent__description">
        {notificationType[notification_type].component}
        <div className="NotificationContent__date">{moment(created_at).format("MMM, DD")}</div>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showModal
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(NotificationContent);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/notificationCenter/NotificationContent.js