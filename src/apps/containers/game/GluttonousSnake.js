import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import GluttonousSnake from 'components/game/GluttonousSnake';

import {
  canvasSizeActionCreator,
  canvasIdActionCreator,
} from 'actions/common/canvas';

function mapStateToProps(state, ownProps = {}) {
  const {
    canvas: {
      id,
      width,
      height,
    },
  } = state;

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
      {
        canvasIdActionCreator,
        canvasSizeActionCreator,
      },
      dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnake);
