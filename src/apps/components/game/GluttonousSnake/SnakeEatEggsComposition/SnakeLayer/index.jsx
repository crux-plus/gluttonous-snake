import React from 'react';

import Canvas from 'components/common/Canvas';

import Snake from './Snake';

/**
 * @public
 * @class
 */
class SnakeLayer extends Canvas {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  componentDidMount() {
    const context = this.getContext();
    const snake = new Snake({ context });
    this.snake = snake;
  }

  /**
   * @method
   */
  componentWillUpdate(nextProps, nextState) {
    const context = this.getContext();
    this.snake.context = snake;
  }
}

export default SnakeLayer;
