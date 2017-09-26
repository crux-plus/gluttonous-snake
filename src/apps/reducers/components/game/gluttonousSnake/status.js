import { fromJS } from 'immutable';

function changeReadyStatus(state, action) {
  const {
    payload: {
      ready,
    },
  } = action;
  return state.mergeDeep({
    ready,
  });
}

const initialState = fromJS({
  ready: false,
});

export default function status(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_READY_STATUS':
      return changeReadyStatus(state, action);
    default:
      return state;
  }
}
