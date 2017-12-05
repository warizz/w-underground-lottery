import * as config from '../config';

function calculateTicketPrice(bet) {
  if (!bet) {
    return 0;
  }
  if (!bet.number) {
    return 0;
  }

  let total = 0;
  if (bet.price1) {
    total += Number(bet.price1);
  }
  if (bet.price2) {
    total += Number(bet.price2);
  }
  if (bet.price3) {
    total += Number(bet.price3);
  }
  if (bet.number.length > 1) {
    total *= Number(1) - Number(config.discountPercent);
  }

  return total;
}

// tode means match giving numbers any order
const checkTode = (numbers, result) => {
  const arrResult = result.split('');

  numbers.split('').forEach(number => {
    if (arrResult.indexOf(number) !== -1) {
      arrResult.splice(arrResult.indexOf(number), 1);
    }
  });

  return arrResult.length === 0;
};

const checkReward = (result, callback) => bet => {
  const rewardType = {
    BELOW: 'ล่าง',
    TENG: 'เต็ง',
    TODE: 'โต๊ด',
    UPPER: 'บน',
  };

  if (!result || Object.keys(result).length === 0) {
    return null;
  }

  if (bet.number.length === 3) {
    // เต็ง x 500
    if (bet.price1) {
      if (bet.number === result.six.substring(3, 6)) {
        const reward = 500;
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
      const reward = 100;
      if (bet.number === result.firstThree) {
        return callback(bet.number, bet.price3, reward, rewardType.BELOW);
      }
      if (bet.number === result.secondThree) {
        return callback(bet.number, bet.price3, reward, rewardType.BELOW);
      }
      if (bet.number === result.thirdThree) {
        return callback(bet.number, bet.price3, reward, rewardType.BELOW);
      }
      if (bet.number === result.fourthThree) {
        return callback(bet.number, bet.price3, reward, rewardType.BELOW);
      }
    }
  }

  if (bet.number.length === 2) {
    const reward = 68;

    // บน
    if (bet.price1) {
      if (bet.number === result.six.substring(4, 6)) {
        return callback(bet.number, bet.price1, reward, rewardType.UPPER);
      }
    }
    // ล่าง
    if (bet.price2) {
      if (bet.number === result.two) {
        return callback(bet.number, bet.price2, reward, rewardType.BELOW);
      }
    }
  }

  if (bet.number.length === 1) {
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
        return callback(bet.number, bet.price2, reward, rewardType.BELOW);
      }
    }
  }

  return null;
};

const calculateTotal = result => bet => {
  // calculate ticket price
  const ticketPrice = calculateTicketPrice(bet);

  // this callback will return reward price
  const rewardCallback = (number, price, reward) => price * reward;

  // this will return reward price - ticket price
  return ticketPrice - checkReward(result, rewardCallback)(bet);
};

export default {
  calculateTicketPrice,
  calculateTotal,
  checkReward,
};
