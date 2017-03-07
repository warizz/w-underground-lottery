const SET_FETCHING = 'SET_FETCHING';
const SET_PERIODS = 'SET_PERIODs';
const setFetching = fetching => ({ type: SET_FETCHING, fetching });
const setPeriods = periods => ({ type: SET_PERIODS, periods });

export default {
  type: {
    SET_FETCHING,
    SET_PERIODS,
  },
  setFetching,
  setPeriods,
};
