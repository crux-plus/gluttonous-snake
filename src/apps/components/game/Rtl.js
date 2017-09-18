/**
 * @class
 */
class Rtl {
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
