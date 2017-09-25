import React from 'react';

import { Dimmer, Loader } from 'semantic-ui-react';

import GluttonousSnake from 'containers/game/GluttonousSnake';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Dimmer active={true}>
          <Loader>Loading...</Loader>
        </Dimmer>
        <GluttonousSnake />
      </div>
    );
  }
}

export default Game;
