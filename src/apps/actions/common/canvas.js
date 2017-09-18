function canvasSizeActionCreator({ width=0, height=0 }) {
  return {
    type: 'CANVAS::RESIZE',
    size: {
      width,
      height,
    },
  };
}

function canvasIdActionCreator({ id=0, }) {
  return {
    type: 'CANVAS::REALLOCATE_ID',
    id,
  };
}


export {
  canvasIdActionCreator,
  canvasSizeActionCreator,
};
