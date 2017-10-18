import PropTypes from 'prop-types';

import React from 'react';

import Boilerplate from './Boilerplate';

/**
 * A professional front-end template for building fast, robust, and adaptable
 * web apps or sites.
 *
 * @see https://html5boilerplate.com/
 *
 * @public
 * @class
 */
class Game extends React.PureComponent {
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
      <Boilerplate title={this.props.title}>
        game
      </Boilerplate>
    );
  }
}

// Specifies the verification rule for props:
Game.propTypes = {
  title: PropTypes.string,
};

// Specifies the default values for props:
Game.defaultProps = {
  title: '',
};

export default Game;
