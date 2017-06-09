import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRoute from 'react-router/lib/IndexRoute';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import service from './services/index';
import LayoutContainer from './container/layout';
import ConnectedDashboardContainer from './container/dashboard';
import HomePage from './pages/home';
import SignInPage from './pages/sign-in';
import HistoryPage from './pages/history';
import reducer from './reducers/index';
import lib from './constants/lib';

const store = createStore(reducer);

const App = () =>
  (<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/log-in" component={SignInPage} />
      <Route component={LayoutContainer} onEnter={lib.initApplicationState(store)}>
        <IndexRoute component={HomePage} />
        <Route path="/" component={HomePage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/dashboard" component={props => <ConnectedDashboardContainer {...props} service={service} />} />
      </Route>
    </Router>
  </Provider>);

export default App;
