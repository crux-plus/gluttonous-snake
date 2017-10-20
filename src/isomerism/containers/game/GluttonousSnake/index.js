import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import GluttonousSnake from 'isomerism/components/game/GluttonousSnake';

import gameActionCreators from 'isomerism/actions/game/gluttonousSnake/game';

function mapStateToProps(state, ownProps = {}) {
  const {
    routers: {
      game: {
        gluttonousSnake: {
          game,
        },
      },
    },
  } = state.toJS();
  const {
    score,
    status,
  } = game.toJS();
  return {
    game: {
      score,
      status,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...gameActionCreators,
      },
      dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnake);
