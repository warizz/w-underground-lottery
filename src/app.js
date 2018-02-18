import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRoute from 'react-router/lib/IndexRoute';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import docCookies from 'doc-cookies';

import service from './services/index';
import Layout from './components/Layout';
import ConnectedDashboardContainer from './container/dashboard';
import ConnectedHistoryContainer from './container/history';
import ConnectedHomeContainer from './container/home';
import SignInContainer from './container/SignInContainer';
import reducer from './reducers/index';
import CookieManager from './helper/cookie-manager';
import proxy from './proxy';

const store = createStore(reducer);
const cookieManager = new CookieManager(docCookies);

const App = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        component={props => (
          <SignInContainer
            {...props}
            cookieManager={docCookies}
            service={service}
          />
        )}
        path="/log-in"
      />
      <Route
        component={props => (
          <Layout {...props} cookieManager={cookieManager} proxy={proxy} />
        )}>
        <IndexRoute
          component={props => (
            <ConnectedHomeContainer
              {...props}
              cookieManager={docCookies}
              service={service}
            />
          )}
        />
        <Route
          component={props => (
            <ConnectedHomeContainer
              {...props}
              cookieManager={docCookies}
              service={service}
            />
          )}
          path="/"
        />
        <Route
          component={props => (
            <ConnectedHistoryContainer {...props} service={service} />
          )}
          path="/history"
        />
        <Route
          component={props => (
            <ConnectedDashboardContainer {...props} service={service} />
          )}
          path="/dashboard"
        />
      </Route>
    </Router>
  </Provider>
);

export default App;
