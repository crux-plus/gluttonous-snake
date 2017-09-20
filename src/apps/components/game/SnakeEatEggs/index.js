import { createStore, bindActionCreators, applyMiddleware } from 'redux';

import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

import { collisionDetection } from 'middlewares/game/snakeEatEggs';

import { snakeMove } from 'actions/game/snake';

import { createEgg } from 'actions/game/eggs';

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
    Object.assign(this, this.getInstances());
    SnakeEatEggs.getStore();

    this.bindKeyboardEvent();
  }

  /**
   * @static
   * @method
   */
  static getStore() {
    const middleware = [collisionDetection];
    const store = createStore(
      snakeEatEggs,
      applyMiddleware(...middleware),
    );
    return store;
  }

  getInstances() {
    const store = SnakeEatEggs.getStore();
    const {
      dispatch,
    } = store;
    const {
      context,
      boundary: outer,
    } = this;

    let actions = bindActionCreators({
      snakeMove,
    }, dispatch);
    const snake = new Snake({ context, outer, actions });

    actions = bindActionCreators({
      createEgg,
    }, dispatch);
    const eggs = new Eggs({ context, outer, actions });

    actions = bindActionCreators({
      resizeBoundary,
    }, dispatch);

    return {
      store,
      eggs,
      snake,
      actions,
    };
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
      snake,
      eggs,
    } = this;
    eggs.draw();
    snake.drawHead();
  }
}

export default SnakeEatEggs;
