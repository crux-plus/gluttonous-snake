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
      this.draw(body);
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
    this.bindKeyboardEvent();
    this.clear();
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
  draw(body) {
    const {
      size,
      color,
    } = this;
    body.forEach((location) => {
      const {
        x,
        y,
      } = location;
      this.fillStyle = color;
      this.context.fillRect(x, y, size, size);
    });
    //if (Array.isArray(body)) {
      //let prevLength = 0;
      //if (Array.isArray(prevBody)) {
        //prevLength = prevBody.length;
      //}
      //const {
        //length,
      //} = body;
      //const diff = length - prevLength;
      //const diffBody = body.slice(0, diff + 1);
      //diffBody.forEach((location) => {
        //const {
          //x,
          //y,
        //} = location;
        //this.fillStyle = color;
        //this.context.fillRect(x, y, size, size);
      //});
    //}
    return this;
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
