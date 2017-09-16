import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import GluttonousSnake from 'components/game/GluttonousSnake';

function mapStateToProps(state, ownProps = {}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {},
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GluttonousSnake);
