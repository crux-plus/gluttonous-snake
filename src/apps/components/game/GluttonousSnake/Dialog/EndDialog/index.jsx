import PropTypes from 'prop-types';

import React from 'react';

import { MemoryRouter as Router, Switch } from 'react-router-dom'

import GradeRoute from './GradeRoute';

import TryAgainRoute from './TryAgainRoute';

import Status from '../../Status';

/**
 * @public
 * @class
 */
class EndDialog extends React.PureComponent {
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
      <Router
      >
        <Switch>
          <TryAgainRoute exact path="/" {...this.props} />
          <GradeRoute path="/grade" {...this.props} />
        </Switch>
      </Router>
    );
  }
}

// Specifies the verification rule for props:
EndDialog.propTypes = {
  score: PropTypes.number,
  status: PropTypes.number,
};

// Specifies the default values for props:
EndDialog.defaultProps = {
  score: 0,
  status: Status.PENDING,
};

export default EndDialog;
