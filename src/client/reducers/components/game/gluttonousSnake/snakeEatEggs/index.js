import reduceReducers from 'reduce-reducers';

import combinedReducers from './combinedReducers';

import crossSliceReducer from './crossSliceReducer';

export default reduceReducers(
  combinedReducers,
  crossSliceReducer,
);
