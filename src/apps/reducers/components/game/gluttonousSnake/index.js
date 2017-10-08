import { combineReducers } from 'redux';

import canvas from 'reducers/components/common/canvas';

import game from './game';

export default combineReducers({
  game,
});
