import PropTypes from 'prop-types';

import React from 'react';

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
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content="This is a description" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.title}</title>
        </head>
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
  title: '',
};

export default Boilerplate;
