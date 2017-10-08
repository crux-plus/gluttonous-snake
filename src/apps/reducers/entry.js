import { combineReducers } from 'redux-immutable';

import routeReducer from './routeReducer';

import routers from './routers';

export default combineReducers({
  routing: routeReducer,
  routers,
});
