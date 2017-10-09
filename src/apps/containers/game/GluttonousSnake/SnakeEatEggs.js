import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import SnakeEatEggs from 'components/game/GluttonousSnake/SnakeEatEggs';

import snakeActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/snake';

import eggsActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/eggs';

import boundaryActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/boundary';

import snakeEatEggsActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/snakeEatEggs.js';

function mapStateToProps(state) {
  const boundary = state.get('boundary');
  const eggs = state.get('eggs');
  const snake = state.get('snake');
  const background = state.get('background');
  return {
    immutable: {
      boundary,
      eggs,
      snake,
      background,
    },
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const actions = bindActionCreators({
    ...snakeActionCreators,
    ...eggsActionCreators,
    ...boundaryActionCreators,
    ...snakeEatEggsActionCreators,
  }, dispatch);
  return {
    actions: Object.assign({}, ownProps.actions, actions),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnakeEatEggs);
