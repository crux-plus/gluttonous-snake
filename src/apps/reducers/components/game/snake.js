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
      x: deltaX,
      y: deltaY,
    },
  } = action;
  let {
    body,
    length,
  } = state.toJS();
  const location = {
    x: body[0].x + deltaX,
    y: body[0].y + deltaY,
  };
  body.unshift(location);
  body = body.slice(0, length);
  return state.mergeDeep({
    body,
  });
}

function increaseSnake(state, action) {
  const {
    payload: {
      x,
      y,
    },
  } = action;
  let {
    length,
    body,
  } = state.toJS();
  length = length + 1;
  const location = {
    x,
    y,
  };
  body.unshift(location);
  body = body.slice(0, length);
  return state.mergeDeep({
    length,
    body,
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

function restoreSnake(state, action) {
  const {
    payload: {
      body,
    },
  } = action;
  return state.mergeDeep({
    body,
  });
}

const initialState = fromJS({
  rtl: Rtl.None,
  length: 1,
  size: 0,
  body: [
    {
      x: 0,
      y: 0,
    },
  ],
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
    case 'RESTORE_SNAKE':
      return restoreSnake(state, action);
    default:
      return state;
  }
}
