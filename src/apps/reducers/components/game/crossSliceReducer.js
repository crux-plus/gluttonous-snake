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
  let {
    boundary,
    eggs,
  } = state;
  const {
    size,
  } = eggs.toJS();
  const {
    x,
    y,
  } = ramLoc({ size, boundary: boundary.toJS(), });
  eggs = eggs.mergeDeep({
    location: {
      x,
      y,
    },
  });
  return {
    ...state,
    eggs,
  };
}

const initialState = {
  boundary: fromJS({
    width: 0,
    height: 0,
  }),
  eggs: fromJS({
    size: 0,
    location: {
      x: 0,
      y: 0,
    },
  }),
  snake: fromJS({
    size: 0,
    location: {
      x: 0,
      y: 0,
    },
  }),
};

export default function crossSliceReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_EGG':
      return createEgg(state, action);
    default:
      return state;
  }
}
