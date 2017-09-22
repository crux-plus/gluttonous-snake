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
  } = state;
  const location = ramLoc({ size, boundary });
  const eggs = {
    ...state.eggs,
    location,
  };
  return {
    ...state,
    eggs,
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

export default function crossSliceReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_EGG':
      return createEgg(state, action);
    default:
      return state;
  }
}
