import { fromJS } from 'immutable';

const Sym = Object.freeze({
  BOUNDARY: Symbol('boundary'),
  CONTEXT: Symbol('context'),
});

/**
 * @class
 */
class Background {
  /**
   * @constructor
   */
  constructor(options = { color: '#ccc' }) {
    const defaultOptitons = Background.getDefaultOptions();
    const instances = Background.getInstances();
    Object.assign(this, defaultOptitons, options, instances);
  }

  /**
   * @method
   */
  static getDefaultOptions() {
    return {
      size: 10,
      color: '#ccc',
      context: null,
   };
  }

  /**
   * @static
   * @method
   */
  static getInstances() {
    return {
      boundary: {
        width: 0,
        heigth: 0,
      },
    };
  }

  /**
   * @method
   */
  set context(context) {
    if (this.context !== context) {
      this.clear();
      this[Sym.CONTEXT] = context;
    }
  }

  /**
   * @method
   */
  get context() {
    return this[Sym.CONTEXT];
  }

  /**
   * @method
   */
  set immutable(immutable) {
    if (!this.immutable.equals(immutable)) {
      this.boundary = immutable.toJS();
      this[Sym.IMMUTABLE] = immutable;
    }
  }

  /**
   * @method
   */
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
  set boundary(boundary) {
    this.clear();
    this[Sym.BOUNDARY] = boundary;
    this.draw();
  }

  /**
   * @method
   */
  get boundary() {
    return this[Sym.BOUNDARY];
  }

  /**
   * @method
   */
  draw() {
    const {
      color,
      boundary: {
        width,
        height,
      },
    } = this;
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, width, height);
  }

  /**
   * @method
   */
  clear() {
    if (typeof this.boundary === 'object') {
      const {
        boundary: {
          width,
          height,
        },
      } = this;
      this.context.clearRect(0, 0, width, height);
    }
  }
}

export default Background;
