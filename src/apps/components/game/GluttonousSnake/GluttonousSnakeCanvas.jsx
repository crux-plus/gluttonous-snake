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
    this.draw();
    this.props.actions.changeGameStatus({ status: Status.UNDERWAY });
  }

  /**
   * @method
   */
  draw() {
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
  componentWillUpdate(nextProps, nextState) {
    const {
      status,
    } = nextProps;
    console.log(nextProps);
    if (status === Status.PENDING) {
      this.init();
    }
  }
}

export default GluttonousSnakeCanvas;
