function transformSnake(state, action) {
  const {
    size,
  } = action;
  return {
    ...state,
    size,
  };
}

function moveSnake(state, action) {
  const {
    location,
  } = action;
  return {
    ...state,
    location,
  };
}

const initialState = {
  size: 0,
  location: {
    x: 0,
  },
};

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
