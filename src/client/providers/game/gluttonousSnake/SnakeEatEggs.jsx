import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux'

import { Provider } from 'react-redux';

import React from 'react';

import SnakeEatEggsContainer from 'client/containers/game/GluttonousSnake/SnakeEatEggs';

import snakeEatEggs from 'client/reducers/components/game/gluttonousSnake/snakeEatEggs';

import {
  boundaryDetection,
  collisionDetection,
  selfEatingDetection,
} from 'client/middlewares/game/gluttonousSnake/snakeEatEggs';

/**
 * @public
 * @class
 */
class SnakeEatEggs extends React.PureComponent {
  /**
   * @method
   */
  getStore({ actions }) {
    const context = { outerActions: actions };
    const middleware = [
      boundaryDetection.bind(context),
      collisionDetection.bind(context),
      selfEatingDetection.bind(context),
    ];
    const store = createStore(
      snakeEatEggs,
      composeWithDevTools(
        // other store enhancers if any
        applyMiddleware(...middleware),
      ),
    );
    return store;
  }

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const {
      actions,
    } = this.props;
    this.store = this.getStore({ actions });
  }

  /**
   * @method
   */
  render() {
    const {
      store,
    } = this;
    return (
      <Provider store={store}>
        <SnakeEatEggsContainer {...this.props} />
      </Provider>
    );
  }
}

export default SnakeEatEggs;
