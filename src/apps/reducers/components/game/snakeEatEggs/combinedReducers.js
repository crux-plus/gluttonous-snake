import { combineReducers } from 'redux-immutable';

import { fromJS } from 'immutable';

import snake from './snake';

import eggs from './eggs';

import boundary from './boundary';

export default combineReducers({
  snake,
  eggs,
  boundary,
});
