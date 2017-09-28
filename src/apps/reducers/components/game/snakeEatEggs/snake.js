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

function adjustSnake(state, action) {
  const {
    payload: {
      spread,
    },
  } = action;
  return state.mergeDeep({
    spread,
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
      locations,
    },
  } = action;
  let {
    length,
    body,
    score,
  } = state.toJS();
  body.unshift(...locations);
  length = body.length;
  score = score + 1;
  return state.mergeDeep({
    score,
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
  score: 1,
  length: 1,
  spread: 2,
  size: 10,
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
