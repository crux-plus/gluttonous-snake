import deepEqual from 'deep-equal';

const Sym = Object.freeze({
  SIZE: Symbol('size'),
  LOCATION: Symbol('location'),
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
    };
  }

  /**
   * @method
   */
  mapStateToProps(state) {
    const {
      eggs: {
        size,
        location,
      },
    } = state;
    this.clear();
    this.size = size;
    this.location = location;
    this.draw();
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
      this[Sym.LOCATION] = location;
    }
  }

  get location() {
    return this[Sym.LOCATION];
  }

  /**
   * @method
   */
  lay() {
    this.actions.createEgg();
  }


  /**
   * @method
   */
  reset() {
    this.clear();
    this.lay();
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
  }

  /**
   * @method
   */
  clear() {
    const {
      size,
      location: {
        x,
        y,
      },
    } = this;
    this.context.clearRect(x, y, size, size);
  }
}

export default Eggs;
