import { fromJS } from 'immutable';

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

function createEgg(state, action) {
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
    boundary: {
      width,
      height,
    },
  } = state.toJS();
  return initialState.mergeDeep({
    boundary: {
      width,
      height,
    },
  });
}

const initialState = fromJS({
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
    case 'CREATE_EGG':
      return createEgg(state, action);
    case 'RESET_SNAKE_EAT_EGGS':
      return resetSnakeEatEggs(state, action);
    default:
      return state;
  }
}
