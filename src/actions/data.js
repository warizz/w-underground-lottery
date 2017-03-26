const SET_FETCHING = 'SET_FETCHING';
const SET_CURRENT_PERIOD = 'SET_CURRENT_PERIOD';
const setFetching = fetching => ({ type: SET_FETCHING, fetching });
const setCurrentPeriod = currentPeriod => ({ type: SET_CURRENT_PERIOD, currentPeriod });

export default {
  type: {
    SET_FETCHING,
    SET_CURRENT_PERIOD,
  },
  setFetching,
  setCurrentPeriod,
};
