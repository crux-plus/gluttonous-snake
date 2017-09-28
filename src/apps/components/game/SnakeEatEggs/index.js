import { createStore, bindActionCreators, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

import { collisionDetection, selfEatingDetection } from 'middlewares/game/snakeEatEggs';

import snakeActionCreators from 'actions/game/snakeEatEggs/snake';

import eggsActionCreators from 'actions/game/snakeEatEggs/eggs';

import boundaryActionCreators from 'actions/game/snakeEatEggs/boundary';

import snakeEatEggsActionCreators from 'actions/game/snakeEatEggs/snakeEatEggs.js';

import Status from '../GluttonousSnake/Status';

import Rtl from './Rtl';

import Eggs from './Eggs';

import Snake from './Snake';

/**
 * @class
 */
class SnakeEatEggs {
  /**
   * @constructor
   */
  constructor(options = { context:null, boundary:null, actions:null }) {
    Object.assign(this, options);

    this.initStore();
    this.initActions();
    this.initInstances();

    this.resizeBoundary();
    this.bindSubscribe();
    this.eggs.lay();
  }

  resizeBoundary() {
    const {
      boundary,
    } = this;
    this.actions.resizeBoundary(boundary);
  }

  /**
   * @static
   * @method
   */
  initStore() {
    const middleware = [
      collisionDetection.bind(this),
      selfEatingDetection.bind(this),
    ];
    const store = createStore(
      snakeEatEggs,
      composeWithDevTools(
        // other store enhancers if any
        applyMiddleware(...middleware),
      ),
    );
    this.store = store;
  }

  initActions() {
    const {
      store: {
        dispatch,
      },
      actions,
    } = this;
    const innerActions = bindActionCreators({
      ...eggsActionCreators,
      ...snakeActionCreators,
      ...boundaryActionCreators,
      ...snakeEatEggsActionCreators,
    }, dispatch);
    this.actions = {
      ...actions,
      ...innerActions,
    };
  }


  /**
   * @method
   */
  bindSubscribe() {
    const {
      store,
      eggs,
      snake,
    } = this;
    store.subscribe(() => {
      const state = store.getState().toJS();
      eggs.mapStateToProps(state);
      snake.mapStateToProps(state);
    });
  }a

  /**
   * @method
   */
  initInstances() {
    const {
      actions,
      context,
    } = this;
    this.snake = new Snake({ context, actions });
    this.eggs = new Eggs({ context, actions });
  }

  /**
   * @method
   */
  reset() {
    const {
      eggs,
      snake,
      actions: {
        resetSnakeEatEggs,
      },
    } = this;
    resetSnakeEatEggs();
    snake.reset();
    eggs.reset();
  }

  /**
   * @method
   */
  pause() {
    const {
      snake,
    } = this;
    snake.pause();
  }

  /**
   * @method
   */
  resume() {
    const {
      snake,
    } = this;
    snake.resume();
  }
}

export default SnakeEatEggs;
