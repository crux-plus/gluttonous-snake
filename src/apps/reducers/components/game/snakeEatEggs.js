function resizeBoundary(state, action) {
  const {
    boundary,
  } = action;
  return {
    ...state,
    boundary,
  };
}

function transformEggs(state, action) {
  const {
    size,
  } = action;
  const eggs = {
    ...state.eggs,
    size,
  };
  return {
    ...state,
    eggs,
  };
}

function createEgg(state, action) {
  const {
    boundary: {
      width,
      height,
    },
    eggs: {
      size,
    },
  } = state;
  const multipleX = Math.floor((width - size) / size);
  const multipleY = Math.floor((height - size) / size);
  const location = {
    x: Math.ceil(Math.random() * multipleX) * size,
    y: Math.ceil(Math.random() * multipleY) * size,
  };

  const eggs = {
    ...state.eggs,
    location,
  };
  return {
    ...state,
    eggs,
  };
}

function transformSnake(state, action) {
  const {
    size,
  } = action;
  const snake = {
    ...state.snake,
    size,
  };
  return {
    ...state,
    snake,
  };
}

function moveSnake(state, action) {
  const {
    location,
  } = action;
  const snake = {
    ...state.snake,
    location,
  };
  return {
    ...state,
    snake,
  };
}

const initialState = {
  boundary: {
    width: 0,
    height: 0,
  },
  eggs: {
    size: 0,
    location: {
      x: 0,
      y: 0,
    },
  },
  snake: {
    size: 0,
    location: {
      x: 0,
      y: 0,
    },
  },
}

export default function snakeEatEggs(state = initialState, action) {
  switch (action.type) {
    case 'TRANSFORM_SNAKE':
      return transformSnake(state, action);
    case 'MOVE_SNAKE':
      return moveSnake(state, action);
    case 'TRANSFORM_EGGS':
      return transformEggs(state, action);
    case 'CREATE_EGG':
      return createEgg(state, action);
    case 'RESIZE_BOUNDARY':
      return resizeBoundary(state, action);
    default:
      return state;
  }
}
