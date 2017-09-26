import PropTypes from 'prop-types';

import React from 'react';

import Loading from './Loading';

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
  status: PropTypes.shape({
    ready: PropTypes.bool,
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
  status: {
    ready: false,
  },
  canvas: {
    id: 0,
    width: 0,
    height: 0,
  },
};

export default GluttonousSnake;
