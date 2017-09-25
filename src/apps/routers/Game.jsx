import React from 'react';

import { Dimmer, Loader } from 'semantic-ui-react';

import GluttonousSnakeCanvas from 'containers/game/GluttonousSnakeCanvas';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Dimmer active={true}>
          <Loader>Loading...</Loader>
        </Dimmer>
        <GluttonousSnakeCanvas />
      </div>
    );
  }
}

export default Game;
