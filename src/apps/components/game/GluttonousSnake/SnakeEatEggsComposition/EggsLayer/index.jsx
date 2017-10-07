import React from 'react';

import Canvas from 'components/common/Canvas';

import Eggs from './Eggs';

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
    this.eggs.context = context;
  }
}

export default EggsLayer;
