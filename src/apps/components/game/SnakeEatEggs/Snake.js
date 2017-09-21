import Rtl from './Rtl';

/**
 * @class
 */
class Snake {
  /**
   * @constructor
   */
  constructor(options = { size: 10, spread: 2, color: '#000' }) {
    const defaultOptitons = Snake.getDefaultOptions();
    const instances = Snake.getInstances();

    Object.assign(this, defaultOptitons, options, instances);

    const {
      size,
    } = this;
    this.actions.transformSnake({ size });
    this.actions.moveSnake({ x: 0, y: 0 });
  }

  /**
   * @method
   */
  static getDefaultOptions() {
    return {
      size: 10,
      spread: 2,
      color: '#000',
      context: null,
      actions: null,
    };
  }

  /**
   * @static
   * @method
   */
  static getInstances() {
    return {
      requestID: -1,
      boundary: null,
      motionOperate: null,
      head: {
        location: {
          x: 0,
          y: 0,
        },
        rtl: Rtl.None,
      },
    };
  }

  /**
   * @method
   */
  static boundaryDetection({ size, boundary, location }) {
    const {
      width,
      height,
    } = boundary;
    const {
      x,
      y,
    } = location;
    const top = 0;
    const right =  width - size;
    const bottom = height - size;
    const left = 0;
    let flag = false;
    if ((x <= right && x >= left) && (y <= bottom && y >= top)) {
      flag = true
    }
    return flag;
  }

  /**
   * @method
   */
  mapStateToProps(state) {
    const {
      boundary,
      snake: {
        size,
        location,
      },
    } = state;
    if (Snake.boundaryDetection({ boundary, size, location })) {
      const {
        x,
        y,
      } = location;
      this.clearHead();
      this.setHeadLocation({ x, y });
      this.drawHead();
    } else {
      this.cancelMotionAnimation();
    }
  }

  /**
   * @method
   */
  setHeadLocation(location) {
    this.head.location = location;
  }

  /**
   * @method
   */
  getMotionOperate() {
    let {
      spread,
      head: {
        rtl,
        location: {
          x,
          y,
        },
      },
    } = this;
    let motionOperate = null;
    switch (rtl) {
      case Rtl.Down:
        motionOperate = () => {
          y += spread;
          this.actions.moveSnake({ x, y });
        }
        break;
      case Rtl.Left:
        motionOperate = () => {
          x -= spread;
          this.actions.moveSnake({ x, y });
        }
        break;
      case Rtl.Up:
        motionOperate = () => {
          y -= spread;
          this.actions.moveSnake({ x, y });
        }
        break;
      case Rtl.Right:
        motionOperate = () => {
          x += spread;
          this.actions.moveSnake({ x, y });
        }
        break;
    }
    return motionOperate;
  }

  /**
   * @method
   */
  setHeadRtl(rtl) {
    this.head.rtl = rtl;
    this.motionOperate = this.getMotionOperate();

    if (this.requestID !== -1) {
      this.cancelMotionAnimation();
    }
    this.requestMotionAnimation();
  }

  /**
   * @method
   */
  clearHead() {
    const {
      size,
      color,
      head: {
        location: {
          x,
          y,
        },
      },
    } = this;
    this.context.clearRect(x, y, size, size);
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
    } = this;
    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);
  }

  /**
   * @method
   */
  moveStep() {
    if (this.motionOperate != null) {
      this.clearHead();
      this.motionOperate();
      this.drawHead();
    }
  }

  /**
   * @method
   */
  requestMotionAnimation() {
    this.requestID = window.requestAnimationFrame(() => {
      this.moveStep();
      this.requestMotionAnimation();
    });
  }

  /**
   * @method
   */
  cancelMotionAnimation() {
    const {
      requestID,
    } = this;

    if (requestID != -1) {
      window.cancelAnimationFrame(requestID);
    }
  }
}

export default Snake;
