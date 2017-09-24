import { fromJS } from 'immutable';

function useDefaultCanvas(state, action) {
  const date = new Date();
  const time = date.getTime();
  const {
    innerWidth: width,
    innerHeight: height,
  } = window;
  return state.mergeDeep({
    id: time,
    width,
    height,
  });
}

function transformCanvas(state, action) {
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

function markCanvas(state, action) {
  const {
    playload: {
      id,
    },
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
    case 'USE_DEFAULT_CANVAS':
      return useDefaultCanvas(state, action);
    case 'TRANSFORM_CANVAS':
      return transformCanvas(state, action);
    case 'MARK_CANVAS':
      return markCanvas(state, action);
    default:
      return state;
  }
}

export default canvas;
