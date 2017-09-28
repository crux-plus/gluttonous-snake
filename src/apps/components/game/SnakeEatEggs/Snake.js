import deepEqual from 'deep-equal';

import Rtl from './Rtl';

const Sym = Object.freeze({
  SIZE: Symbol('size'),
  RTL: Symbol('rtl'),
  BODY: Symbol('body'),
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
        rtl,
        size,
        body,
      },
    } = state;
    this.rtl = rtl;
    this.size= size;

    const [location] = body;
    const {
      boundaryDetection,
    } = Snake;
    if (boundaryDetection({ boundary, size, location })) {
      this.clear();
      this.body = body;
      this.draw();
    } else {
      const {
        body,
      } = this;
      this.actions.restoreSnake({ body });
      this.cancelMoveAnimation();
    }
  }

  /**
   * @method
   */
  set body(body) {
    if (!deepEqual(this.body, body)) {
      this[Sym.BODY] = body;
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
 Operate  */
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
  reset() {
    this.cancelMoveAnimation();
    this.clear();
    this.bindKeyboardEvent();
  }

  /**
   * @method
   */
  clear() {
    const {
      size,
      body,
    } = this;
    body.forEach((location) => {
      const {
        x,
        y,
      } = location;
      this.context.clearRect(x, y, size, size);
    });
  }

  /**
   * @method
   */
  pause() {
    this.removeKeyboardEvent();
    this.cancelMoveAnimation();
  }

  /**
   * @method
   */
  resume() {
    this.requestMoveAnimation();
    this.bindKeyboardEvent();
  }

  /**
   * @method
   */
  draw() {
    const {
      size,
      color,
      body,
    } = this;
    body.forEach((location) => {
      const {
        x,
        y,
      } = location;
      this.fillStyle = color;
      this.context.fillRect(x, y, size, size);
    });
  }

  /**
   * @method
   */
  requestMoveAnimation() {
    const step = () => {
      if (!this.status) {
        this.move();
        this.requestID = requestAnimationFrame(step);
      }
    };
    this.status = false;
    this.requestID = requestAnimationFrame(step);
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
    }
    this.status = true;
  }
}

export default Snake;
