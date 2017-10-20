import PropTypes from 'prop-types';

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

// The document head manager for React.
import { Helmet } from 'react-helmet';

import config from '../config';

/**
 * A professional front-end template for building fast, robust, and adaptable
 * web apps or sites.
 *
 * @see https://html5boilerplate.com/
 *
 * @public
 * @class
 */
class Boilerplate extends React.PureComponent {
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
      <html lang="en">
        <Helemt>
          <meta charset="utf-8" />
          <meta http-equiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content="This is a description" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.title}</title>
        </Helemt>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

// Specifies the verification rule for props:
Boilerplate.propTypes = {
  title: PropTypes.string,
};

// Specifies the default values for props:
Boilerplate.defaultProps = {
  title: config.title,
};

export default Boilerplate;
