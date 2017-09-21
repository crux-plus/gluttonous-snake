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
      } = state;
    }
    return next(action);
  }
}

export {
  collisionDetection,
};
