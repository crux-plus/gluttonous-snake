/**
 * @class
 */
class Rtl {
  /**
   * @static
   */
  static getReverse(rtl) {
    let reverse = Rtl.None;
    switch (rtl) {
      case Rtl.Down:
        reverse = Rtl.Up;
        break;
      case Rtl.Left:
        reverse = Rtl.Right;
        break;
      case Rtl.Up:
        reverse = Rtl.Down;
        break;
      case Rtl.Right:
        reverse = Rtl.Left;
        break;
    }
    return reverse;
  }

  /**
   * @static
   */
  static getRtlFromCode(code) {
    let rtl = Rtl.None;
    switch (code) {
      case 'KeyS':
        rtl = Rtl.Down;
        break;
      case 'KeyA':
        rtl = Rtl.Left;
        break;
      case 'KeyW':
        rtl = Rtl.Up;
        break;
      case 'KeyD':
        rtl = Rtl.Right;
        break;
    }
    return rtl;
  }
}

Object.defineProperties(Rtl, {
  'None': {
    value: -1,
    writable: false,
  },
  'Up': {
    value: 0,
    writable: false,
  },
  'Right': {
    value: 1,
    writable: false,
  },
  'Down': {
    value: 2,
    writable: false,
  },
  'Left': {
    value: 3,
    writable: false,
  },
});

Object.freeze(Rtl);

export default Rtl;
