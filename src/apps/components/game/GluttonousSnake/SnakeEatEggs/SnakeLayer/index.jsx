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
    const {
      actions,
    } = this.props;
    const context = this.getContext();
    const snake = new Snake({ context, actions });
    this.snake = snake;
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
}

export default SnakeLayer;
