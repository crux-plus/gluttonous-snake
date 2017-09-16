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
   * @static
   */
  static getInnerWidth() {
    return window.innerWidth;
  }

  /**
   * @static
   */
  static getInnerHeight() {
    return window.innerHeight;
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
  name: PropTypes.string
};

// Specifies the default values for props:
Canvas.defaultProps = {
  canvasHeight: Canvas.getInnerHeight(),
  canvasWidth: Canvas.getInnerWidth(),
  canvasId: Canvas.getUniqueId(),
};

export default Canvas;
