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
  }

  /**
   * @method
   */
  render() {
    return (
      <div>
        <Dimmer active={true}>
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
  canvas: PropTypes.shape({
    id: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

// Specifies the default values for props:
GluttonousSnake.defaultProps = {
  canvas: {
    id: 0,
    width: 0,
    height: 0,
  },
};

export default GluttonousSnake;
