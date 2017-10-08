import React from 'react';

import Canvas from 'components/common/Canvas';

import Background from './Background';

/**
 * @public
 * @class
 */
class BackgroundLayer extends Canvas {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  componentDidMount() {
    const context = this.getContext();
    const background = new Background({ context });
    this.background = background;
  }

  /**
   * @method
   */
  componentWillUpdate(nextProps, nextState) {
    const context = this.getContext();
    this.background.context = context;
  }
}

export default BackgroundLayer;
