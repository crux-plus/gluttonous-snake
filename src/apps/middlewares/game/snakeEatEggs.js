import { createEgg, transformEggs } from 'actions/game/eggs';

function collisionDetection({ getState, dispatch }) {
  return next => action => {
    if (action.type === 'MOVE_SNAKE') {
      const state = getState();
      const {
        eggs,
        snake,
      } = state;
      const {
        size: eggsSize,
        location: {
          x: eggsX,
          y: eggsY,
        },
      } = snake.toJS();
      const {
        size: snakeSize,
        location: {
          x: snakeX,
          y: snakeY,
        },
      } = eggs.toJS();
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
