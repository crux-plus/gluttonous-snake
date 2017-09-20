function snakeMove(state, action) {
  const {
    location,
  } = action;

  return {
    ...state,
    location,
  };
}

function snake(state = initialState, action) {
  switch (action.type) {
    case 'SNAKE_MOVE':
      return snakeMove(state, action);
    default:
      return state;
  }
}

export default snake;
