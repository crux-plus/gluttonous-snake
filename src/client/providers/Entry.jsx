// Official React bindings for Redux.
import { Provider } from 'react-redux';

// Ruthlessly simple bindings to keep react-router and redux in sync.
import { syncHistoryWithStore } from 'react-router-redux'

// Declarative routing for React.
import { Router, Route } from 'react-router-dom';

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

// Manage session history with JavaScript.
import createHistory from 'history/createBrowserHistory';

// Renders the first child <Route> or <Redirect> that matches the location.
import EntrySwitch from 'client/switchs/Entry';
import store from 'client/stores/entry';

// Create a history of your choosing (we're using a browser history in this case)
const browserHistory = createHistory();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing');
  },
});

/**
 * @public
 * @class
 */
class Entry extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <EntrySwitch />
        </Router>
      </Provider>
    );
  }
}

export default Entry;
