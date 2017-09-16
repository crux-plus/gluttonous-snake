import PropTypes from 'prop-types';

import React from 'react';

/**
 * @public
 * @class
 */
class Canvas extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @public
   * @static
   */
  static getUniqueId() {
    const timestamp = (new Date()).getTime();
    const uniqueId = `canvas@${timestamp}`;

    return uniqueId;
  }

  /**
   * @method
   */
  render() {
    return (
      <canvas
        id={this.props.canvasId}
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
      >
      </canvas>
    );
  }
}

// Specifies the verification rule for props:
Canvas.propTypes = {
  canvasId: PropTypes.string,
  canvasHeight: PropTypes.number,
  canvasWidth: PropTypes.number,
};

// Specifies the default values for props:
Canvas.defaultProps = {
  canvasId: Canvas.getUniqueId(),
  canvasWidth: 300,
  canvasHeight: 150,
};

export default Canvas;
