function transformCanvas(state, action) {
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

function markCanvas(state, action) {
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
    case 'TRANSFORM_CANVAS':
      return transformCanvas(state, action);
    case 'MARK_CANVAS':
      return markCanvas(state, action);
    default:
      return state;
  }
}

export default canvasReducer;
