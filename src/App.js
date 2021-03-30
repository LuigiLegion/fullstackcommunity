// Imports
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  Navbar,
  Dashboard,
  SignIn,
  SignUp,
  Map,
  ProjectCreate,
  Project,
  PageNotFound,
} from './components';

// Component
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar>Fullstack Community</Navbar>

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/map" component={Map} />
          <Route path="/newproject" component={ProjectCreate} />
          <Route path="/project/:id" component={Project} />
          <Route path="/:wildcard" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

// Exports
export default App;
