// Runtime type checking for React props and similar objects
import PropTypes from 'prop-types';

// A declarative, efficient, and flexible JavaScript library
// for building user interfaces.
import React from 'react';

// The document head manager for React.
import { Helmet } from 'react-helmet';

import SEOLayout from 'server/components/common/SEOLayout';

import GameRoute from 'isomerism/routes/Game';

class Game extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  render() {
    return (
      <SEOLayout
        {...this.props}
      >
        <GameRoute/>
      </SEOLayout>
    );
  }
}

// Specifies the verification rule for props:
Game.propTypes = {
};

// Specifies the default values for props:
Game.defaultProps = {
};

export default Game;
