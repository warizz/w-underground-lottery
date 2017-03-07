import docCookies from 'doc-cookies';
import actions from '../actions/index';
import services from '../services/index';

function initApplicationState(store) {
  return () => {
    const username = docCookies.getItem('underground-lottery_username');
    const pic = docCookies.getItem('underground-lottery_user-pic');
    store.dispatch(actions.data.setFetching(true));
    store.dispatch(actions.user.setUsername(username));
    store.dispatch(actions.user.setPic(pic));
    services.data.getPeriods(username, (periods) => {
      store.dispatch(actions.data.setFetching(false));
      store.dispatch(actions.data.setPeriods(periods));
    });
  };
}

export default {
  initApplicationState,
};
