import action from '../actions/index';
import proxy from '../proxy';

function initApplicationState(store, cookieManager) {
  return async (nextState, replace, callback) => {
    store.dispatch(action.data.setFetching(true));

    try {
      const values = await Promise.all([
        proxy.getUser(),
        proxy.getCurrentPeriod(),
      ]);

      const [user, currentPeriod] = values;

      store.dispatch(action.user.setUser(user));
      store.dispatch(action.data.setCurrentPeriod(currentPeriod));
      store.dispatch(action.data.setFetching(false));

      callback();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          cookieManager.removeToken();
          replace('/log-in');
        }
      }
    } finally {
      store.dispatch(action.data.setFetching(false));
      callback();
    }
  };
}

export default {
  initApplicationState,
};
