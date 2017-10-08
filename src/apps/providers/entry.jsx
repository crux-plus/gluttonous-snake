import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from 'react-redux';

import React from 'react';

import store from 'stores/entry';

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
          <Route component={IndexSwitch} />
        </Router>
      </Provider>
    );
  }
}

export default Entry;
