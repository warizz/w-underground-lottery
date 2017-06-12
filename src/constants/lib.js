import action from '../actions/index';
import service from '../services/index';

function initApplicationState(store, cookieManager) {
  return (nextState, replace, callback) => {
    store.dispatch(action.data.setFetching(true));
    Promise.all([service.data.getUser(), service.data.getCurrentPeriod()])
      .then((values) => {
        const [user, currentPeriod] = values;
        store.dispatch(action.user.setUser(user));
        store.dispatch(action.data.setCurrentPeriod(currentPeriod));
        store.dispatch(action.data.setFetching(false));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            cookieManager.removeToken();
            replace('/log-in');
          }
        }
        store.dispatch(action.data.setFetching(false));
        callback();
      });
  };
}

export default {
  initApplicationState,
};
