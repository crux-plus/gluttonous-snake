import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux'

import snakeEatEggs from 'reducers/components/game/gluttonousSnake/snakeEatEggs';

const store = createStore(
  snakeEatEggs,
  composeWithDevTools(
    // other store enhancers if any
    applyMiddleware(),
  ),
);

export default store;
