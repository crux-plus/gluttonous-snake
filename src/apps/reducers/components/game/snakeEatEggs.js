import { combineReducers } from 'redux';

import boundary from './boundary';

import eggs from './eggs';

import snake from './snake';

export default combineReducers({
  boundary,
  eggs,
  snake,
});
