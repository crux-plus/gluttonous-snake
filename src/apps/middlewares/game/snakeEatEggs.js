import { bindActionCreators } from 'redux';

import snakeActionCreators from 'actions/game/snake';

import eggsActionCreators from 'actions/game/eggs';

import Rtl from 'components/game/SnakeEatEggs/Rtl';

function getIncLoc({ rtl, location, size, spreed=2 }) {
  const count = Math.floor(size / spreed);
  const {
    x,
    y,
  } = location;
  const locations = new Array(count);
  locations.fill(0);
  switch (rtl) {
    case Rtl.Down:
      locations.forEach((_, index) => {
        const newY = y + spreed * index;
        locations[index] = {
          x,
          y: newY,
        };
      })
      break;
    case Rtl.Left:
      locations.forEach((_, index) => {
        const newX = x + spreed * index;
        locations[index] = {
          x: newX,
          y,
        };
      })
      break;
    case Rtl.Up:
      locations.forEach((_, index) => {
        const newY = y - spreed * index;
        locations[index] = {
          x,
          y: newY,
        };
      })
      break;
    case Rtl.Right:
      locations.forEach((_, index) => {
        const newX = x + spreed * index;
        locations[index] = {
          x: newX,
          y,
        };
      })
      break;
  }
  locations.shift();
  locations.reverse();
  return locations;
}

function collisionDetection({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'MOVE_SNAKE') {
      const state = getState();
      const {
        eggs: {
          size: eggsSize,
          location: {
            x: eggsX,
            y: eggsY,
          },
        },
        snake: {
          rtl,
          size: snakeSize,
          body: [location],
        },
      } = state.toJS();
      const {
        x: snakeX,
        y: snakeY,
      } = location;
      if ((
          ((eggsY + eggsSize) > snakeY) &&
          ((snakeY + snakeSize) > eggsY)
        ) &&
        (
          ((snakeX + snakeSize) > eggsX) &&
          ((eggsX + eggsSize) > snakeX)
      )) {
        const actions = bindActionCreators({
          ...snakeActionCreators,
          ...eggsActionCreators,
        }, dispatch);
        actions.createEgg();
        let location = {
          x: snakeX,
          y: snakeY,
        };
        const size = snakeSize;
        const locations = getIncLoc({ location, size, rtl });
        actions.increaseSnake({ locations });
      }
    }
    return next(action);
  }
}

export {
  collisionDetection,
};
