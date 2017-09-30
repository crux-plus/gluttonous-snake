import { fromJS } from 'immutable';

function increaseScore(state, action) {
  let {
    score,
  } = state.toJS();
  score += 1;
  return state.mergeDeep({
    score,
  });
}

const initialState = fromJS({
  score: 0,
});

export default function info(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE_SCORE':
      return increaseScore(state, action);
    default:
      return state;
  }
}
