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
  getInitData() {
    const size = 10;
    const {
      canvas: {
        width,
        height,
      },
    } = this.props;

    return {
      motion: null,
      requestID: -1,
      boundary: {
        top: 0,
        right: width - size,
        bottom: height - size,
        left: 0,
      },
      snake: {
        size,
        spread: 2,
        color: '#000',
        head: {
          location: {
            x: 0,
            y: 0,
          },
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
    this.data = this.getInitData();

    this.bindKeyboardEvent();
  }

  /**
   * @method
   */
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

      if (rtl != Rtl.None) {
        this.data.snake.head.rtl = rtl;
        if (this.data.requestID !== -1) {
          this.cancelMotionAnimation();
        }
        this.requestMotionAnimation();
      }
    });
  }

  /**
   * @method
   */
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

  /**
   * @method
   */
  boundaryDetection() {
    const {
      boundary: {
        top,
        right,
        bottom,
        left,
      },
      snake: {
        head: {
          location: {
            x,
            y,
          },
        },
      },
    } = this.data;
    let flag = false;
    if ((x <= right && x >= left) && (y <= bottom && y >= top)) {
      flag = true;
    }
    return flag;
  }

  /**
   * @method
   */
  requestMotionAnimation() {
    this.data.motion = this.getMotionCallback();
    this.data.requestID = window.requestAnimationFrame(() => {
        this.redraw();
        this.requestMotionAnimation();
    });
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
      },
    } = this.data.snake;
    if (this.data.motion != null) {
      this.clearPrevHead();
      this.data.motion();
    }
    if (!this.boundaryDetection()) {
      this.data.snake.head.location = { x, y };
      this.cancelMotionAnimation();
    }
    this.drawHead();
  }

  /**
   * @method
   */
  drawHead() {
    const {
      size,
      color,
      head: {
        location: {
          x,
          y,
        },
      },
    } = this.data.snake;
    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);
  }

  /**
   * @method
   */
  clearPrevHead() {
    const {
      size,
      color,
      head: {
        location: {
          x,
          y,
        },
      },
    } = this.data.snake;
    this.context.clearRect(x, y, size, size);
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
