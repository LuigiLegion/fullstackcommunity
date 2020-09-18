// Imports
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Map from './components/map/Map';
import ProjectCreate from './components/projects/ProjectCreate';
import Project from './components/projects/Project';
import PageNotFound from './components/404/PageNotFound';

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
