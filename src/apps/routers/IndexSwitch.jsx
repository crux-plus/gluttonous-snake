import React from 'react';

import { Route, Switch } from 'react-router';

import Game from 'routers/Game';

class IndexSwitch extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Game} />
      </Switch>
    );
  }
}

export default IndexSwitch;
