function canvasSizeActionCreator({ width=0, height=0 }) {
  return {
    type: 'RESIZE_CANVAS',
    size: {
      width,
      height,
    },
  };
}

export {
  canvasSizeActionCreator,
};
