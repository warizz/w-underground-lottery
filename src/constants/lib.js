import docCookies from 'doc-cookies';
import actions from '../actions/index';
import services from '../services/index';

function initApplicationState(store) {
  return () => {
    const username = docCookies.getItem(`fbu_${process.env.REACT_APP_FB_ID}`);
    const pic = docCookies.getItem(`fbp_${process.env.REACT_APP_FB_ID}`);
    store.dispatch(actions.user.setUsername(username));
    store.dispatch(actions.user.setPic(pic));

    store.dispatch(actions.data.setFetching(true));
    services.data.getCurrentPeriod((currentPeriod) => {
      store.dispatch(actions.data.setCurrentPeriod(currentPeriod));
      store.dispatch(actions.data.setFetching(false));
    });
  };
}

export default {
  initApplicationState,
};
