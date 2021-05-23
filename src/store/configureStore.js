import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "../reducers";

let store = undefined;

function configureStore(initialState) {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(reduxThunk),
      (window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
  );

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

configureStore();

export { store };

// WEBPACK FOOTER //
// ./src/store/configureStore.js
