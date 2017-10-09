import { fromJS } from 'immutable';

function boundaryDetection({ size, boundary, location }) {
  const {
    width,
    height,
  } = boundary;
  const {
    x,
    y,
  } = location;
  const top = 0;
  const right =  width - size;
  const bottom = height - size;
  const left = 0;
  let flag = false;
  if ((x <= right && x >= left) && (y <= bottom && y >= top)) {
    flag = true
  }
  return flag;
}

function ramLoc({ size, boundary }) {
  const {
    width,
    height,
  } = boundary;

  const multipleX = Math.floor((width - size) / size);
  const multipleY = Math.floor((height - size) / size);

  const x = Math.ceil(Math.random() * multipleX) * size;
  const y = Math.ceil(Math.random() * multipleY) * size;

  return {
    x,
    y,
  };
}

function translateEggs(state, action) {
  const {
    boundary,
    eggs: {
      size,
    },
  } = state.toJS();
  const {
    x,
    y,
  } = ramLoc({ size, boundary });
  return state.mergeDeep({
    eggs: {
      location: {
        x,
        y,
      },
    },
  });
}

function resetSnakeEatEggs(state, action) {
  const {
    background,
    eggs,
    snake,
    boundary: {
      width,
      height,
    },
  } = state.toJS();
  return initialState.mergeDeep({
    background: {
      id: background.id,
    },
    eggs: {
      id: eggs.id,
    },
    snake: {
      id: snake.id,
    },
    boundary: {
      width,
      height,
    },
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
    boundary,
    snake: {
      size,
      body,
      length,
    },
  } = state.toJS();
  const [head] = body;
  const location = {
    x: head.x + deltaX,
    y: head.y + deltaY,
  };
  if (boundaryDetection({ size, boundary, location })) {
    body.unshift(location);
    body = body.slice(0, length);
  }
  return state.mergeDeep({
    snake: {
      body,
    }
  });
}

const initialState = fromJS({
  background: {
  },
  boundary: {
    width: 0,
    height: 0,
  },
  eggs: {
    size: 10,
    location: {
      x: 0,
      y: 0,
    },
  },
  snake: {
    move: false,
    length: 1,
    spread: 2,
    size: 10,
    body:[
      {
        x: 0,
        y: 0,
      },
    ],
  },
});

export default function crossSliceReducer(state = initialState, action) {
  switch (action.type) {
    case 'TRANSLATE_EGGS':
      return translateEggs(state, action);
    case 'RESET_SNAKE_EAT_EGGS':
      return resetSnakeEatEggs(state, action);
    case 'MOVE_SNAKE':
      return moveSnake(state, action);
    default:
      return state;
  }
}
