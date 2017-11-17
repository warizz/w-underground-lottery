import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

(() => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: process.env.REACT_APP_FB_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v2.8',
    });
    window.FB.AppEvents.logPageView();
  };

  ((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
})();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
