const websocketURL = () => {
  return `${process.env.REACT_APP_WEBSOCKET_URL}?cable_token=${localStorage.getItem("auth_cable_token")}`;
};

export default websocketURL;



// WEBPACK FOOTER //
// ./src/utils/websocketURL.js