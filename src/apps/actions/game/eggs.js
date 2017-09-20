function createEgg({ x=0, y=0 }) {
  return {
    type: 'EGG_MOVE',
    location: {
      x,
      y,
    },
  };
}

export {
  createEgg,
};
