import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import SnakeEatEggsComposition from 'components/game/GluttonousSnake/';

import canvasActionCreators from 'actions/common/canvas';

import gameActionCreators from 'actions/game/gluttonousSnake/game';

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
    actions: bindActionCreators(
      {
        ...gameActionCreators,
        ...canvasActionCreators,
      },
      dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnake);
