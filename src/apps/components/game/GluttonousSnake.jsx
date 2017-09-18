import React from 'react';

import Canvas from 'components/common/Canvas';

/**
 * @class
 */
class GluttonousSnake extends Canvas {
  /**
   * @method
   */
  init() {
    const {
      context,
    } = this;

    if (context != null) {
      this.context = this.getContext();
    }
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
   * @method
   */
  redraw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(50, 50, 10, 10);
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
    this.init();
    this.redraw();
  }
}

export default GluttonousSnake;
