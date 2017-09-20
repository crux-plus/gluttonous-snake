function snakeMove({ x=0, y=0 }) {
  return {
    type: 'SNAKE_MOVE',
    location: {
      x,
      y,
    },
  };
}

function eggMove({ x=0, y=0 }) {
  return {
    type: 'EGG_MOVE',
    location: {
      x,
      y,
    },
  };
}

export {
  snakeMove,
  eggMove,
};
