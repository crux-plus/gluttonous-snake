import PropTypes from 'prop-types';

import React from 'react';

import Status from '../Status';

import EndDialog from './EndDialog';

import PauseAlert from './PauseAlert';

/**
 * @public
 * @class
 */
class Dialog extends React.PureComponent {
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
        <EndDialog {...this.props} />
        <PauseAlert {...this.props} />
      </div>
    );
  }
}

// Specifies the verification rule for props:
Dialog.propTypes = {
  status: PropTypes.number,
};

// Specifies the default values for props:
Dialog.defaultProps = {
  status: Status.PENDING,
};

export default Dialog;
