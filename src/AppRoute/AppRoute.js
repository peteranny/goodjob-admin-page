// @flow
import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import App from '../components/app';

const AppRoute: () => React.Node = () => (
  <App>
    <Switch>
      <Route exact path="/" component={() => <div>app</div>} />
    </Switch>
  </App>
);

export default AppRoute;
