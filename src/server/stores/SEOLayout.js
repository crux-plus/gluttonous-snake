// Redux DevTools extension.
import { composeWithDevTools } from 'redux-devtools-extension';

// Ruthlessly simple bindings to keep react-router and redux in sync.
import { routerMiddleware } from 'react-router-redux';

// Predictable state container for JavaScript apps.
import { createStore, applyMiddleware } from 'redux';

import entry from 'isomerism/reducers/entry';

// Add the reducer to your store on the `routing` key
const store = createStore(
  entry,
);

export default store;
