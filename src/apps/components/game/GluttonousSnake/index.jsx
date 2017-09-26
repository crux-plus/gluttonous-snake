import PropTypes from 'prop-types';

import React from 'react';

import Loading from './Loading';

import Confirm from './Confirm';

import Status from './Status';

import GluttonousSnakeCanvas from './GluttonousSnakeCanvas';

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
        <Confirm />
        <Loading
          {...this.props.game}
          actions={this.props.actions}
        />
        <GluttonousSnakeCanvas
          {...this.props.canvas}
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
  // An object taking on a particular shape
  canvas: PropTypes.shape({
    id: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

// Specifies the default values for props:
GluttonousSnake.defaultProps = {
  game: {
    status: Status.PENDING,
  },
  canvas: {
    id: 0,
    width: 0,
    height: 0,
  },
};

export default GluttonousSnake;
