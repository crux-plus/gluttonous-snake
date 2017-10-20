// Flux Standard Action utilities for Redux.
import { createActions } from 'redux-actions';

import Rtl from 'client/components/game/GluttonousSnake/Rtl';

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
  ADJUST_SNAKE: ({ spread=0 }) => ({
    spread,
  }),
  CHANGE_SNAKE_MOVE: ({ move=true }) => ({
    move,
  }),
});
