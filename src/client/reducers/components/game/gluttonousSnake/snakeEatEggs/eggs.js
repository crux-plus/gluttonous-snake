import { fromJS } from 'immutable';

import { currentTime } from 'helpers/common';

function transformEggs(state, action) {
  const {
    payload: {
      size,
    },
  } = action;
  return state.mergeDeep({
    size,
  });
}

const initialState = fromJS({
  id: currentTime(),
  size: 10,
  location: {
    x: 0,
    y: 0,
  },
});

export default function eggs(state = initialState, action) {
  switch (action.type) {
    case 'TRANSFORM_EGGS':
      return transformEggs(state, action);
    default:
      return state;
  }
}
