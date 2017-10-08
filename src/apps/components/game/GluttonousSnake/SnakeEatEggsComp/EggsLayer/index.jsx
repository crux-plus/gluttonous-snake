import React from 'react';

import Canvas from 'components/common/Canvas';

import Eggs from './Eggs';

/**
 * @public
 * @class
 */
class EggsLayer extends Canvas {
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
    const eggs = new Eggs({ context });
    this.eggs = eggs;
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
