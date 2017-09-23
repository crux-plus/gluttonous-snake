function transformCanvas({ width=0, height=0 }) {
  return {
    type: 'TRANSFORM_CANVAS',
    size: {
      width,
      height,
    },
  };
}

function markCanvas({ id=0, }) {
  return {
    type: 'MARK_CANVAS',
    id,
  };
}

function useDefaultCanvas() {
  return {
    type: 'USE_DEFAULT_CANVAS',
  };
}


export {
  transformCanvas,
  markCanvas,
  useDefaultCanvas,
};
