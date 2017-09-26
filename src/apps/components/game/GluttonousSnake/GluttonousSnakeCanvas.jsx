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
    const isFresh = true;
    this.data = {
      isFresh,
      context,
      snakeEatEggs,
    };
  }

  /**
   * @method
   */
  init() {
    this.initData();
    this.props.actions.changeGameStatus({ status: Status.UNDERWAY });
    this.draw();
  }

  /**
   * @method
   */
  draw() {
    const {
      snakeEatEggs,
    } = this.data;
    snakeEatEggs.draw();
    this.data.isFresh = false;
  }

  clear() {
    const {
      width,
      height,
    } = this.props;
    const {
      snakeEatEggs,
    } = this.data;
    snakeEatEggs.clear();
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
  }

  /**
   * @method
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      status,
    } = this.props;
    const {
      isFresh,
    } = this.data;
    if (status === Status.PENDING && !isFresh) {
      this.clear();
      this.init();
    }
  }
}

export default GluttonousSnakeCanvas;
