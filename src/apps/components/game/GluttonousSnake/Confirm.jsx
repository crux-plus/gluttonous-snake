import PropTypes from 'prop-types';

import React from 'react';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

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
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
  }

  /**
   * @method
   */
  render() {
    return (
      <Modal open={true} basic size='small'>
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
  status: PropTypes.bool,
};

// Specifies the default values for props:
Confirm.defaultProps = {
  status: false,
};

export default Confirm;
