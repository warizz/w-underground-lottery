const SET_ALERT = 'SET_ALERT';
const SET_PAGE_NAME = 'SET_PAGE_NAME';
const setAlert = alert => ({ type: SET_ALERT, alert });
const setPageName = pageName => ({ type: SET_PAGE_NAME, pageName });

export default {
  type: {
    SET_ALERT,
    SET_PAGE_NAME,
  },
  setAlert,
  setPageName,
};
