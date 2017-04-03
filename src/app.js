import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Layout from './pages/layout';
import SignInPage from './pages/sign-in';
import HistoryPage from './pages/history';
import DashboardPage from './pages/dashboard';
import SummaryPage from './pages/summary';
import ResultPage from './pages/result';
import FaqPage from './pages/faq';
import lib from './constants/lib';
import Page from './pages/index';

const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/log-in" component={SignInPage} />
          <Route component={Layout} onEnter={lib.initApplicationState(store)}>
            <IndexRoute component={Page.Home} />
            <Route path="/" component={Page.Home} />
            <Route path="/history" component={HistoryPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/dashboard/summary" component={SummaryPage} />
            <Route path="/dashboard/result" component={ResultPage} />
            <Route path="/faq" component={FaqPage} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
