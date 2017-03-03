const SET_USERNAME = 'SET_USERNAME';
const setUsername = username => ({ type: SET_USERNAME, username });

export default {
  type: {
    SET_USERNAME,
  },
  setUsername,
};
