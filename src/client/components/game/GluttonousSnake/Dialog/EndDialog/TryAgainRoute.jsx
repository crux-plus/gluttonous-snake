import PropTypes from 'prop-types';

import React from 'react';

import { Link, Route } from 'react-router-dom';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import Status from '../../Status';

/**
 * @public
 * @class
 */
class TryAgainRoute extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const {
      status,
    } = this.props;
    this.state ={
      open: (status === Status.END),
    };

    this.handleTryAgain = this.handleTryAgain.bind(this);
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
      <Route exact path={this.props.path} render={()=> (
        <Modal open={this.state.open} basic size='small'>
          <Header icon='frown' content='Sorry, Game over !!' />
          <Modal.Content>
            <p>You're biting yourself, would you want try again?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleTryAgain} color='green' inverted>
              <Icon name='checkmark' /> Of Course Yes
            </Button>
            <Link to="/grade">
              <Button color='red' inverted>
                  <Icon name='remove' /> No, Thanks
              </Button>
            </Link>
          </Modal.Actions>
        </Modal>
      )}/>
    );
  }

  /**
   * @method
   */
  handleTryAgain(event) {
    this.props.actions.resetGame();
  }
}

// Specifies the verification rule for props:
TryAgainRoute.propTypes = {
  status: PropTypes.number,
};

// Specifies the default values for props:
TryAgainRoute.defaultProps = {
  status: Status.PENDING,
};

export default TryAgainRoute;
