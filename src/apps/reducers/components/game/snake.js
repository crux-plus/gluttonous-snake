import Rtl from 'components/game/SnakeEatEggs/Rtl';

import { fromJS } from 'immutable';

function transformSnake(state, action) {
  const {
    payload: {
      size,
    },
  } = action;
  return state.mergeDeep({
    size,
  });
}

function moveSnake(state, action) {
  const {
    payload: {
      x,
      y,
    },
  } = action;
  return state.mergeDeep({
    location: {
      x,
      y,
    },
  });
}

function increaseSnake(state, action) {
  let {
    length,
  } = state.toJS();
  length = length + 1;
  const {
    payload: {
      x,
      y,
    },
  } = action;
  return state.mergeDeep({
    length,
    location: {
      x,
      y,
    },
  });
}

function translateSnake(state, action) {
  const {
    payload: {
      rtl,
    },
  } = action;
  return state.mergeDeep({
    rtl,
  });
}


const initialState = fromJS({
  rtl: Rtl.None,
  length: 1,
  size: 0,
  location: {
    x: 0,
    y: 0,
  },
});

export default function snake(state = initialState, action) {
  switch (action.type) {
    case 'TRANSFORM_SNAKE':
      return transformSnake(state, action);
    case 'MOVE_SNAKE':
      return moveSnake(state, action);
    case 'INCREASE_SNAKE':
      return increaseSnake(state, action);
    case 'TRANSLATE_SNAKE':
      return translateSnake(state, action);
    default:
      return state;
  }
}
