import React from 'react';

import Canvas from 'components/common/Canvas';

/**
 * @class
 */
class GluttonousSnake extends Canvas {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  redraw() {
    const {
      canvas: {
        id,
      },
    } = this.props;
    const formateId = Canvas.formateId(id);
    const canvasEl = document.querySelector(`#${formateId}`);
    const context = canvasEl.getContext('2d');

    context.fillStyle = '#000';
    context.fillRect(50, 50, 10, 10);
  }

  /**
   * @method
   */
  componentDidUpdate() {
    this.redraw();
  }
}

export default GluttonousSnake;
