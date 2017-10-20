import React from 'react';

import Bundle from 'client/components/common/Bundle';

import loadGluttonousSnake from 'bundle-loader?lazy!client/containers/game/GluttonousSnake';

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
      <Bundle load={loadGluttonousSnake}>
        {(GluttonousSnake) => <GluttonousSnake {...this.props}/>}
      </Bundle>
    );
  }
}

export default Game;
