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
  componentWillUpdate(nextProps, nextState) {
    const {
      immutable,
    } = nextProps;
    if (!this.props.immutable.equals(immutable)) {
      const snake = immutable.toJS()
      Object.assign(this.snake, snake);
    }
  }
}

export default SnakeLayer;
