const cookie = {
  name: {
    token: `fbat_${process.env.REACT_APP_FB_APP_ID}`,
  },
};

export default class CookieManager {
  constructor(docCookies) {
    this.docCookies = docCookies;
  }
  removeToken() {
    this.docCookies.removeItem(cookie.name.token);
  }
}
