import PropTypes from 'prop-types';

import React from 'react';

import Loading from './Loading';

import Dialog from './Dialog';

import Status from './Status';

import SnakeEatEggs from 'isomerism/providers/game/gluttonousSnake/SnakeEatEggs';

/**
 * @public
 * @class
 */
class GluttonousSnake extends React.PureComponent {
  /**
   * @constructor
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
        <Loading
          {...this.props.game}
          actions={this.props.actions}
        />
        <Dialog
          {...this.props.game}
          actions={this.props.actions}
        />
        <SnakeEatEggs
          status={this.props.game.status}
          actions={this.props.actions}
        />
      </div>
    );
  }
}

// Specifies the verification rule for props:
GluttonousSnake.propTypes = {
  // An object taking on a particular shape
  game: PropTypes.shape({
    status: PropTypes.number,
  }),
};

// Specifies the default values for props:
GluttonousSnake.defaultProps = {
  game: {
    status: Status.PENDING,
  },
};

export default GluttonousSnake;
