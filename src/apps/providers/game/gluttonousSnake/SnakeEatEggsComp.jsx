import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

import {
  translateEggs,
  correctionClean,
  boundaryDetection,
  collisionDetection,
  selfEatingDetection,
} from 'middlewares/game/gluttonousSnake/snakeEatEggs';

const middleware = [
  translateEggs.bind(this),
  correctionClean.bind(this),
  boundaryDetection.bind(this),
  collisionDetection.bind(this),
  selfEatingDetection.bind(this),
];

const store = createStore(
  snakeEatEggs,
  composeWithDevTools(
    // other store enhancers if any
    applyMiddleware(...middleware),
  ),
);

export default store;
