import Immutable  from 'seamless-immutable';

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
    return (new Date()).getTime();
  }

  /**
   * @public
   * @static
   */
  static formateId(id) {
    return `canvas@${id}`;
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

    const id = Canvas.getUniqueId();
    this.props.actions.canvasIdActionCreator({ id });
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
        id={Canvas.formateId(this.props.canvas.id)}
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
    id: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

// Specifies the default values for props:
Canvas.defaultProps = {
  canvas: {
    id: 0,
    width: 0,
    height: 0,
  },
};

export default Canvas;
