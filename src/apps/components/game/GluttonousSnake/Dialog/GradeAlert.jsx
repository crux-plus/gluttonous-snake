import PropTypes from 'prop-types';

import React from 'react';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import Status from '../Status';

/**
 * @public
 * @class
 */
class GradeAlert extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const {
      status,
    } = this.props;
    this.state = {
      open: (status === Status.GRADE),
    };
    this.handleGoBack = this.handleGoBack.bind(this);
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
        open: (status === Status.GRADE),
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <Modal open={this.state.open} basic size='small'>
        <Header icon='trophy' content='Congratulations!!' />
        <Modal.Content>
          <p>Your have eaten {this.props.score} eggs.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleGoBack} color='green' inverted>
            <Icon name='arrow circle right' /> Go Back
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  /**
   * @method
   */
  handleGoBack(event) {
    this.props.actions.changeGameStatus({ status: Status.END });
  }
}

// Specifies the verification rule for props:
GradeAlert.propTypes = {
  score: PropTypes.number,
  status: PropTypes.number,
};

// Specifies the default values for props:
GradeAlert.defaultProps = {
  score: 0,
  status: Status.PENDING,
};

export default GradeAlert;
