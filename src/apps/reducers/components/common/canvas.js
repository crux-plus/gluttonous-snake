import { fromJS } from 'immutable';

function transformCanvas(state, action) {
  const {
    size: {
      width,
      height,
    },
  } = action;
  return state.mergeDeep({
    width,
    height,
  });
}

function markCanvas(state, action) {
  const {
    id,
  } = action;
  return state.mergeDeep({
    id
  });
}

const initialState = fromJS({
  id: 0,
  width: 0,
  height: 0,
});

function canvas(state = initialState, action) {
  switch (action.type) {
    case 'TRANSFORM_CANVAS':
      return transformCanvas(state, action);
    case 'MARK_CANVAS':
      return markCanvas(state, action);
    default:
      return state;
  }
}

export default canvas;
