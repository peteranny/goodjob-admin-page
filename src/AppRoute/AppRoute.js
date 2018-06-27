// @flow
import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import App from '../components/app';
import Admin from '../components/Admin';
import GqlExample from '../components/GqlExample';

const AppRoute: () => React.Node = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Admin} />
      <Route exact path="/gql-example" component={GqlExample} />
    </Switch>
  </App>
);

export default AppRoute;
