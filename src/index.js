import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import App from './app';
import './vendors/fb-sdk';

window.Perf = Perf;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
