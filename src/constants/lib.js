import docCookies from 'doc-cookies';
import actions from '../actions/index';
import services from '../services/index';

function initApplicationState(store) {
  return () => {
    const username = docCookies.getItem(`fbu_${process.env.REACT_APP_FB_APP_ID}`);
    const pic = docCookies.getItem(`fbp_${process.env.REACT_APP_FB_APP_ID}`);
    store.dispatch(actions.user.setUsername(username));
    store.dispatch(actions.user.setPic(pic));

    store.dispatch(actions.data.setFetching(true));
    services.data
      .getCurrentPeriod()
      .then((res) => {
        store.dispatch(actions.data.setCurrentPeriod(res));
        store.dispatch(actions.data.setFetching(false));
      })
      .catch((error) => {
        if (error.response.status === 401) window.location.href = '/sign-in';
      });
  };
}

export default {
  initApplicationState,
};
