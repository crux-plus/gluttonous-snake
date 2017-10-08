import React from 'react';

import Status from '../Status';

import EggsLayer from './EggsLayer';

import SnakeLayer from './SnakeLayer';

import BackgroundLayer from './BackgroundLayer';

/**
 * @class
 */
class SnakeEatEggsComp extends React.PureComponent {
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
      <div>
        <SnakeLayer />
        <EggsLayer />
        <BackgroundLayer />
      </div>
    );
  }
}

export default SnakeEatEggsComp;
