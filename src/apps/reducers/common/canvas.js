function resize(state, action) {
  const {
    size: {
      width,
      height,
    },
  } = action;

  return {
    ...state,
    width,
    height,
  };
}

function reallocateId(state, action) {
  const {
    id,
  } = action;

  return {
    ...state,
    id,
  };
}

const initialState = {
  id: 0,
  width: 0,
  height: 0,
};

function canvasReducer(state = initialState, action) {
  switch (action.type) {
    case 'CANVAS::RESIZE':
      return resize(state, action);
    case 'CANVAS::REALLOCATE_ID':
      return reallocateId(state, action);
    default:
      return state;
  }
}

export default canvasReducer;
