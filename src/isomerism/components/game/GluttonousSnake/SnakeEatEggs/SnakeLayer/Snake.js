import { fromJS } from 'immutable';

import Hammer from 'hammerjs';

import Rtl from '../../Rtl';

import Status from '../../Status';

const Sym = Object.freeze({
  MOVE: Symbol('move'),
  SIZE: Symbol('size'),
  RTL: Symbol('rtl'),
  BODY: Symbol('body'),
  STATUS: Symbol('status'),
  CONTEXT: Symbol('context'),
  IMMUTABLE: Symbol('immutable'),
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
    this.handleSwipeEvent = this.handleSwipeEvent.bind(this);
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
      requestID: -1,
      move: false,
      boundary: null,
      rtl: Rtl.None,
      length: 1,
      status: Status.PENDING,
    };
  }

  /**
   * @method
   */
  set context(context) {
    if (this.context !== context) {
      this.clearAll();
      this[Sym.CONTEXT] = context;
    }
  }

  /**
   * @method
   */
  get context() {
    return this[Sym.CONTEXT];
  }

  set immutable(immutable) {
    if (!this.immutable.equals(immutable)) {
      if (this.immutable.get('body') !== immutable.get('body')) {
        this.body = immutable.get('body').toJS();
      }

      if (this.immutable.get('size') !== immutable.get('size')) {
        this.size = immutable.get('size');
      }

      if (this.immutable.get('rtl') !== immutable.get('rtl')) {
        this.rtl = immutable.get('rtl');
      }

      this[Sym.IMMUTABLE] = immutable;
    }
  }

  get immutable() {
    let immutable;
    if (this[Sym.IMMUTABLE]) {
      immutable = this[Sym.IMMUTABLE];
    } else {
      immutable = fromJS(Object.assign({}, this));
    }
    return immutable;
  }

  /**
   * @method
   */
  set body(body) {
    this.clear();
    this[Sym.BODY] = body;
    this.draw();
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
    this[Sym.SIZE] = size;
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
    this[Sym.RTL] = rtl;
    if (rtl !== Rtl.None) {
      this.move = true;
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
    if (this.status !== status) {
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
  set move(move) {
    if (this.move !== move) {
      this[Sym.MOVE] = move;
      if (move === true) {
        this.cancelMoveAnimation();
        this.requestMoveAnimation();
      } else if (move === false) {
        this.cancelMoveAnimation();
      }
    } else if (move === true) {
      this.cancelMoveAnimation();
      this.requestMoveAnimation();
    }
  }

  /**
   * @method
   */
  get move() {
    return this[Sym.MOVE];
  }

  /**
   * @method
   */
  get moveStep() {
    const {
      spread,
      rtl,
      body: [location],
    } = this;
    let {
      x,
      y,
    } = location;
    let moveStep;
    switch (rtl) {
      case Rtl.Down:
        moveStep = () => {
          const delta = {
            x: 0,
            y: spread,
          };
          this.actions.moveSnake(delta);
        }
        break;
      case Rtl.Left:
        moveStep = () => {
          const delta ={
            x: -spread,
            y: 0,
          };
          this.actions.moveSnake(delta);
        }
        break;
      case Rtl.Up:
        moveStep = () => {
          const delta = {
            x: 0,
            y: -spread,
          };
          this.actions.moveSnake(delta);
        }
        break;
      case Rtl.Right:
        moveStep = () => {
          const delta = {
            x: spread,
            y: 0,
          };
          this.actions.moveSnake(delta);
        }
        break;
      default:
        moveStep = new Function();
    }
    return moveStep;
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

    const hammer = new Hammer(window || null);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on('swipe', this.handleSwipeEvent);
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
    if (this.status === Status.UNDERWAY) {
      this.actions.changeGameStatus({ status: Status.PAUSE });
    }
  }

  /**
   * @method
   */
  handleSwipeEvent(event) {
    const {
      direction,
    } = event;
    let rtl;
    switch (direction) {
      case 1:
        rtl = Rtl.None;
        break;
      case 2:
        rtl = Rtl.Left;
        break;
      case 4:
        rtl = Rtl.Right;
        break;
      case 8:
        rtl = Rtl.Up;
        break;
      case 16:
        rtl = Rtl.Down;
        break;
    }
    this.translate(rtl);
  }

  /**
   * @method
   */
  reset() {
    this.move = false;
    this.bindKeyboardEvent();
    this.clearAll();
    return this;
  }

  /**
   * @method
   */
  clearAll() {
    let {
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
    let {
      size,
      body,
    } = this;
    if (Array.isArray(body)) {
      const tail = body[body.length - 1];
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
    this.move = false;
    this.removeKeyboardEvent();
    return this;
  }

  /**
   * @method
   */
  resume() {
    this.move = true;
    this.bindKeyboardEvent();
    return this;
  }

  /**
   * @method
   */
  draw() {
    let {
      size,
      color,
      body,
    } = this;
    if (Array.isArray(body)) {
      body.forEach((location) => {
        const {
          x,
          y,
        } = location;
        this.fillStyle = color;
        this.context.fillRect(x, y, size, size);
      });
    }
    return this;
  }

  /**
   * @method
   */
  requestMoveAnimation() {
    const step = () => {
      if (this.status === Status.UNDERWAY && this.move === true) {
        this.moveStep();
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
    }
    return this;
  }
}

export default Snake;
