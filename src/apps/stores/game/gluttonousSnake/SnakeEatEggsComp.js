import { createStore } from 'redux'

import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

const store = createStore(snakeEatEggs);

export default store;
