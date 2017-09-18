import React from 'react';

import Canvas from 'components/common/Canvas';

import Rtl from 'components/game/Rtl';

/**
 * @public
 * @class
 */
class GluttonousSnake extends Canvas {
  /**
   * @method
   */
  static getInitData() {
    return {
      requestID: -1,
      snake: {
        spread: 2,
        head: {
          location: {
            x: 0,
            y: 0,
          },
          size: 10,
          color: '#000',
          rtl: Rtl.None,
        },
      },
    };
  }

  /**
   * @method
   */
  init() {
    this.context = this.getContext();
    this.data = GluttonousSnake.getInitData();

    this.bindKeyboardEvent();
  }

  bindKeyboardEvent() {
    document.addEventListener('keydown', (event) => {
      const {
        head: {
          rtl: prevRtl,
        },
      } = this.data.snake;
      let rtl = prevRtl;
      switch (event.code) {
        case 'KeyS':
          rtl = Rtl.Down;
          break;
        case 'KeyA':
          rtl = Rtl.Left;
          break;
        case 'KeyW':
          rtl = Rtl.Up;
          break;
        case 'KeyD':
          rtl = Rtl.Right;
          break;
      }

      if (rtl != Rtl.None && rtl !== Rtl.getReverse(prevRtl)) {
        this.data.snake.head.rtl = rtl;
        this.cancelMotionAnimation();
        this.requestMotionAnimation();
      }
    });
  }

  getMotionCallback() {
    const {
      spread,
      head: {
        rtl,
        location,
      },
    } = this.data.snake;
    let motion = null;
    switch (rtl) {
      case Rtl.Down:
        motion = () => {
          location.y += spread;
        }
        break;
      case Rtl.Left:
        motion = () => {
          location.x -= spread;
        }
        break;
      case Rtl.Up:
        motion = () => {
          location.y -= spread;
        }
        break;
      case Rtl.Right:
        motion = () => {
          location.x += spread;
        }
        break;
    }
    return motion;
  }

  requestMotionAnimation() {
    const motion = this.getMotionCallback();
    this.data.requestID = window.requestAnimationFrame(() => {
      if (motion != null) {
        motion();
      }
      this.redraw();
      this.requestMotionAnimation();
    });
  }

  /**
   * @method
   */
  cancelMotionAnimation() {
    const {
      requestID,
    } = this.data;

    if (requestID != -1) {
      window.cancelAnimationFrame(requestID);
    }
  }

  /**
   * @method
   */
  redraw() {
    const {
      head: {
        location: {
          x,
          y,
        },
        size,
        color,
      },
    } = this.data.snake;

    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);
  }

  /**
   * @method
   */
  getContext() {
    const {
      canvas: {
        id,
      },
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
  componentDidUpdate() {
    if (this.context != null) {
      this.init();
    }

    this.redraw();
  }
}

export default GluttonousSnake;
