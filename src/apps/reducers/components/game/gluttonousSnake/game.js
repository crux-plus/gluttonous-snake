import { fromJS } from 'immutable';

import Status from 'components/game/GluttonousSnake/Status';

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
  status: Status.PENDING,
});

export default function status(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_GAME_STATUS':
      return changeGameStatus(state, action);
    default:
      return state;
  }
}
