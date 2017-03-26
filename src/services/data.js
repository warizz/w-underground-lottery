import firebase from './firebase';

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

function getPeriods(username, callback) {

}

function openPeriod(endDate) {

}

function closePeriod(period) {

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
  getPeriods,
  insertBet,
  openPeriod,
  saveResult,
  setPaid,
};
