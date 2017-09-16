function resizeCanvas({ width=0, height=0 }) {
  return {
    type: RESIZE_CANVAS,
    size: {
      width,
      height,
    },
  };
}

export dafault {
  resizeCanvas,
};
