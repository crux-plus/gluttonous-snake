import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux'

import snakeEatEggs from 'reducers/components/game/gluttonousSnake/snakeEatEggs';

import { boundaryDetection, collisionDetection, selfEatingDetection } from 'middlewares/game/gluttonousSnake/snakeEatEggs';

const middleware = [boundaryDetection, collisionDetection, selfEatingDetection];

const store = createStore(
  snakeEatEggs,
  composeWithDevTools(
    // other store enhancers if any
    applyMiddleware(...middleware),
  ),
);

export default store;
