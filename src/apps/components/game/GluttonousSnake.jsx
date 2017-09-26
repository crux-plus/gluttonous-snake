import PropTypes from 'prop-types';

import React from 'react';

import { Dimmer, Loader } from 'semantic-ui-react';

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
    const {
      ready,
    } = this.props;
    this.state = {
      status: {
        ready: !ready,
      },
    };
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      const {
        status: {
          ready,
        },
      } = props;
      return {
        status: {
          ready: !ready,
        },
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <div>
        <Dimmer active={this.state.status.ready}>
          <Loader>Loading...</Loader>
        </Dimmer>
        <GluttonousSnakeCanvas {...this.props} />
        <div></div>
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
