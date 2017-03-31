import action from '../actions/index';
import service from '../services/index';

function initApplicationState(store) {
  return () => {
    store.dispatch(action.data.setFetching(true));
    Promise
      .all([
        service.data.getUser(),
        service.data.getCurrentPeriod(),
      ])
      .then((values) => {
        const [user, currentPeriod] = values;
        store.dispatch(action.user.setUser(user));
        store.dispatch(action.data.setCurrentPeriod(currentPeriod));
        store.dispatch(action.data.setFetching(false));
      })
      .catch((error) => {
        store.dispatch(action.layout.setAlert(error.response.message));
        store.dispatch(action.data.setFetching(false));
      });
  };
}

export default {
  initApplicationState,
};
