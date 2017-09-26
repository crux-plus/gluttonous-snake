import PropTypes from 'prop-types';

import React from 'react';

import { Dimmer, Loader, } from 'semantic-ui-react';

/**
 * @public
 * @class
 */
class Loading extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const {
      ready,
    } = this.props;
    this.state = {
      ready: !ready,
    };
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      const {
        ready,
      } = props;
      return {
        ready: !ready,
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <Dimmer active={this.state.ready}>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }
}

// Specifies the verification rule for props:
Loading.propTypes = {
  ready: PropTypes.bool,
};

// Specifies the default values for props:
Loading.defaultProps = {
  ready: false,
};

export default Loading;
