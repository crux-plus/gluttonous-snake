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

    const {
      size,
    } = this;
    this.actions.transformEggs({ size });
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

  createEgg({ x, y }) {
    this.location = {
      x,
      y,
    };
    this.draw();
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
