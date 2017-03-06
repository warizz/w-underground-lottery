import axios from 'axios';
import docCookies from 'doc-cookies';
import * as config from '../config';
import actions from '../actions/index';
import services from '../services/index';

export function initApplicationState(store) {
  return () => {
    store.dispatch(actions.data.setFetching(true));
    const username = docCookies.getItem('underground-lottery_username');
    store.dispatch(actions.user.setUsername(username));
    services.data.getPeriods(username, (periods) => {
      store.dispatch(actions.data.setFetching(false));
      store.dispatch(actions.data.setPeriods(periods));
    });
  };
}
export function getLatestPeriod(username, callback) {
  axios
    .get(`${config.periodUrl}?username=${username}`)
    .then((res) => {
      if (res.status !== 200) {
        return;
      }
      const period = {
        bets: res.data.bets,
        endDate: new Date(res.data.endDate),
        id: res.data._id,
        open: res.data.open,
        result: res.data.result,
      };
      callback(period);
    });
}
export function postPeriod(period, callback) {
  axios
    .post(config.periodUrl, period)
    .then((res) => {
      const newPeriod = Object.assign({}, period);
      newPeriod.endDate = new Date(res.data.endDate);
      newPeriod.id = res.data._id;
      newPeriod.open = res.data.open;
      newPeriod.result = res.data.result;
      newPeriod.bets = res.data.bets || [];
      callback(newPeriod);
    });
}

export function getHistory(username, callback) {
  axios
    .get(`${config.historyUrl}?username=${username}`)
    .then((res) => {
      callback(res.data);
    });
}
export function getSummary(callback) {
  axios
    .get(config.summaryUrl)
    .then((res) => {
      callback(res.data);
    });
}
export function postSummary({ username, period, paid }, callback) {
  axios
    .post(`${config.summaryUrl}?username=${username}&period=${period}`, { paid })
    .then(() => {
      getSummary(callback);
    });
}
