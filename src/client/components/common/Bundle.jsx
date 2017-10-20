import PropTypes from 'prop-types';

import React from 'react';

/**
 * @public
 * @class
 */
class Bundle extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  componentWillMount() {
    this.load(this.props)
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  /**
   * @method
   */
  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  /**
   * @method
   */
  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

// Specifies the verification rule for props:
Bundle.propTypes = {
  load: PropTypes.func,
};

// Specifies the default values for props:
Bundle.defaultProps = {
  load: null,
};

export default Bundle;
