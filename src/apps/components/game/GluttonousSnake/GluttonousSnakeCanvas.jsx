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
   * @method
   */
  reset() {
    const {
      snakeEatEggs,
    } = this.data;
    snakeEatEggs.reset();
  }

  /**
   * @method
   */
  getContext() {
    const {
      id,
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
  componentDidMount() {
    this.init();
    this.props.actions.changeGameStatus({ status: Status.UNDERWAY });
  }

  /**
   * @method
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      status,
    } = this.props;
    if (status === Status.PENDING) {
      this.reset();
      this.props.actions.changeGameStatus({ status: Status.UNDERWAY });
    }
  }
}

export default GluttonousSnakeCanvas;
