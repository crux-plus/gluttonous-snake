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

    this.handleAgree = this.handleAgree.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
        <Header icon='frown' content='Sorry, Game over !!' />
        <Modal.Content>
          <p>You're biting yourself, would you want try again?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleAgree} color='green' inverted>
            <Icon name='checkmark' /> Of Course Yes
          </Button>
          <Button onClick={this.handleCancel} color='red' inverted>
            <Icon name='remove' /> No, Thanks
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  /**
   * @method
   */
  handleAgree(event) {
    this.props.actions.resetGame();
  }

  /**
   * @method
   */
  handleCancel(event) {
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
