import React from 'react';

import Canvas from 'components/common/Canvas';

import SnakeEatEggs from '../SnakeEatEggs';

import Status from './Status';

/**
 * @public
 * @class
 */
class GluttonousSnakeCanvas extends Canvas {
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
    this.init();
    this.props.actions.changeGameStatus({ status: Status.UNDERWAY });
  }

  /**
   * @method
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      snakeEatEggs,
    } = this.data;
    const {
      actions,
      status,
    } = this.props;
    switch (status) {
      case Status.PENDING:
        snakeEatEggs.reset();
        actions.changeGameStatus({ status: Status.UNDERWAY });
        break;
      case Status.END:
        snakeEatEggs.pause();
    }
  }
}

export default GluttonousSnakeCanvas;
