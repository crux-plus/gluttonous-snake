import React from 'react';

import Canvas from 'isomerism/components/common/Canvas';

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
    const {
      actions,
    } = this.props;
    const context = this.getContext();
    const background = new Background({ context, actions });
    this.background = background;
  }

  /**
   * @method
   */
  componentWillUpdate(nextProps, nextState) {
    const {
      immutable,
    } = nextProps;
    this.background.immutable = immutable;
  }
}

export default BackgroundLayer;
