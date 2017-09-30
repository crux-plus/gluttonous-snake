import { combineReducers } from 'redux-immutable';

import { fromJS } from 'immutable';

import info from './info';

import snake from './snake';

import eggs from './eggs';

import boundary from './boundary';

export default combineReducers({
  info,
  snake,
  eggs,
  boundary,
});
