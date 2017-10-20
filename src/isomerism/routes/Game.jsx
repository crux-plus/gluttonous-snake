import React from 'react';

import GluttonousSnake from 'isomerism/containers/game/GluttonousSnake';

/**
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
      <GluttonousSnake/>
    );
  }
}

export default Game;
