const SET_USER = 'SET_USER';
const setUser = user => ({ type: SET_USER, user });

export default {
  type: {
    SET_USER,
  },
  setUser,
};
