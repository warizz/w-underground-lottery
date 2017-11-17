import user from '../actions/user';

const { type } = user;

export default function(state = {}, action) {
  switch (action.type) {
    case type.SET_USER:
      return { ...state, user: action.user };
    default:
      return { ...state };
  }
}
