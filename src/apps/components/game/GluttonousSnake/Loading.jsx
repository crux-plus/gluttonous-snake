import PropTypes from 'prop-types';

import React from 'react';

import { Dimmer, Loader, } from 'semantic-ui-react';

import Status from './Status';

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
      status,
    } = this.props;
    this.state = {
      active: (status === Status.PENDING),
    };
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      const {
        status,
      } = props;
      return {
        active: (status === Status.PENDING),
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <Dimmer active={this.state.active}>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }
}

// Specifies the verification rule for props:
Loading.propTypes = {
  status: PropTypes.number,
};

// Specifies the default values for props:
Loading.defaultProps = {
  status: Status.PENDING,
};

export default Loading;
