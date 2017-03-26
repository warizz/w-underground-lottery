import data from '../actions/data';

const { type } = data;

export default function (state = {}, action) {
  switch (action.type) {
    case type.SET_FETCHING:
      return { ...state, fetching: action.fetching };
    case type.SET_CURRENT_PERIOD:
      return { ...state, currentPeriod: action.currentPeriod };
    default:
      return { ...state };
  }
}
