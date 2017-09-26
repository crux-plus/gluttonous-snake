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

const initialState = fromJS({
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
      return initialState;
    default:
      return state;
  }
}
