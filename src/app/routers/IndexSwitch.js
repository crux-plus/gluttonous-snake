import React from 'react';

import { Route, Switch } from 'react-router';

import Home from './Home';

class IndexSwitch extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
    );
  }
}

export default IndexSwitch;
