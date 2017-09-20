function snakeMove({ x=0, y=0 }) {
  return {
    type: 'SNAKE::MOVE',
    location: {
      x,
      y,
    },
  };
}

function eggMove({ x=0, y=0 }) {
  return {
    type: 'EGG::MOVE',
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
