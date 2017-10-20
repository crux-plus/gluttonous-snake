// Runtime type checking for React props and similar objects
import PropTypes from 'prop-types';

// Official React bindings for Redux.
import { Provider } from 'react-redux';

// Ruthlessly simple bindings to keep react-router and redux in sync.
import { syncHistoryWithStore } from 'react-router-redux'

// This can be useful in server-side rendering scenarios when the user isn’t
// actually clicking around, so the location never actually changes. Hence,
// the name: static. It’s also useful in simple tests when you just need
// to plug in a location and make assertions on the render output.
import { StaticRouter as Router } from 'react-router'

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

import store from 'server/stores/SEOLayout';

/**
 * @public
 * @class
 */
class SEOLayout extends React.PureComponent {
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
        <Router
          {...this.props}
        >
          {this.props.children}
        </Router>
      </Provider>
    );
  }
}

export default SEOLayout;
