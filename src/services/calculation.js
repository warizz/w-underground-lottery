import * as config from '../config';

// tode means match giving numbers any order
const checkTode = (numbers, result) => {
  const arrResult = result.split('');
  numbers.split('').forEach((number) => {
    if (arrResult.indexOf(number) !== -1) {
      arrResult.splice(arrResult.indexOf(number), 1);
    }
  });
  return arrResult.length === 0;
};

const checkReward = (result, callback) => (bet) => {
  if (!result) return null;
  const rewardType = {
    TENG: 'เต็ง',
    TODE: 'โต๊ด',
    UPPER: 'บน',
    BELOW: 'ล่าง',
  };
  if (bet.number.toString().length === 3) {
    // เต็ง x 500
    if (bet.price1) {
      const reward = 500;
      if (bet.number === result.six.substring(3, 6)) {
        return callback(bet.number, bet.price1, reward, rewardType.TENG);
      }
    }
    // โต๊ด x 100
    if (bet.price2) {
      if (bet.number !== result.six.substring(3, 6)) {
        const reward = 100;
        if (checkTode(bet.number, result.six.substring(3, 6))) {
          return callback(bet.number, bet.price2, reward, rewardType.TODE);
        }
      }
    }
    // ล่าง x 500
    if (bet.price3) {
      const reward = 500;
      if (bet.number === result.firstThree) {
        return callback(bet.number, bet.price3, reward, rewardType.BELOW);
      }
      if (bet.number === result.secondThree) {
        return callback(bet.number, bet.price3, reward, rewardType.BELOW);
      }
    }
  } else if (bet.number.toString().length === 2) {
    // บน
    const reward = 70;
    if (bet.price1) {
      if (bet.number === result.six.substring(4, 6)) {
        return callback(bet.number, bet.price1, reward, rewardType.UPPER);
      }
    }
    // ล่าง
    if (bet.price2) {
      if (bet.number === result.two) {
        return callback(bet.number, bet.price2, reward, rewardType.UPPER);
      }
    }
  } else if (bet.number.toString().length === 1) {
    // บน
    if (bet.price1) {
      const reward = 2;
      if (result.six.substring(3, 6).includes(bet.number)) {
        return callback(bet.number, bet.price1, reward, rewardType.UPPER);
      }
    }
    // ล่าง
    if (bet.price2) {
      const reward = 3;
      if (result.two.includes(bet.number)) {
        return callback(bet.number, bet.price1, reward, rewardType.BELOW);
      }
    }
  }
  return null;
};

const calculateTotal = result => (bet) => {
  let money = 0;
  if (bet.number.length > 1) {
    money = (Number(1) - Number(config.discountPercent)) * (Number(bet.price1) + Number(bet.price2) + Number(bet.price3));
  } else {
    money = Number(bet.price1) + Number(bet.price2) + Number(bet.price3);
  }
  const rewardCallback = (number, price, reward) => price * reward;
  return money - checkReward(result, rewardCallback)(bet);
};


export default {
  calculateTotal,
  checkReward,
};
