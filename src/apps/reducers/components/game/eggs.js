function createEgg(state, action) {
  const {
    location,
  } = action;

  return {
    ...state,
    location,
  };
}

const initialState = {
  location: {
    x: 0,
    y: 0,
  },
};

function eggs(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_EGG':
      return createEgg(state, action);
    default:
      return state;
  }
}

export default eggs;
