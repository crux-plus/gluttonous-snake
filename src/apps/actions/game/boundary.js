// Flux Standard Action utilities for Redux.
import { createActions } from 'redux-actions';

export default createActions({
  RESIZE_BOUNDARY: ({ width=0, height=0 }) => ({
    width,
    height,
  }),
});
