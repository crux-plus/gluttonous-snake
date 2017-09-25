import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import GluttonousSnakeCanvas from 'components/game/GluttonousSnakeCanvas';

import canvasActionCreators from 'actions/common/canvas';

function mapStateToProps(state, ownProps = {}) {
  const {
    game: {
      canvas,
    },
  } = state;
  const {
    id,
    width,
    height,
  } = canvas.toJS();
  return {
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
      {...canvasActionCreators},
      dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnakeCanvas);
