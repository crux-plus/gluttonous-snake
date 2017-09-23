function moveSnake({ x=0, y=0 }) {
  return {
    type: 'MOVE_SNAKE',
    location: {
      x,
      y,
    },
  };
}

function transformSnake({ size=0 }) {
  return {
    type: 'TRANSFORM_SNAKE',
    size,
  };
}

function increaseSnake({ x=0, y=0 }) {
  return {
    type: 'INCREASE_SNAKE',
    location: {
      x,
      y,
    },
  };
}

function translateSnake(rtl) {
  return {
    type: 'TRANSLATE_SNAKE',
    rtl,
  };
}

export {
  moveSnake,
  transformSnake,
  increaseSnake,
  translateSnake,
};
