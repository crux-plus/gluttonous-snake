// Flux Standard Action utilities for Redux.
import { createActions } from 'redux-actions';

export default createActions({
  MARK_CANVAS: ({ id }) => ({
    id,
  }),
  TRANSFORM_CANVAS: ({ width=0, height=0 }) => ({
    width,
    height,
  }),
});
