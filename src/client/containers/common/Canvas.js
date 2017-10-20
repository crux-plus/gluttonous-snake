import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import Canvas from 'client/components/common/Canvas';

import canvasActionCreators from 'client/actions/common/canvas';

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

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
