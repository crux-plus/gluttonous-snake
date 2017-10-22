// Runtime type checking for React props and similar objects
import PropTypes from 'prop-types';

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

// The document head manager for React.
import { Helmet } from 'react-helmet';

// The ReactDOMServer object enables you to render components
// to static markup. Typically, it’s used on a Node server:
import ReactDOMServer from 'react-dom/server'

// A professional front-end template for building fast, robust,
// and adaptable web apps or sites.
import Boilerplate from './Boilerplate';

import SEOLayoutProvider from 'server/providers/common/SEOLayout';

/**
 * A professional front-end template for building fast, robust, and adaptable
 * web apps or sites.
 *
 * @see https://html5boilerplate.com/
 *
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
      <Boilerplate
        {...this.props}
      >
        <SEOLayoutProvider>
          {this.props.children}
        </SEOLayoutProvider>
      </Boilerplate>
    );
  }
}

// Specifies the verification rule for props:
SEOLayout.propTypes = {
};

// Specifies the default values for props:
SEOLayout.defaultProps = {
};

export default SEOLayout;
