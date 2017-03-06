import data from '../actions/data';

const { type } = data;

export default function (state = {}, action) {
  switch (action.type) {
    case type.SET_FETCHING:
      return { ...state, fetching: action.fetching };
    case type.SET_PERIOD:
      return { ...state, period: action.period };
    case type.SET_PERIODS:
      return { ...state, periods: action.periods };
    default:
      return { ...state };
  }
}
