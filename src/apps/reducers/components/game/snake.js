import { fromJS } from 'immutable';

function transformSnake(state, action) {
  const {
    size,
  } = action;
  return state.mergeDeep({
    size,
  });
}

function moveSnake(state, action) {
  const {
    location: {
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

const initialState = fromJS({
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
    default:
      return state;
  }
}
