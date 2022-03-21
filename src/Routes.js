// Imports
import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import {
  SignIn,
  SignUp,
  Map,
  Project,
  ProjectCreate,
  Dashboard,
  PageNotFound,
} from './components';

// Component
const Routes = () => {
  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/map" component={Map} />
      <Route path="/projects/:id" component={Project} />
      <Route path="/projects" component={ProjectCreate} />
      <Route exact path="/" component={Dashboard} />
      <Route path="/:wildcard" component={PageNotFound} />
    </Switch>
  );
};

// Exports
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
