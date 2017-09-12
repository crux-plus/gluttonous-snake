import './common.css';

import ReactDOM from 'react-dom';

import React from 'react';

import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux';

import { Router, Route, browserHistory } from 'react-router';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Add the reducer to your store on the `routing` key
const stroe = createStore(() => {});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, stroe);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.querySelector('main'),
);
