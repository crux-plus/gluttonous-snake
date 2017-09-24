import { increaseSnake } from 'actions/game/snake';

import { createEgg } from 'actions/game/eggs';

import Rtl from 'components/game/SnakeEatEggs/Rtl';

function getIncLoc({ rtl, location, size }) {
  let {
    x,
    y,
  } = location;
  switch (rtl) {
    case Rtl.Down:
      y += size;
      break;
    case Rtl.Left:
      x -= size;
      break;
    case Rtl.Up:
      y -= size;
      break;
    case Rtl.Right:
      x += size;
      break;
  }
  return {
    x,
    y,
  };
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
          location: {
            x: snakeX,
            y: snakeY,
          },
        },
      } = state.toJS();
      if ((
          ((eggsY + eggsSize) > snakeY) &&
          ((snakeY + snakeSize) > eggsY)
        ) &&
        (
          ((snakeX + snakeSize) > eggsX) &&
          ((eggsX + eggsSize) > snakeX)
      )) {
        dispatch(createEgg());
        let location = {
          x: snakeX,
          y: snakeY,
        };
        const size = snakeSize;
        location = getIncLoc({ location, size, rtl });
        dispatch(increaseSnake(location));
      }
    }
    return next(action);
  }
}

export {
  collisionDetection,
};
