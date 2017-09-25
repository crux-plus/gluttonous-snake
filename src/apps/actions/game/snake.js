// Flux Standard Action utilities for Redux.
import { createActions } from 'redux-actions';

import Rtl from 'components/game/SnakeEatEggs/Rtl';

export default createActions({
  TRANSLATE_SNAKE: ({ rtl=Rtl.None }) => ({
    rtl,
  }),
  INCREASE_SNAKE: ({ locations }) => ({
    locations,
  }),
  TRANSFORM_SNAKE: ({ size=0 }) => ({
    size,
  }),
  MOVE_SNAKE: ({ x=0, y=0 }) => ({
    x,
    y,
  }),
  RESTORE_SNAKE: ({ body=[] }) => ({
    body,
  }),
  ADJUST_SNAKE: ({ spreed=0 }) => ({
    spreed,
  }),
});
