const SET_PAGE_NAME = 'SET_PAGE_NAME';
const setPageName = pageName => ({ type: SET_PAGE_NAME, pageName });

export default {
  type: {
    SET_PAGE_NAME,
  },
  setPageName,
};
