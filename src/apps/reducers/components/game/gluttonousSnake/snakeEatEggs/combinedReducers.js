import { combineReducers } from 'redux-immutable';

import { fromJS } from 'immutable';

import canvas from 'reducers/components/common/canvas';

import snake from './snake';

import eggs from './eggs';

import boundary from './boundary';

export default combineReducers({
  canvas,
  snake,
  eggs,
  boundary,
});
