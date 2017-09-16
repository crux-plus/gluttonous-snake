function canvas(state, action) {
  switch (action.type) {
    case RESIZE_CANVAS:
      return {
        ...state,
        size: action.size,
      };
  }
}

export default canvas;
