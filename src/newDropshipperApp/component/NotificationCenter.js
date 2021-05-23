// Libs
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
// Components
import Header from "./notificationCenter/Header";
import NotificationContent from "./notificationCenter/NotificationContent";
import Footer from "./notificationCenter/Footer";
import Container from "./Container";
import ClickOutside from "./ClickOutside";

// Actions
import { getNotifications, setNotificationAsViewed } from "../module/feeds";
import { getAllOffers } from "../module/store/offers";

// Images
import notificationIcon from "../images/notification-icon.svg";
import noNotificationIcon from "../images/no-notifications.png";

// Style
import "./NotificationCenter.css";

const StyledContainer = styled(Container)`
  @keyframes fadein {
    100% {
      opacity: 1;
    }
  }
`;

const NotificationCenter = ({
  setNotificationAsViewed,
  firstTenNotifications,
  unreadNotifications,
  getNotifications,
  newNotification,
  notifications,
  getAllOffers
}) => {
  const [isTheNotificationOpen, setIsTheNotificationOpen] = useState(false);
  const { t } = useTranslation();

  // Get the notifications when the component is mounted
  useEffect(() => {
    getNotifications({ page: 1 });
    getAllOffers();
  }, []);

  // Get the notifications every time the URL changes
  useEffect(() => {
    const unlisten = browserHistory.listen(() => {
      if (window.location.pathname !== "/notification-center") {
        getNotifications({ page: 1 });
        getAllOffers();
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  // Set notifications as read when the popup gets opened
  useEffect(
    () => {
      if (isTheNotificationOpen && getUnreadNotifications().length > 0) {
        setNotificationAsViewed(getUnreadNotifications());
      }
    },
    [isTheNotificationOpen]
  );

  // Get unread notifications in the first ten notifications
  const getUnreadNotifications = () => {
    return firstTenNotifications
      .filter(notification => unreadNotifications.includes(notification.notification_id))
      .map(notification => notification.notification_id);
  };

  return (
    <ClickOutside onClick={() => setIsTheNotificationOpen(false)}>
      <div className="NotificationCenter__container">
        <div
          className={`NotificationCenter__bell ${
            newNotification ? "NotificationCenter__bell-red-circle" : ""
          }`}
        >
          <img
            className="NotificationCenter__icon"
            src={notificationIcon}
            alt="Notification"
            onClick={() => setIsTheNotificationOpen(!isTheNotificationOpen)}
          />
        </div>

        <div
          className={`NotificationCenter__content-container ${
            isTheNotificationOpen
              ? "NotificationCenter__content-container-show"
              : "NotificationCenter__content-container-hide"
          }`}
        >
          <StyledContainer>
            <Header>{t("NotificationCenter.Header")}</Header>

            {firstTenNotifications.length > 0 ? (
              <Fragment>
                <div className="NotificationCenter__content-body">
                  {firstTenNotifications.map((notification, index) => {
                    return <NotificationContent key={index} notification={notification} />;
                  })}
                </div>

                <Footer>
                  <a
                    onClick={() => {
                      setIsTheNotificationOpen(false);
                      browserHistory.push("/notification-center");
                    }}
                  >
                    {t("NotificationCenter.Footer")}
                  </a>
                </Footer>
              </Fragment>
            ) : (
              <div className="NotificationCenter__content-no-notification">
                <img src={noNotificationIcon} alt="Nothing to see here" />
                {t("NotificationCenter.NoNotification")}
              </div>
            )}
          </StyledContainer>
        </div>
      </div>
    </ClickOutside>
  );
};

function mapStateToProps(state) {
  const {
    notifications: { firstTenNotifications, unreadNotifications, newNotification, feed }
  } = state;

  return {
    firstTenNotifications,
    unreadNotifications,
    notifications: feed,
    newNotification
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNotifications, setNotificationAsViewed, getAllOffers }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationCenter);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/NotificationCenter.js