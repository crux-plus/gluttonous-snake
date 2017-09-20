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
    type: 'TRANSFORM_EGGS',
    size,
  };
}

export {
  moveSnake,
  transformSnake,
};
