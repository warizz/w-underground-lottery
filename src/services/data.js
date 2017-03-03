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

function getLatestPeriod(callback) {
  firebase
    .database()
    .ref('periods')
    .orderByKey()
    .limitToLast(1)
    .on('value', (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        return;
      }
      const periods = Object.keys(val)
        .map(key => val[key])
        .map(cleanPeriod);
      if (typeof callback === 'function') {
        callback(periods[0]);
      }
    });
}

function update(period) {
  const cleaned = {
    createdAt: period.createdAt.getTime(),
    endDate: period.endDate.getTime(),
  };
  firebase
    .database()
    .ref()
    .child('periods')
    .child(period.id)
    .update(Object.assign(period, cleaned));
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
  firebase
    .database()
    .ref()
    .child('periods')
    .child(periodId)
    .child('bets')
    .child(bet.id)
    .set(bet);
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

function openPeriod(endDate) {
  const id = new Date().valueOf().toString();
  const period = {
    createdAt: new Date(),
    endDate,
    id,
    open: true,
  };
  update(period);
}

export default {
  closePeriod,
  deleteBet,
  getLatestPeriod,
  insertBet,
  openPeriod,
  setPaid,
  update,
};
