function resizeBoundary(state, action) {
  const {
    boundary: {
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

const initialState = {
  width: 0,
  height: 0,
};

export default function boundary(state = initialState, action) {
  switch (action.type) {
    case 'RESIZE_BOUNDARY':
      return resizeBoundary(state, action);
    default:
      return state;
  }
}
