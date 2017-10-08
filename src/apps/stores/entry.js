import { composeWithDevTools } from 'redux-devtools-extension';

import { routerMiddleware } from 'react-router-redux';

import { createStore, applyMiddleware } from 'redux';

import entry from 'reducers/entry';

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `routing` key
const store = createStore(
  entry,
  composeWithDevTools(
    // other store enhancers if any
    applyMiddleware(middleware),
  ),
);

export default store;
