import React from 'react';

import { Route, Switch } from 'react-router';

import Game from 'routes/Game';

class Entry extends React.Component {
  /**
   * @method
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Game} />
      </Switch>
    );
  }
}

export default Entry;
