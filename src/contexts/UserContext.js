import React, { Component, createContext } from "react";

export const UserContext = createContext();

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importedListings: [], // Save user imported items
      pushedListings: [], // Save user pushed items
      downgradeAttemptId: "" // passed id from previous downgrade event to tie the funnel
    };
  }

  setStoreInfo = (attribute, value) => {
    this.setState({ [attribute]: value });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setStoreInfo: this.setStoreInfo
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

// Left this here if we eventually need in the future
export const withUserContext = Component => props => (
  <UserContext.Consumer>{state => <Component {...props} context={state} />}</UserContext.Consumer>
);



// WEBPACK FOOTER //
// ./src/contexts/UserContext.js