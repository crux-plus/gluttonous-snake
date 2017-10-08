import { Provider } from 'react-redux';

import React from 'react';

import store from 'stores/game/gluttonousSnake/snakeEatEggs';

import SnakeEatEggsContainer from 'containers/game/GluttonousSnake/SnakeEatEggs';

/**
 * @public
 * @class
 */
class SnakeEatEggs extends React.PureComponent {
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
      <Provider store={store}>
        <SnakeEatEggsContainer
          {...this.props}
        />
      </Provider>
    );
  }
}

export default SnakeEatEggs;
