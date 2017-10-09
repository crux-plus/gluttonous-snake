import { fromJS } from 'immutable';

function resizeBoundary(state, action) {
  const {
    payload: {
      width,
      height,
    },
  } = action;
  return state.mergeDeep({
    width,
    height,
  });
}

const initialState = fromJS({
  width: 200,
  height: 200,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESIZE_BOUNDARY':
      return resizeBoundary(state, action);
    default:
      return state;
  }
}
