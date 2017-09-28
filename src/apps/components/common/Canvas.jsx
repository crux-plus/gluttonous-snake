import PropTypes from 'prop-types';

import React from 'react';

/**
 * @public
 * @class
 */
class Canvas extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    const {
      id,
      width,
      height,
    } = props;
    this.state = {
      width,
      height,
      id: Canvas.fmtId(id),
    };
  }

  /**
   * @public
   * @static
   */
  static fmtId(id) {
    return `canvas${id}`;
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      const {
        id,
        width,
        height,
      } = props;
      return {
        width,
        height,
        id: Canvas.fmtId(id),
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <canvas
        id={this.state.id}
        width={this.state.width}
        height={this.state.height}
      >
      </canvas>
    );
  }

  /**
   * @method
   */
  getContext(contextType='2d', contextAttributes={}) {
    const {
      id,
    } = this.state;
    const el = document.getElementById(id);
    return el.getContext(contextType, contextAttributes);
  }
}

// Specifies the verification rule for props:
Canvas.propTypes = {
  id: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

// Specifies the default values for props:
Canvas.defaultProps = {
  id: 0,
  width: 0,
  height: 0,
};

export default Canvas;
