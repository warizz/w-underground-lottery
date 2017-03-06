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
  firebase
    .database()
    .ref('periods')
    .orderByKey()
    .limitToLast(10)
    .on('value', (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        callback([]);
        return;
      }
      const periods = Object.keys(val)
        .map(key => val[key])
        .map(cleanPeriod)
        .sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        });
      if (typeof callback === 'function') {
        callback(periods);
      }
    });
}

function openPeriod(endDate) {
  const period = {
    createdAt: new Date().getTime(),
    endDate: endDate.getTime(),
    id: new Date().valueOf().toString(),
    open: true,
  };
  firebase
    .database()
    .ref()
    .child('periods')
    .child(period.id)
    .set(period);
}

function closePeriod(period) {
  firebase
    .database()
    .ref()
    .child('periods')
    .child(period.id)
    .update({ open: false });
}

function setPaid(periodId, bets, paid) {
  const updatedBets = {};
  bets.forEach((bet) => {
    updatedBets[`periods/${periodId}/bets/${bet.id}/paid`] = paid;
  });
  firebase
    .database()
    .ref()
    .update(updatedBets);
}

function insertBet(periodId, bet) {
  const updated = Object.assign(bet, {
    id: bet.id || new Date().valueOf().toString(),
    createdAt: new Date().getTime(),
  });
  firebase
    .database()
    .ref()
    .child('periods')
    .child(periodId)
    .child('bets')
    .child(updated.id)
    .set(updated);
}

function deleteBet(periodId, id) {
  firebase
    .database()
    .ref()
    .child('periods')
    .child(periodId)
    .child('bets')
    .child(id)
    .remove();
}

function saveResult(periodId, result) {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child('periods')
      .child(periodId)
      .update({ result });
    resolve(true);
  });
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
