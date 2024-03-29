import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
