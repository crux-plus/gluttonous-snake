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
};

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
