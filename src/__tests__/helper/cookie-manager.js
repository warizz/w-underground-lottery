import CookieManager from '../../helper/cookie-manager';

const docCookiesMock = {
  removeItem() {},
};
const cookieManager = new CookieManager(docCookiesMock);

it('should success when call removeToken()', () => {
  cookieManager.removeToken();
});
