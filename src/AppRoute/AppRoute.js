// @flow
import * as React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import App from '../components/app';
import WorkExperience from '../components/Admin/WorkExperience';
import TimeAndSalary from '../components/Admin/TimeAndSalary';
import Interview from '../components/Admin/Interview';
import GqlExample from '../components/GqlExample';

const AppRoute: () => React.Node = () => (
  <App>
    <Switch>
      <Route exact path="/time-and-salary" component={TimeAndSalary} />
      <Route exact path="/work-experience" component={WorkExperience} />
      <Route exact path="/interview" component={Interview} />
      <Route exact path="/gql-example" component={GqlExample} />
      <Redirect to="/time-and-salary" />
    </Switch>
  </App>
);

export default AppRoute;
