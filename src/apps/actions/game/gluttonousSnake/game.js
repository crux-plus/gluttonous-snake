// Flux Standard Action utilities for Redux.
import { createActions } from 'redux-actions';

export default createActions({
  CHANGE_GAME_STATUS: ({ status }) => ({
    status,
  }),
  RESET_GAME: null,
  INCREASE_SCORE: null,
});
