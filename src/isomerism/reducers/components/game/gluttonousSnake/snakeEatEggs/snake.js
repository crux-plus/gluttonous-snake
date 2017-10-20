import { fromJS } from 'immutable';

import { currentTime } from 'isomerism/helpers/common';

import Rtl from 'isomerism/components/game/GluttonousSnake/Rtl';

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

function changeSnakeMove(state, action) {
  const {
    payload: {
      move,
    },
  } = action;
  return state.mergeDeep({
    move,
  });
}

const initialState = fromJS({
  id: currentTime(),
  rtl: Rtl.None,
  move: false,
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
    case 'CHANGE_SNAKE_MOVE':
      return changeSnakeMove(state, action);
    default:
      return state;
  }
}
