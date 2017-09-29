import deepEqual from 'deep-equal';

import Rtl from './Rtl';

import Status from '../GluttonousSnake/Status';

const Sym = Object.freeze({
  SIZE: Symbol('size'),
  RTL: Symbol('rtl'),
  BODY: Symbol('body'),
  STATUS: Symbol('status'),
});

/**
 * @class
 */
class Snake {
  /**
   * @constructor
   */
  constructor(options = { size: 10, spread: 2, color: '#000' }) {
    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);

    const defaultOptitons = Snake.getDefaultOptions();
    const instances = Snake.getInstances();
    Object.assign(this, defaultOptitons, options, instances);

    this.bindKeyboardEvent();
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
      body: [
        {
          x: 0,
          y: 0,
        },
      ],
      status: false,
      requestID: -1,
      boundary: null,
      rtl: Rtl.None,
      length: 1,
      status: Status.PENDING,
    };
  }

  /**
   * @method
   */
  mapStateToProps(state) {
    const {
      snake,
    } = state;
    Object.assign(this, snake);
  }

  /**
   * @method
   */
  set body(body) {
    if (!deepEqual(this.body, body)) {
      this.clear();
      this[Sym.BODY] = body;
      this.draw();
    }
  }

  /**
   * @method
   */
  get body() {
    return this[Sym.BODY];
  }

  /**
   * @method
   */
  set size(size) {
    if (!deepEqual(this.size, size)) {
      this[Sym.SIZE] = size;
    }
  }

  /**
   * @method
   */
  get size() {
    return this[Sym.SIZE];
  }

  /**
   * @method
   */
  set rtl(rtl) {
    if (!deepEqual(this.rtl, rtl)) {
      this[Sym.RTL] = rtl;
      this.cancelMoveAnimation();
      this.requestMoveAnimation();
    }
  }

  /**
   * @method
   */
  get rtl() {
    return this[Sym.RTL];
  }

  /**
   * @method
   */
  get move() {
    const {
      spread,
      rtl,
      body: [location],
    } = this;
    let {
      x,
      y,
    } = location;
    let move;
    switch (rtl) {
      case Rtl.Down:
        move = () => {
          const delta = {
            x: 0,
            y: spread,
          };
          this.actions.moveSnake(delta);
        }
        break;
      case Rtl.Left:
        move = () => {
          const delta ={
            x: -spread,
            y: 0,
          };
          this.actions.moveSnake(delta);
        }
        break;
      case Rtl.Up:
        move = () => {
          const delta = {
            x: 0,
            y: -spread,
          };
          this.actions.moveSnake(delta);
        }
        break;
      case Rtl.Right:
        move = () => {
          const delta = {
            x: spread,
            y: 0,
          };
          this.actions.moveSnake(delta);
        }
        break;
      default:
        move = new Function();
    }
    return move;
  }

  /**
   * @method
   */
  processStatus(status) {
    switch (status) {
      case Status.END:
        this.pause();
        break;
      case Status.PENDING:
        if (this.status === Status.END) {
          this.reset();
        }
        break;
      case Status.PAUSE:
        if (this.status === Status.UNDERWAY) {
          this.pause();
        }
        break;
      case Status.UNDERWAY:
        if (this.status === Status.PAUSE) {
          this.resume();
        }
        break;
    }
  }

  /**
   * @method
   */
  set status(status) {
    if (!deepEqual(this.status, status)) {
      this.processStatus(status);
      this[Sym.STATUS] = status;
    }
  }

  /**
   * @method
   */
  get status() {
    return this[Sym.STATUS];
  }

  /**
   * @method
   */
  isRev(rtl) {
    const {
      body: {
        length,
      },
    } = this;
    let flag = false;
    if ((length > 1) && (rtl === Rtl.rev(this.rtl))) {
      flag = true;
    }
    return flag;
  }

  /**
   * @method
   */
  translate(rtl) {
    if ((rtl !== Rtl.None) && (!this.isRev(rtl))) {
      this.actions.translateSnake({ rtl });
    }
  }

  /**
   * @method
   */
  removeKeyboardEvent() {
    window.removeEventListener('keydown', this.handleKeyboardEvent);
  }

  /**
   * @method
   */
  bindKeyboardEvent() {
    window.addEventListener('keydown', this.handleKeyboardEvent);
    window.addEventListener('blur', this.handleBlurEvent);
  }

  /**
   * @method
   */
  handleKeyboardEvent(event) {
    const {
      code,
    } = event;
    const rtl = Rtl.fromCode(code);
    this.translate(rtl);
  }

  /**
   * @method
   */
  handleBlurEvent(event) {
    this.actions.changeGameStatus({ status: Status.PAUSE });
  }

  /**
   * @method
   */
  reset() {
    this.cancelMoveAnimation();
    this.bindKeyboardEvent();
    this.clearAll();
    return this;
  }

  /**
   * @method
   */
  clearAll() {
    const {
      size,
      body,
    } = this;
    if (Array.isArray(body)) {
      body.forEach((location) => {
        const {
          x,
          y,
        } = location;
        this.context.clearRect(x, y, size, size);
      });
    }
    return this;
  }

  /**
   * @method
   */
  clear() {
    const {
      size,
      body,
    } = this;
    if (Array.isArray(body)) {
      const length = body.length;
      const tail = body[length - 1];
      const {
        x,
        y,
      } = tail;
      this.context.clearRect(x, y, size, size);
    }
    return this;
  }

  /**
   * @method
   */
  pause() {
    this.removeKeyboardEvent();
    this.cancelMoveAnimation();
    return this;
  }

  /**
   * @method
   */
  resume() {
    this.requestMoveAnimation();
    this.bindKeyboardEvent();
    return this;
  }

  /**
   * @method
   */
  draw() {
    const {
      size,
      color,
      body ,
    } = this;
    body.forEach((location) => {
      const {
        x,
        y,
      } = location;
      this.fillStyle = color;
      this.context.fillRect(x, y, size, size);
    });
    return this;
  }

  /**
   * @method
   */
  requestMoveAnimation() {
    const step = () => {
      // @FIXME
      if (this.status === Status.UNDERWAY) {
        this.move();
        this.requestID = requestAnimationFrame(step);
      }
    };
    this.requestID = requestAnimationFrame(step);
    return this;
  }

  /**
   * @method
   */
  cancelMoveAnimation() {
    const {
      requestID,
    } = this;
    if (requestID !== -1) {
      cancelAnimationFrame(requestID);
      this.requestID = -1;
    }
    return this;
  }
}

export default Snake;
