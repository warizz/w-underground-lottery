import layout from '../actions/layout';

const { type } = layout;

export default function (state = {}, action) {
  switch (action.type) {
    case type.SET_ALERT:
      return { ...state, alert: action.alert };
    case type.SET_PAGE_NAME:
      return { ...state, pageName: action.pageName };
    default:
      return { ...state };
  }
}
