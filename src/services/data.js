import axios from 'axios';
import docCookies from 'doc-cookies';

const baseURL = process.env.REACT_APP_API_URL;
const fbAppId = process.env.REACT_APP_FB_APP_ID;

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
      .then(res => resolve(res.data))
      .catch(error => reject(error));
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
      .catch(error => reject(error));
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
      .catch(error => reject(error));
  });
}

function openPeriod(endedAt) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
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
  const token = docCookies.getItem(`fbat_${fbAppId}`);
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
      .catch(error => reject(error));
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
      .catch(error => reject(error));
  });
}

function updateBet(bet) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
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
  const token = docCookies.getItem(`fbat_${fbAppId}`);
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
      .catch(error => reject(error));
  });
}

function updatePeriod(period) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
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
