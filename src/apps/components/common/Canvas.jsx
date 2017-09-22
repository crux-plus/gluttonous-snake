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

    const {
      canvas: {
        id,
        width,
        height,
      },
    } = props;
    this.state = {
      canvas: {
        width,
        height,
        id: Canvas.formateId(id),
      },
    };
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
    return `canvas${id}`;
  }

  /**
   * @method
   */
  setDefaultProps() {
    const {
      canvas: {
        id: defaultId,
        width: defaultWidth,
        height: defaultHeight,
      },
    } = Canvas.defaultProps;
    const {
      canvas: {
        id,
        width,
        height,
      },
    } = this.props;

    if (width === defaultWidth && height === defaultHeight) {
      const {
        innerWidth: width,
        innerHeight: height,
      } = window;
      this.props.actions.transformCanvas({ width, height });
    }

    if (id === defaultId) {
      const id = Canvas.getUniqueId();
      this.props.actions.markCanvas({ id });
    }
  }

  /**
   * @method
   */
  componentWillMount() {
    this.setDefaultProps();
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      const {
        canvas: {
          id,
          width,
          height,
        },
      } = props;

      return {
        canvas: {
          width,
          height,
          id: Canvas.formateId(id),
        }
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <canvas
        id={this.state.canvas.id}
        width={this.state.canvas.width}
        height={this.state.canvas.height}
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
