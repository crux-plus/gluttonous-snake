function createEgg() {
  return {
    type: 'CREATE_EGG',
  };
}

function transformEggs({ size=0 }) {
  return {
    type: 'TRANSFORM_EGGS',
    size,
  };
}

export {
  createEgg,
  transformEggs,
};
