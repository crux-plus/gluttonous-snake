import { createStore, bindActionCreators, applyMiddleware } from 'redux';

import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

import { collisionDetection } from 'middlewares/game/snakeEatEggs';

import { moveSnake, transformSnake } from 'actions/game/snake';

import { createEgg, transformEggs } from 'actions/game/eggs';

import { resizeBoundary } from 'actions/game/snakeEatEggs';

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
  constructor(options = { context: null, boundary: null }) {
    Object.assign(this, options);

    this.initStore();
    this.initInstances();

    this.bindKeyboardEvent();
  }

  /**
   * @static
   * @method
   */
  initStore() {
    const middleware = [collisionDetection];
    const store = createStore(
      snakeEatEggs,
      //applyMiddleware(...middleware),
    );
    const {
      dispatch,
    } = store;
    const actions = bindActionCreators({
      resizeBoundary,
    }, dispatch);
    this.actions = actions;
    this.store = store;

    const {
      boundary,
    } = this;
    this.bindSubscribe();
    this.actions.resizeBoundary(boundary);
  }

  bindSubscribe() {
    const {
      store,
    } = this;
    store.subscribe(() => {
      const state = store.getState();
      const {
        eggs: {
          location: {
            x,
            y,
          },
        },
      } = state;
      const {
        eggs,
      } = this;
      if (eggs) {
        eggs.createEgg({ x, y });
      }
    });
  }

  /**
   * @method
   */
  initInstances() {
    const {
      store,
      context,
      boundary: outer,
    } = this;
    const {
      dispatch,
    } = store;

    let actions = bindActionCreators({
      moveSnake,
      transformSnake,
    }, dispatch);
    const snake = new Snake({ context, outer, actions });
    this.snake = snake;

    actions = bindActionCreators({
      createEgg,
      transformEggs,
    }, dispatch);
    const eggs = new Eggs({ context, actions });
    this.eggs = eggs;
  }

  /**
   * @method
   */
  bindKeyboardEvent() {
    document.addEventListener('keydown', (event) => {
      const {
        code,
      } = event;
      const rtl = Rtl.fromCode(code);
      if (rtl != Rtl.None) {
        const {
          snake,
        } = this;
        snake.setHeadRtl(rtl);
      }
    });
  }

  /**
   * @method
   */
  draw() {
    const {
      eggs,
      snake,
    } = this;
    snake.drawHead();
    eggs.actions.createEgg();
  }
}

export default SnakeEatEggs;
