import PropTypes from 'prop-types';

import React from 'react';

import { Link, Route } from 'react-router-dom';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import Status from '../../Status';

/**
 * @public
 * @class
 */
class GradeRoute extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    const {
      status,
      score,
    } = this.props;
    this.state ={
      score,
      open: (status === Status.END),
    };
  }

  /**
   * @method
   */
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      const {
        score,
        status,
      } = props;
      return {
        score,
        open: (status === Status.END),
      };
    });
  }

  /**
   * @method
   */
  render() {
    return (
      <Route path={this.props.path} render={()=> (
        <Modal open={this.state.open} basic size='small'>
          <Header icon='trophy' content='Congratulations!!' />
          <Modal.Content>
            <p>Your have eaten {this.state.score} eggs.</p>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/">
              <Button color='green' inverted>
                <Icon name='arrow circle right' /> Go Back
              </Button>
            </Link>
          </Modal.Actions>
        </Modal>
      )}/>
    );
  }
}

// Specifies the verification rule for props:
GradeRoute.propTypes = {
  score: PropTypes.number,
  status: PropTypes.number,
};

// Specifies the default values for props:
GradeRoute.defaultProps = {
  score: 0,
  status: Status.PENDING,
};

export default GradeRoute;
