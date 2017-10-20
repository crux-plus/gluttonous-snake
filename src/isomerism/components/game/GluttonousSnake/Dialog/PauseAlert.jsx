import PropTypes from 'prop-types';

import React from 'react';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import Status from '../Status';

/**
 * @public
 * @class
 */
class PauseAlert extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const {
      status,
    } = this.props;
    this.state = {
      open: (status === Status.PAUSE),
    };
    this.handleResume = this.handleResume.bind(this);
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
        open: (status === Status.PAUSE),
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <Modal open={this.state.open} basic size='small'>
        <Header icon='pause circle' content='Sorry, Game is paused!!' />
        <Modal.Content>
          <p>The game was forced to stop, would you want resume?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleResume} color='green' inverted>
            <Icon name='play' /> Resume
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  /**
   * @method
   */
  handleResume(event) {
    this.props.actions.changeGameStatus({ status: Status.UNDERWAY });
  }
}

// Specifies the verification rule for props:
PauseAlert.propTypes = {
  status: PropTypes.number,
};

// Specifies the default values for props:
PauseAlert.defaultProps = {
  status: Status.PENDING,
};

export default PauseAlert;
