// @flow
import axios from 'axios';
import docCookies from 'doc-cookies';

const baseURL: string = process.env.REACT_APP_API_URL || '';
const fbAppId: string = process.env.REACT_APP_FB_APP_ID || '';

const proxy = {
  async getCurrentPeriod() {
    const token = docCookies.getItem(`fbat_${fbAppId}`);
    const responseData = await axios
      .request({
        baseURL,
        headers: { 'x-access-token': token },
        method: 'get',
        url: '/period',
      })
      .then(response => response.data);

    const { id, endedAt, isOpen, bets = [], result } = responseData;
    const period = {
      bets,
      endedAt: new Date(endedAt),
      id,
      isOpen,
      result,
    };

    if (bets.length > 0) {
      period.bets = bets.map(bet => {
        const updated = Object.assign({}, bet);
        if (bet.createdAt) {
          updated.createdAt = new Date(bet.createdAt);
        }
        return updated;
      });
    }

    return period;
  },
  async getUser() {
    const token = docCookies.getItem(`fbat_${fbAppId}`);
    return axios
      .request({
        baseURL,
        headers: { 'x-access-token': token },
        method: 'get',
        url: '/me',
      })
      .then(res => res.data);
  },
};

export default proxy;
