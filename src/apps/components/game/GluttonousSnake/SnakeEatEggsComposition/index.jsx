import React from 'react';

import Status from '../Status';

import EggsLayer from './EggsLayer';

import SnakeLayer from './SnakeLayer';

import BackgroundLayer from './BackgroundLayer';

/**
 * @class
 */
class SnakeEatEggsComposition extends React.PureComponent {
  /**
   * @method
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  render() {
    return (
      <div class="composition">
        <SnakeLayer />
        <EggsLayer />
        <BackgroundLayer />
      </div>
    );
  }
}

export default SnakeEatEggsComposition;
