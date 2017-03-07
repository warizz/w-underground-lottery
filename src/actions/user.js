const SET_PIC = 'SET_PIC';
const SET_USERNAME = 'SET_USERNAME';
const setPic = pic => ({ type: SET_PIC, pic });
const setUsername = username => ({ type: SET_USERNAME, username });

export default {
  type: {
    SET_PIC,
    SET_USERNAME,
  },
  setUsername,
  setPic,
};
