import React from 'react';

import Canvas from 'components/common/Canvas';

import Rtl from 'components/game/Rtl';

import Eggs from 'components/game/Eggs';

import Snake from 'components/game/Snake';

/**
 * @public
 * @class
 */
class GluttonousSnake extends Canvas {
  /**
   * @method
   */
  getInitData() {
    const context = this.getContext();
    const {
      canvas: outer,
    } = this.props;
    const snake = new Snake({ context, outer });
    const eggs = new Eggs({ context, outer });
    return {
      context,
      eggs,
      snake,
    };
  }

  /**
   * @method
   */
  init() {
    this.data = this.getInitData();

    this.bindKeyboardEvent();
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
  redraw() {
    const {
      snake,
      eggs,
    } = this.data;
    eggs.draw();
    snake.drawHead();
  }

  /**
   * @method
   */
  getContext() {
    const {
      canvas: {
        id,
      },
    } = this.state;

    const canvasEl = document.querySelector(`#${id}`);
    const context = canvasEl.getContext('2d');
    return context;
  }

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  componentDidUpdate() {
    if (this.context != null) {
      this.init();
    }

    this.redraw();
  }
}

export default GluttonousSnake;
