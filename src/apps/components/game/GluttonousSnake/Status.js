/**
 * @class
 */
class Status {
}

Object.defineProperties(Status, {
  'PENDING': {
    value: -1,
    writable: false,
  },
  'UNDERWAY': {
    value: 0,
    writable: false,
  },
  'PAUSE': {
    value: 1,
    writable: false,
  },
  'END': {
    value: 2,
    writable: false,
  },
  'GRADE': {
    value: 3,
    writable: false,
  },
});

Object.freeze(Status);

export default Status;
