import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import SnakeEatEggsComposition from 'components/game/SnakeEatEggsComposition';

import snakeActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/snake';

import eggsActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/eggs';

import boundaryActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/boundary';

import snakeEatEggsActionCreators from 'actions/game/gluttonousSnake/snakeEatEggs/snakeEatEggs.js';

function mapStateToProps(state, ownProps = {}) {
  const {
    routers: {
      game: {
        gluttonousSnake: {
          game,
          canvas,
        },
      },
    },
  } = state.toJS();
  const {
    score,
    status,
  } = game.toJS();
  const {
    id,
    width,
    height,
  } = canvas.toJS();
  return {
    game: {
      score,
      status,
    },
    canvas: {
      id,
      width,
      height,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
        ...snakeActionCreators,
        ...eggsActionCreators,
        ...boundaryActionCreators,
        ...snakeEatEggsActionCreators,
      }, dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnakeEatEggsComposition);
