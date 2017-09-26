// Flux Standard Action utilities for Redux.
import { createActions } from 'redux-actions';

export default createActions({
  CHANGE_READY_STATUS: ({ ready }) => ({
    ready,
  }),
});
