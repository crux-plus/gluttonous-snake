// Redux DevTools extension.
import { composeWithDevTools } from 'redux-devtools-extension';

// Official React bindings for Redux.
import { Provider } from 'react-redux';

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

// Declarative routing for React.
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// Renders the first child <Route> or <Redirect> that matches the location.
import IndexSwitch from 'routers/IndexSwitch';
import store from 'stores/entry';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

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
          <IndexSwitch />
        </Router>
      </Provider>
    );
  }
}

export default Entry;
