import { combineReducers } from 'redux';

import canvas from 'reducers/components/common/canvas';

import status from './status';

export default combineReducers({
  status,
  canvas,
});
