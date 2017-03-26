import axios from 'axios';
import docCookies from 'doc-cookies';

const baseURL = process.env.REACT_APP_API_URL;
const fbAppId = process.env.REACT_APP_FB_ID;

function toArray(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

function cleanBet(bet) {
  const cleaned = Object.assign({}, bet);
  cleaned.createdAt = new Date(bet.createdAt);
  cleaned.price1 = Number(bet.price1);
  cleaned.price2 = Number(bet.price2);
  cleaned.price3 = Number(bet.price3);
  return cleaned;
}

function cleanPeriod(obj) {
  const cleaned = Object.assign({}, obj);
  cleaned.bets = obj.bets ? toArray(obj.bets).map(cleanBet) : [];
  cleaned.createdAt = new Date(obj.createdAt);
  cleaned.endDate = new Date(obj.endDate);
  return cleaned;
}

function getCurrentPeriod(callback) {
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
    });
}

function getPeriods(username, callback) {

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

function insertBet(periodId, bet) {

}

function deleteBet(periodId, id) {

}

function saveResult(periodId, result) {

}

export default {
  closePeriod,
  deleteBet,
  getCurrentPeriod,
  getPeriods,
  insertBet,
  openPeriod,
  saveResult,
  setPaid,
};
