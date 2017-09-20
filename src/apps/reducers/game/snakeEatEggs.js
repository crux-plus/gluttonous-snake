function snakeMove(state, action) {
  const {
    location,
  } = action;

  return {
    ...state,
    snake: {
      location,
    },
  };
}

function eggsMove(state, action) {
  const {
    location,
  } = action;

  return {
    ...state,
    eggs: {
      location,
    },
  };
}

const initialState = {
  snake: {
    location: {
      x: 0,
      y: 0,
    },
  },
  egg: {
    location: {
      x: 0,
      y: 0,
    },
  },
};

function snakeEatEggsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SNAKE::MOVE':
      return snakeMove(state, action);
    case 'EGG::MOVE':
      return eggsMove(state, action);
    default:
      return state;
  }
}

export default snakeEatEggsReducer;
