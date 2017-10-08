import deepEqual from 'deep-equal';

import Status from '../../Status';

const Sym = Object.freeze({
  SIZE: Symbol('size'),
  LOCATION: Symbol('location'),
  STATUS: Symbol('status'),
  CONTEXT: Symbol('context'),
});

/**
 * @class
 */
class Eggs {
  /**
   * @constructor
   */
  constructor(options = { size: 10, color: '#000' }) {
    const defaultOptitons = Eggs.getDefaultOptions();
    const instances = Eggs.getInstances();
    Object.assign(this, defaultOptitons, options, instances);

    const {
      size,
    } = this;
  }

  /**
   * @method
   */
  static getDefaultOptions() {
    return {
      size: 10,
      color: '#000',
      context: null,
   };
  }

  /**
   * @static
   * @method
   */
  static getInstances() {
    return {
      location: {
        x: 0,
        y: 0,
      },
      status: Status.PENDING,
    };
  }

  /**
   * @method
   */
  mapStateToProps(state) {
    const {
      eggs,
    } = state;
    Object.assign(this, eggs);
  }

  /**
   * @method
   */
  set context(context) {
    if (!deepEqual(this.context, context)) {
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
  set size(size) {
    if (!deepEqual(this.size, size)) {
      this[Sym.SIZE] = size;
    }
  }

  get size() {
    return this[Sym.SIZE];
  }

  /**
   * @method
   */
  set location(location) {
    if (!deepEqual(this.location, location)) {
      this.clear();
      this[Sym.LOCATION] = location;
      this.draw();
    }
  }

  /**
   * @method
   */
  get location() {
    return this[Sym.LOCATION];
  }

  /**
   * @method
   */
  processStatus(status) {
    switch (status) {
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
  translate() {
    this.actions.translateEggs();
    return this;
  }


  /**
   * @method
   */
  reset() {
    this.clear();
    return this;
  }

  /**
   * @method
   */
  draw() {
    const {
      size,
      color,
      location: {
        x,
        y,
      },
    } = this;
    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);
    return this;
  }

  /**
   * @method
   */
  clear() {
    const {
      size,
      location,
    } = this;
    if (location) {
      const {
        x,
        y,
      } = location;
      this.context.clearRect(x, y, size, size);
    }
    return this;
  }
}

export default Eggs;
