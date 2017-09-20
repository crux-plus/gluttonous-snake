function resizeBoundary({ width=0, height=0 }) {
  return {
    type: 'RESIZE_BOUNDARY',
    boundary: {
      width,
      height,
    },
  };
}

export {
  resizeBoundary,
};
