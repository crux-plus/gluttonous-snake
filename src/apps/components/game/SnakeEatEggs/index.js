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
  constructor({ context, outer }) {
    this.initData({ context, outer });
    this.bindKeyboardEvent();
  }

  initData({ context, outer }) {
    const eggs = new Eggs({ context, outer });
    const snake = new Snake({ context, outer });

    const data = {
      outer,
      context,
      eggs,
      snake,
    };
    this.data = data;
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
        } = this.data;
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
    } = this.data;
    eggs.draw();
    snake.drawHead();
  }
}

export default SnakeEatEggs;
