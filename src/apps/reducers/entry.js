import { combineReducers } from 'redux-immutable';

import { routerReducer, routerMiddleware } from 'react-router-redux';

import routers from './routers';

export default combineReducers({
  routing: routerReducer,
  routers,
});
