import { fromJS } from 'immutable';

import { currentTime } from 'isomerism/helpers/common';

const initialState = fromJS({
  id: currentTime(),
});

export default function eggs(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
