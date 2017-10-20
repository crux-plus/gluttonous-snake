import Immutable from 'immutable';

import { LOCATION_CHANGE } from 'react-router-redux';

function locationChange(state, action) {
  return state.set('locationBeforeTransitions', action.payload);
}

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return locationChange(state, action);
    default:
      return state;
  }
};
