import { createEgg, transformEggs } from 'actions/game/eggs';

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
      }
    }
    return next(action);
  }
}

export {
  collisionDetection,
};
