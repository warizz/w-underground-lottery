import axios from 'axios';
import docCookies from 'doc-cookies';

const baseURL = process.env.REACT_APP_API_URL;
const fbAppId = process.env.REACT_APP_FB_APP_ID;

function getCurrentPeriod(errorHanlder, callback) {
  const token = docCookies.getItem(`fbat_${fbAppId}`);
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
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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

function openPeriod(endedAt) {
  return new Promise((resolve, reject) => {
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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

function setPaid(periodId, bets, paid) {

}

function insertBet(bet) {
  return new Promise((resolve, reject) => {
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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

function deleteBet(id) {
  return new Promise((resolve, reject) => {
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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
    const token = docCookies.getItem(`fbat_${fbAppId}`);
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
  insertBet,
  insertBets,
  openPeriod,
  setPaid,
  updateBet,
  updatePeriod,
};
