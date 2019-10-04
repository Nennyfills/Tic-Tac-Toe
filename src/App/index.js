import React from 'react';
import { hot } from 'react-hot-loader/root';
import 'babel-polyfill';

import Routes from './routes';

const App = () => (
  <>
    <Routes />
  </>
);

export default hot(App);
