import { fromJS } from 'immutable';

import Status from 'isomerism/components/game/GluttonousSnake/Status';

function increaseScore(state, action) {
  let {
    score,
  } = state.toJS();
  score += 1;
  return state.mergeDeep({
    score,
  });
}

function changeGameStatus(state, action) {
  const {
    payload: {
      status,
    },
  } = action;
  return state.mergeDeep({
    status,
  });
}

const initialState = fromJS({
  score: 0,
  status: Status.PENDING,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_SCORE':
      return increaseScore(state, action);
    case 'CHANGE_GAME_STATUS':
      return changeGameStatus(state, action);
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}
