import React from 'react';

import Canvas from 'components/common/Canvas';

/**
 * @class
 */
class GluttonousSnake extends Canvas {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      innerWidth: width,
      innerHeight: height,
    } = window;

    this.props.actions.canvasSizeActionCreator({ width, height });
  }
}

export default GluttonousSnake;
