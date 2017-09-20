function resizeBoundary(state, action) {
  const {
    boundary,
  } = action;

  return {
    ...state,
    boundary,
  };
}

const initialState = {
  boundary: {
    width: 0,
    height: 0,
  },
};

function boundary(state = initialState, action) {
  switch (action.type) {
    case 'RESIZE_BOUNDARY':
      return resizeBoundary(state, action);
    default:
      return state;
  }
}

export default boundary;
