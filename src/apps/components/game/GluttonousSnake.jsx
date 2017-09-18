import React from 'react';

import Canvas from 'components/common/Canvas';

const Direction = Object.freeze({
  None: 'None',
  Up: 'Up',
  Right: 'Right',
  Down: 'Down',
  Left: 'Left',
});

/**
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
          direction: Direction.None,
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
      let direction = this.data.snake.head.direction;
      switch (event.code) {
        case 'KeyS':
          direction = Direction.Down;
          break;
        case 'KeyA':
          direction = Direction.Left;
          break;
        case 'KeyW':
          direction = Direction.Up;
          break;
        case 'KeyD':
          direction = Direction.Right;
          break;
      }
      this.data.snake.head.direction = direction;

      if (direction != Direction.None) {
        this.cancelMotionAnimation();
        this.requestMotionAnimation();
      }
    });
  }

  getMotionCallback() {
    const {
      spread,
      head: {
        direction,
        location,
      },
    } = this.data.snake;
    let motion = null;
    switch (direction) {
      case Direction.Down:
        motion = () => {
          location.y += spread;
        }
        break;
      case Direction.Left:
        motion = () => {
          location.x -= spread;
        }
        break;
      case Direction.Up:
        motion = () => {
          location.y -= spread;
        }
        break;
      case Direction.Right:
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
