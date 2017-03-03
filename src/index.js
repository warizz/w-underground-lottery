import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Layout from './pages/layout';
import SignInPage from './pages/sign-in';
import BetPage from './pages/bet';
import HistoryPage from './pages/history';
import DashboardPage from './pages/dashboard';
import SummaryPage from './pages/summary';
import ResultPage from './pages/result';
import FaqPage from './pages/faq';
import * as lib from './constants/lib';

window.Perf = Perf;
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/sign-in" component={SignInPage} />
      <Route component={Layout} onEnter={lib.initApplicationState(store)}>
        <IndexRoute component={BetPage} />
        <Route path="/" component={BetPage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/dashboard/summary" component={SummaryPage} />
        <Route path="/dashboard/result" component={ResultPage} />
        <Route path="/faq" component={FaqPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
