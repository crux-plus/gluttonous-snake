// Runtime type checking for React props and similar objects
import PropTypes from 'prop-types';

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

import GamePage from 'server/pages/Game';

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
      <GamePage/>
    );
  }
}

// Specifies the verification rule for props:
Game.propTypes = {
};

// Specifies the default values for props:
Game.defaultProps = {
};

export default Game;
