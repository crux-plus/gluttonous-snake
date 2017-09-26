import PropTypes from 'prop-types';

import React from 'react';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import Status from './Status';

/**
 * @public
 * @class
 */
class Confirm extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const {
      status,
    } = this.props;
    this.state = {
      open: (status === Status.END),
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
        open: (status === Status.END),
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <Modal open={this.state.open} basic size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

// Specifies the verification rule for props:
Confirm.propTypes = {
  status: PropTypes.number,
};

// Specifies the default values for props:
Confirm.defaultProps = {
  status: Status.PENDING,
};

export default Confirm;
