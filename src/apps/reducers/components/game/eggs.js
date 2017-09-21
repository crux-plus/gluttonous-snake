function transformEggs(state, action) {
  const {
    size,
  } = action;
  return {
    ...state,
    size,
  };
}

const initialState = {
  size: 0,
  location: {
    x: 0,
    y: 0,
  },
}

export default function eggs(state = initialState, action) {
  switch (action.type) {
    case 'TRANSFORM_EGGS':
      return transformEggs(state, action);
    default:
      return state;
  }
}
