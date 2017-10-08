import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import SnakeEatEggs from 'components/game/GluttonousSnake/SnakeEatEggs';

import snakeActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/snake';

import eggsActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/eggs';

import boundaryActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/boundary';

import snakeEatEggsActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/snakeEatEggs.js';

function mapStateToProps(state) {
  const {
    eggs,
    snake,
  } = state.toJS();
  return {
    eggs,
    snake,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    ...ownProps.actions,
    actions: bindActionCreators({
        ...snakeActionCreators,
        ...eggsActionCreators,
        ...boundaryActionCreators,
        ...snakeEatEggsActionCreators,
      }, dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnakeEatEggs);
