import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { canvasSizeActionCreator } from 'actions/common/canvas';

import GluttonousSnake from 'components/game/GluttonousSnake';

function mapStateToProps(state, ownProps = {}) {
  const {
    canvas: {
      size: {
        width,
        height,
      },
    },
  } = state;

  return {
    canvas: {
      width,
      height,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { canvasSizeActionCreator },
      dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnake);
