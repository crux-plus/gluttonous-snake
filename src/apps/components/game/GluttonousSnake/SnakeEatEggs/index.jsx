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
    const {
      immutable: {
        boundary,
      },
    } = this.props;
    this.state = {
      width: boundary.get('width'),
      height: boundary.get('height'),
    };
  }

  /**
   * @method
   */
  render() {
    return (
      <div className="comb">
        <SnakeLayer
          width={this.state.width}
          height={this.state.height}
          actions={this.props.actions}
          immutable={this.props.immutable.snake}
        />
        <EggsLayer
          width={this.state.width}
          height={this.state.height}
          actions={this.props.actions}
          immutable={this.props.immutable.eggs}
       />
        <BackgroundLayer
          width={this.state.width}
          height={this.state.height}
          actions={this.props.actions}
          immutable={this.props.immutable.background}
        />
      </div>
    );
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    const {
      immutable: {
        boundary,
      },
    } = nextProps;
    if (this.props.immutable.boundary.equals(boundary)) {
      this.setState((prevState, props) => {
        const {
          immutable: {
            boundary,
          },
        } = nextProps;
        return {
          width: boundary.get('width'),
          height: boundary.get('height'),
        };
      });
    }
  }

  /**
   * @method
   */
  componentDidMount() {
    this.props.actions.changeGameStatus({ status: Status.UNDERWAY });
  }
}

export default SnakeEatEggs;
