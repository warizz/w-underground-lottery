const SET_FETCHING = 'SET_FETCHING';
const SET_PERIOD = 'SET_PERIOD';
const SET_PERIODS = 'SET_PERIODs';
const setFetching = fetching => ({ type: SET_FETCHING, fetching });
const setPeriod = period => ({ type: SET_PERIOD, period });
const setPeriods = periods => ({ type: SET_PERIODS, periods });

export default {
  type: {
    SET_FETCHING,
    SET_PERIOD,
    SET_PERIODS,
  },
  setFetching,
  setPeriod,
  setPeriods,
};
