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
  componentWillMount() {
    const {
      canvas: {
        width: defaultWidth,
        height: defaultHeight,
      },
    } = Canvas.defaultProps;
    const {
      canvas: {
        width,
        height,
      },
    } = this.props;

    if (width === defaultWidth && height === defaultHeight) {
      const {
        innerWidth: width,
        innerHeight: height,
      } = window;
      this.props.actions.canvasSizeActionCreator({ width, height });
    }
  }

  /**
   * @method
   */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /**
   * @method
   */
  render() {
    return (
      <canvas
        id={this.props.canvas.id}
        width={this.props.canvas.width}
        height={this.props.canvas.height}
      >
      </canvas>
    );
  }
}

// Specifies the verification rule for props:
Canvas.propTypes = {
  // An object taking on a particular shape
  canvas: PropTypes.shape({
    id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

// Specifies the default values for props:
Canvas.defaultProps = {
  canvas: {
    id: Canvas.getUniqueId(),
    width: 0,
    height: 0,
  },
};

export default Canvas;
