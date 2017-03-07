import user from '../actions/user';

const { type } = user;

export default function (state = {}, action) {
  switch (action.type) {
    case type.SET_PIC:
      return { ...state, pic: action.pic };
    case type.SET_USERNAME:
      return { ...state, username: action.username };
    default:
      return { ...state };
  }
}
