// Flux Standard Action utilities for Redux.
import { createActions } from 'redux-actions';

export default createActions({
  TRANSFORM_EGGS: ({ size=0 }) => ({
    size,
  }),
  CREATE_EGG: null,
});
