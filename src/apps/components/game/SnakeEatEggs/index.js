import { createStore, bindActionCreators, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import deepEqual from 'deep-equal';

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

const Sym = Object.freeze({
  BOUNDARY: Symbol('boundary'),
});

/**
 * @class
 */
class SnakeEatEggs {
  /**
   * @constructor
   */
  constructor({ context=null, boundary=null, actions=null }) {
    this.initStore();
    this.initActions(actions);

    this.boundary = boundary;
    this.initInstances(context);

    this.bindSubscribe();
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

  initActions(actions={}) {
    const {
      store: {
        dispatch,
      },
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
  }

  /**
   * @method
   */
  initInstances(context={}) {
    const {
      actions,
    } = this;
    this.snake = new Snake({ context, actions });
    this.eggs = new Eggs({ context, actions }).lay();
  }

  /**
   * @method
   */
  set boundary(boundary) {
    if (!deepEqual(this.boundary, boundary)) {
      this[Sym.BOUNDARY] = boundary;
      this.actions.resizeBoundary(boundary);
    }
  }

  /**
   * @method
   */
  get boundary() {
    return this[Sym.BOUNDARY];
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
    return this;
  }

  /**
   * @method
   */
  pause() {
    const {
      snake,
    } = this;
    snake.pause();
    return this;
  }

  /**
   * @method
   */
  resume() {
    const {
      snake,
    } = this;
    snake.resume();
    return this;
  }
}

export default SnakeEatEggs;
