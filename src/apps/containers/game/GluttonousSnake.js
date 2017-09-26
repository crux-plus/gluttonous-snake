import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import GluttonousSnake from 'components/game/GluttonousSnake';

import canvasActionCreators from 'actions/common/canvas';

import statusActionCreators from 'actions/game/gluttonousSnake/status';

function mapStateToProps(state, ownProps = {}) {
  const {
    routers: {
      game: {
        gluttonousSnake: {
          status,
          canvas,
        },
      },
    },
  } = state.toJS();
  const {
    ready,
  } = status.toJS();
  const {
    id,
    width,
    height,
  } = canvas.toJS();
  return {
    status: {
      ready,
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
        ...statusActionCreators,
        ...canvasActionCreators,
      },
      dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnake);
