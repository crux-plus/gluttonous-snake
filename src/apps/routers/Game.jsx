import React from 'react';

import GluttonousSnakeCanvas from 'containers/game/GluttonousSnakeCanvas';

class Game extends React.Component {
  render() {
    return (
      <div>
        <GluttonousSnakeCanvas />
      </div>
    );
  }
}

export default Game;
