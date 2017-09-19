import React from 'react';

import Canvas from 'components/common/Canvas';

import SnakeEatEggs from './SnakeEatEggs';

/**
 * @public
 * @class
 */
class GluttonousSnake extends Canvas {
  /**
   * @method
   */
  initData() {
    const context = this.getContext();
    const {
      canvas: outer,
    } = this.props;
    const snakeEatEggs = new SnakeEatEggs({ context, outer });
    const data = {
      context,
      snakeEatEggs,
    };
    this.data = data;
  }

  /**
   * @method
   */
  init() {
    this.initData();
  }

  /**
   * @method
   */
  redraw() {
    const {
      snakeEatEggs,
    } = this.data;
    snakeEatEggs.draw();
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
