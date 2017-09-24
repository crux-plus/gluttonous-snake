import { bindActionCreators } from 'redux';

import snakeActionCreators from 'actions/game/snake';

import eggsActionCreators from 'actions/game/eggs';

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
        location = getIncLoc({ location, size, rtl });
        actions.increaseSnake(location);
      }
    }
    return next(action);
  }
}

export {
  collisionDetection,
};
