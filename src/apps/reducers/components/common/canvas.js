import { fromJS } from 'immutable';

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

function getInitialState() {
  const date = (new Date());
  const id = date.getTime();
  const {
    innerWidth: width,
    innerHeight: height,
  } = window;
  return {
    id,
    width,
    height,
  };
}

const initialState = fromJS(getInitialState());

export default (state = initialState, action) =>  {
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
};
