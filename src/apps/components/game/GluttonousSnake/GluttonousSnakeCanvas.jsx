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
    this.handleBlur = this.handleBlur.bind(this);
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
  render() {
    return (
      <canvas
        id={this.state.id}
        width={this.state.width}
        height={this.state.height}
      >
      </canvas>
    );
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

  /**
   * @method
   */
  handleBlur(event) {
    this.props.actions.changeGameStatus({ status: Status.PAUSE });
  }
}

export default GluttonousSnakeCanvas;
