import axios from 'axios';
import docCookies from 'doc-cookies';

const baseURL = process.env.REACT_APP_API_URL;
const fbAppId = process.env.REACT_APP_FB_APP_ID;

function deleteBet(id) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `/bet/${id}`,
        method: 'delete',
        baseURL,
        headers: { 'x-access-token': token },
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
        url: '/period',
        method: 'get',
        baseURL,
        headers: { 'x-access-token': token },
      })
      .then((res) => {
        if (!res.data) {
          return resolve();
        }

        const period = res.data;

        if (period.bets) {
          period.bets = period.bets.map((bet) => {
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
        url: '/history',
        method: 'get',
        baseURL,
        headers: { 'x-access-token': token },
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
        url: `/summary/${periodId}`,
        method: 'get',
        baseURL,
        headers: { 'x-access-token': token },
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function getUser() {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: '/me',
        method: 'get',
        baseURL,
        headers: { 'x-access-token': token },
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function insertBet(bet) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
  return new Promise((resolve, reject) => {
    const data = bet;
    axios
      .request({
        url: '/bet',
        method: 'post',
        baseURL,
        headers: { 'x-access-token': token },
        data,
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
        url: `/bets/${periodId}`,
        method: 'post',
        baseURL,
        headers: { 'x-access-token': token },
        data,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function logIn(accessToken) {
  const data = { access_token: accessToken };
  return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/log_in`, data).then(res => resolve(res.data)).catch(reject);
  });
}

function logOut(accessToken) {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `${baseURL}/log_out`,
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': accessToken },
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
        url: '/periods/latest',
        method: 'post',
        baseURL,
        headers: { 'x-access-token': token },
        data,
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
        url: `/bet/${bet.id}`,
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': token },
        data,
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
        url: `/bets/${periodId}`,
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': token },
        data,
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
        url: '/periods/latest',
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': token },
        data,
      })
      .then(res => resolve(res.data))
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
};
