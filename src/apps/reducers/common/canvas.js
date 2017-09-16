const initialState = {
  size: {
    width: 0,
    height: 0,
  },
};

function canvasReducer(state = initialState, action) {
  switch (action.type) {
    case 'RESIZE_CANVAS':
      return {
        ...state,
        size: action.size,
      };
    default:
      return state;
  }
}

export default canvasReducer;
