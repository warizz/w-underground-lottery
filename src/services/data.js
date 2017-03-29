import axios from 'axios';
import docCookies from 'doc-cookies';

const baseURL = process.env.REACT_APP_API_URL;
const fbAppId = process.env.REACT_APP_FB_APP_ID;
const token = docCookies.getItem(`fbat_${fbAppId}`);

function logIn(accessToken) {
  const data = {
    access_token: accessToken,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}/log_in`, data)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

function getCurrentPeriod(errorHanlder, callback) {
  axios
    .request({
      url: '/period',
      method: 'get',
      baseURL,
      headers: { 'x-access-token': token },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch(errorHanlder);
}

function getHistory() {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: '/history',
        method: 'get',
        baseURL,
        headers: { 'x-access-token': token },
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

function getSummary(periodId) {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `/summary/${periodId}`,
        method: 'get',
        baseURL,
        headers: { 'x-access-token': token },
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

function openPeriod(endedAt) {
  return new Promise((resolve, reject) => {
    const data = { endedAt };
    axios
      .request({
        url: '/period',
        method: 'post',
        baseURL,
        headers: { 'x-access-token': token },
        data,
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

function closePeriod(id) {
  return new Promise((resolve, reject) => {
    const data = { isOpen: false };
    axios
      .request({
        url: `/period/${id}`,
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': token },
        data,
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

function insertBet(bet) {
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
      .catch(error => reject(error));
  });
}

function insertBets(periodId, bets) {
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
      .catch(error => reject(error));
  });
}

function updateBet(bet) {
  return new Promise((resolve, reject) => {
    const data = bet;
    axios
      .request({
        url: `/bet/${bet.id}`,
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': token },
        data,
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

function updateBets(periodId, update) {
  return new Promise((resolve, reject) => {
    const data = update;
    axios
      .request({
        url: `/bets/${periodId}`,
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': token },
        data,
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

function deleteBet(id) {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `/bet/${id}`,
        method: 'delete',
        baseURL,
        headers: { 'x-access-token': token },
      })
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

function updatePeriod(period) {
  return new Promise((resolve, reject) => {
    const data = period;
    axios
      .request({
        url: `/period/${data.id}`,
        method: 'patch',
        baseURL,
        headers: { 'x-access-token': token },
        data,
      })
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
}

export default {
  closePeriod,
  deleteBet,
  getCurrentPeriod,
  getHistory,
  getSummary,
  insertBet,
  insertBets,
  logIn,
  openPeriod,
  updateBet,
  updateBets,
  updatePeriod,
};
