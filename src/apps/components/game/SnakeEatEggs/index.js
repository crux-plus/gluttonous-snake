import { createStore, bindActionCreators, applyMiddleware } from 'redux';

import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

import { collisionDetection } from 'middlewares/game/snakeEatEggs';

import snakeActionCreators from 'actions/game/snake';

import eggsActionCreators from 'actions/game/eggs';

import boundaryActionCreators from 'actions/game/boundary';

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
  constructor({ context=null, boundary=null }) {
    this.context = context;

    this.initStore();
    this.initInstances();

    this.bindSubscribe();

    this.resizeBoundary(boundary);
  }

  resizeBoundary(boundary) {
    this.actions.resizeBoundary(boundary);
  }

  /**
   * @static
   * @method
   */
  initStore() {
    const middleware = [collisionDetection];
    const store = createStore(
      snakeEatEggs,
      applyMiddleware(...middleware),
    );
    const {
      dispatch,
    } = store;
    const actions = bindActionCreators({
      ...boundaryActionCreators,
    }, dispatch);
    this.actions = actions;
    this.store = store;
  }

  bindSubscribe() {
    const {
      store,
      eggs,
      snake,
    } = this;
    store.subscribe(() => {
      const state = store.getState();
      eggs.mapStateToProps(state);
      snake.mapStateToProps(state);
    });
  }

  /**
   * @method
   */
  initInstances() {
    const {
      store: {
        dispatch,
      },
      context,
    } = this;

    let actions = bindActionCreators({
      ...snakeActionCreators,
    }, dispatch);
    this.snake = new Snake({ context, actions });

    actions = bindActionCreators({
      ...eggsActionCreators,
    }, dispatch);
    this.eggs = new Eggs({ context, actions });
  }

  /**
   * @method
   */
  draw() {
    const {
      eggs,
      snake,
    } = this;
    eggs.create();
    snake.move();
  }
}

export default SnakeEatEggs;
