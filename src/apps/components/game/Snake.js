import Rtl from 'components/game/Rtl';

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
    this.initBoundary();
    this.saveHeadLocation();
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
      outer: {
        width: 0,
        height: 0,
      },
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
        prevLocation: null,
        rtl: Rtl.None,
      },
    };
  }

  /**
   * @method
   */
  initBoundary() {
    const {
      size,
      outer: {
        width,
        height,
      },
    } = this;
    const boundary = {
      top: 0,
      right: width - size,
      bottom: height - size,
      left: 0,
    };
    this.boundary = boundary;
  }

  /**
   * @method
   */
  getMotionOperate() {
    const {
      spread,
      head: {
        rtl,
        location,
      },
    } = this;
    let motionOperate = null;
    switch (rtl) {
      case Rtl.Down:
        motionOperate = () => {
          location.y += spread;
        }
        break;
      case Rtl.Left:
        motionOperate = () => {
          location.x -= spread;
        }
        break;
      case Rtl.Up:
        motionOperate = () => {
          location.y -= spread;
        }
        break;
      case Rtl.Right:
        motionOperate = () => {
          location.x += spread;
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
  saveHeadLocation() {
    const {
      location,
    } = this.head;
    this.head.prevLocation = { ...location };
  }

  /**
   * @method
   */
  restoreHeadLocation() {
    const {
      prevLocation,
    } = this.head;
    this.head.location = { ...prevLocation };
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
  boundaryDetection(boundary) {
    const {
      top,
      right,
      bottom,
      left,
    } = this.boundary;
    const {
      head: {
        location: {
          x,
          y,
        },
      },
    } = this;
    let flag = false;
    if ((x <= right && x >= left) && (y <= bottom && y >= top)) {
      flag = true;
    }
    return flag;
  }

  /**
   * @method
   */
  moveStep() {
    if (this.motionOperate != null) {
      this.saveHeadLocation();
      this.clearPrevHead();
      this.motionOperate();
    }

    if (!this.boundaryDetection()) {
      this.restoreHeadLocation();
      this.cancelMotionAnimation();
    }

    this.drawHead();
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
