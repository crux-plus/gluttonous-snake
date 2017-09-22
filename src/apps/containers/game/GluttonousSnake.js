import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import GluttonousSnake from 'components/game/GluttonousSnake';

import {
  transformCanvas,
  markCanvas,
} from 'actions/common/canvas';

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
  } = canvas.getJS();
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
        transformCanvas,
        markCanvas,
      },
      dispatch,
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnake);
