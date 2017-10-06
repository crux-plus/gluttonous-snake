/**
 * @class
 */
class Background {
  /**
   * @constructor
   */
  constructor(options = { color: '#000' }) {
  }

  /**
   * @method
   */
  static getDefaultOptions() {
    return {
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

export default Background;
