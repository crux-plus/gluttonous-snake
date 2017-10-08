import React from 'react';

import Status from '../Status';

import EggsLayer from './EggsLayer';

import SnakeLayer from './SnakeLayer';

import BackgroundLayer from './BackgroundLayer';

import 'styles/game/gluttonousSnake/snakeEatEggs.css';

/**
 * @class
 */
class SnakeEatEggs extends React.PureComponent {
  /**
   * @method
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  componentWillMount() {
    const {
      width,
      height,
    } = this.props;
    this.props.actions.resizeBoundary({ width, height });
  }

  /**
   * @method
   */
  render() {
    return (
      <div className="comb">
        <SnakeLayer {...this.props} />
        <EggsLayer {...this.props} />
        <BackgroundLayer {...this.props} />
      </div>
    );
  }

  /**
   * @method
   */
  componentDidMount() {
    this.props.changeGameStatus({ status: Status.UNDERWAY });
  }
}

export default SnakeEatEggs;
