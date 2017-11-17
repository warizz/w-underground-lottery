import axios from 'axios';
import docCookies from 'doc-cookies';

const baseURL = process.env.REACT_APP_API_URL;
const fbAppId = process.env.REACT_APP_FB_APP_ID;

function deleteBet(id) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    axios
      .request({
        baseURL,
        headers: { 'x-access-token': token },
        method: 'delete',
        url: `/bet/${id}`,
      })
      .then(() => resolve())
      .catch(reject);
  });
}

function getCurrentPeriod() {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    axios
      .request({
        baseURL,
        headers: { 'x-access-token': token },
        method: 'get',
        url: '/period',
      })
      .then(res => {
        if (!res.data) {
          return resolve();
        }

        const { id, endedAt, isOpen, bets = [], result } = res.data;
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

        return resolve(period);
      })
      .catch(reject);
  });
}

function getHistory() {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    axios
      .request({
        baseURL,
        headers: { 'x-access-token': token },
        method: 'get',
        url: '/history',
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function getSummary(periodId) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    axios
      .request({
        baseURL,
        headers: { 'x-access-token': token },
        method: 'get',
        url: `/summary/${periodId}`,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function getUser() {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return axios
    .request({
      baseURL,
      headers: { 'x-access-token': token },
      method: 'get',
      url: '/me',
    })
    .then(res => res.data);
}

function insertBet(bet) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    const data = bet;
    axios
      .request({
        baseURL,
        data,
        headers: { 'x-access-token': token },
        method: 'post',
        url: '/bet',
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function insertBets(periodId, bets) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    const data = bets;
    axios
      .request({
        baseURL,
        data,
        headers: { 'x-access-token': token },
        method: 'post',
        url: `/bets/${periodId}`,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function logIn(accessToken) {
  return axios
    .request({
      baseURL,
      data: { access_token: accessToken },
      method: 'POST',
      url: '/signin',
    })
    .then(res => res.data);
}

function logOut() {
  return new Promise((resolve, reject) => {
    const accessToken = docCookies.getItem(`fbat_${fbAppId}`);
    axios
      .request({
        baseURL,
        headers: { 'x-access-token': accessToken },
        method: 'patch',
        url: `${baseURL}/log_out`,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function openPeriod(endedAt) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    const data = { endedAt };
    axios
      .request({
        baseURL,
        data,
        headers: { 'x-access-token': token },
        method: 'post',
        url: '/periods/latest',
      })
      .then(resolve)
      .catch(reject);
  });
}

function updateBet(bet) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    const data = {
      price1: bet.price1,
      price2: bet.price2,
      price3: bet.price3,
    };
    axios
      .request({
        baseURL,
        data,
        headers: { 'x-access-token': token },
        method: 'patch',
        url: `/bet/${bet.id}`,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function updateBets(periodId, userId, update) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    const data = {
      query: { createdBy: userId },
      update,
    };
    axios
      .request({
        baseURL,
        data,
        headers: { 'x-access-token': token },
        method: 'patch',
        url: `/bets/${periodId}`,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function updatePeriod(id, update) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    const data = update;
    axios
      .request({
        baseURL,
        data,
        headers: { 'x-access-token': token },
        method: 'patch',
        url: '/periods/latest',
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function updateResult() {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    axios
      .request({
        baseURL,
        headers: { 'x-access-token': token },
        method: 'post',
        url: '/results',
      })
      .then(() => resolve())
      .catch(reject);
  });
}

export default {
  deleteBet,
  getCurrentPeriod,
  getHistory,
  getSummary,
  getUser,
  insertBet,
  insertBets,
  logIn,
  logOut,
  openPeriod,
  updateBet,
  updateBets,
  updatePeriod,
  updateResult,
};
