import { Provider } from 'react-redux';

import React from 'react';

import store from 'stores/game/SnakeEatEggs';

import SnakeEatEggsCompContainer from 'containers/game/SnakeEatEggs';

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
        <SnakeEatEggsCompContainer />
      </Provider>,
    );
  }
}

export default SnakeEatEggs;
