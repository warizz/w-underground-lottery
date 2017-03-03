const SET_FETCHING = 'SET_FETCHING';
const SET_PERIOD = 'SET_PERIOD';
const setFetching = fetching => ({ type: SET_FETCHING, fetching });
const setPeriod = period => ({ type: SET_PERIOD, period });

export default {
  type: {
    SET_FETCHING,
    SET_PERIOD,
  },
  setFetching,
  setPeriod,
};
