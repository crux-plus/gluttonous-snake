/**
 * @class
 */
class Eggs {
  /**
   * @constructor
   */
  constructor(options = { size: 10, color: '#000' }) {
    const defaultOptitons = Eggs.getDefaultOptions();
    Object.assign(this, defaultOptitons, options);

    this.initMultiple();
    this.location = this.getRandomLocation();
  }

  /**
   * @method
   */
  static getDefaultOptions() {
    return {
      size: 10,
      color: '#000',
      context: null,
      multiple: null,
      outer: {
        width: 0,
        height: 0,
      },
    };
  }

  /**
   * @method
   */
  initMultiple() {
    const {
      size,
      outer: {
        width,
        height,
      },
    } = this;
    const multiple = {
      x: Math.floor((width - size) / size),
      y: Math.floor((height - size) / size),
    };
    this.multiple = multiple;
  }

  /**
   * @method
   */
  getRandomLocation() {
    const {
      size,
      multiple: {
        x,
        y,
      },
    } = this;
    const location = {
      x: Math.ceil(Math.random() * x) * size,
      y: Math.ceil(Math.random() * y) * size,
    };
    return location;
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
}

export default Eggs;
