import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRoute from 'react-router/lib/IndexRoute';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import docCookies from 'doc-cookies';
import service from './services/index';
import LayoutContainer from './container/layout';
import ConnectedDashboardContainer from './container/dashboard';
import ConnectedHistoryContainer from './container/history';
import ConnectedHomeContainer from './container/home';
import ConnectedSignInContainer from './container/sign-in';
import reducer from './reducers/index';
import lib from './constants/lib';

const store = createStore(reducer);

window.fbAsyncInit = () => {
  window.FB.init({
    appId: process.env.REACT_APP_FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v2.8',
  });
  window.FB.AppEvents.logPageView();
};

const App = () =>
  (<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/log-in" component={props => <ConnectedSignInContainer {...props} service={service} cookieManager={docCookies} />} />
      <Route component={LayoutContainer} onEnter={lib.initApplicationState(store)}>
        <IndexRoute component={props => <ConnectedHomeContainer {...props} service={service} cookieManager={docCookies} />} />
        <Route path="/" component={props => <ConnectedHomeContainer {...props} service={service} cookieManager={docCookies} />} />
        <Route path="/history" component={props => <ConnectedHistoryContainer {...props} service={service} />} />
        <Route path="/dashboard" component={props => <ConnectedDashboardContainer {...props} service={service} />} />
      </Route>
    </Router>
  </Provider>);

export default App;
