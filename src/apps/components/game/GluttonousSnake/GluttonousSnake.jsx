import React from 'react';

import Canvas from 'components/common/Canvas';

import SnakeEatEggs from './SnakeEatEggs';

import Status from './Status';

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
      width,
      height,
      actions,
    } = this.props;
    const snakeEatEggs = new SnakeEatEggs({
      actions,
      context,
      boundary: {
        width,
        height,
      },
    });
    this.data = {
      context,
      snakeEatEggs,
    };
  }

  /**
   * @method
   */
  init() {
    this.initData();
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
  componentDidMount() {
    const {
      actions: {
        changeGameStatus,
      },
    } = this.props;
    this.init();
    changeGameStatus({ status: Status.UNDERWAY });
  }

  /**
   * @method
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      snakeEatEggs,
    } = this.data;
    const {
      status,
    } = this.props;
    snakeEatEggs.status = status;
  }
}

export default GluttonousSnake;
