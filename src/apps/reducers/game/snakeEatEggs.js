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

function createEgg(state, action) {
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

function snakeEatEggs(state = initialState, action) {
  switch (action.type) {
    case 'SNAKE_MOVE':
      return snakeMove(state, action);
    case 'CREATE_EGG':
      return createEgg(state, action);
    default:
      return state;
  }
}

export default snakeEatEggs;
