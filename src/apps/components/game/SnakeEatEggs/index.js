import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

import { collisionDetection } from 'middlewares/game/snakeEatEggs';

import { createStore, bindActionCreators, applyMiddleware } from 'redux';

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
  constructor(options = { context: null, outer: null }) {
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
  }

  getInstances() {
    const {
      context,
      outer,
    } = this;
    const snake = new Snake({ context, outer });
    const eggs = new Eggs({ context, outer });

    return  {
      eggs,
      snake,
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
