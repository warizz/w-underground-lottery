import service from '../../services/index';

describe('service.calculation', () => {
  const calculator = service.calculation;
  const result = {
    six: '053630',
    two: '61',
    firstThree: '121',
    secondThree: '218',
    thirdThree: '581',
    fourthThree: '881',
  };

  describe('checkReward', () => {
    const checkReward = service.calculation.checkReward;
    const rewardType = {
      TENG: 'เต็ง',
      TODE: 'โต๊ด',
      UPPER: 'บน',
      BELOW: 'ล่าง',
    };

    describe('3 numbers', () => {
      it('should match 3 numbers TENG when call checkReward()', () => {
        const bet = {
          number: '630',
          price1: 10,
          price2: 20,
          price3: 30,
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe(10);
          expect(reward).toBe(500);
          expect(type).toBe(rewardType.TENG);
        };
        checkReward(result, assertFunc)(bet);
      });

      it('should match 3 numbers TODE when call checkReward()', () => {
        const bet = {
          number: '360',
          price2: 20,
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe(20);
          expect(reward).toBe(100);
          expect(type).toBe(rewardType.TODE);
        };
        checkReward(result, assertFunc)(bet);
      });

      it('should match 3 numbers firstThree when call checkReward()', () => {
        const bet = {
          number: '121',
          price3: 30,
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe(30);
          expect(reward).toBe(100);
          expect(type).toBe(rewardType.BELOW);
        };
        checkReward(result, assertFunc)(bet);
      });

      it('should match 3 numbers firstThree when call checkReward()', () => {
        const bet = {
          number: '218',
          price3: '30',
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe('30');
          expect(reward).toBe(100);
          expect(type).toBe(rewardType.BELOW);
        };
        checkReward(result, assertFunc)(bet);
      });

      it('should match 3 numbers firstThree when call checkReward()', () => {
        const bet = {
          number: '581',
          price3: '30',
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe('30');
          expect(reward).toBe(100);
          expect(type).toBe(rewardType.BELOW);
        };
        checkReward(result, assertFunc)(bet);
      });

      it('should match 3 numbers firstThree when call checkReward()', () => {
        const bet = {
          number: '881',
          price3: '30',
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe('30');
          expect(reward).toBe(100);
          expect(type).toBe(rewardType.BELOW);
        };
        checkReward(result, assertFunc)(bet);
      });

      describe('when not matched', () => {
        it('should return null', () => {
          const bet = {
            number: '000',
            price1: 10,
            price2: 20,
            price3: 30,
          };
          const value = checkReward(result, null)(bet);
          expect(value).toBe(null);
        });

        it('should return null', () => {
          const bet = {
            number: '630',
            price2: 20,
            price3: 30,
          };
          const value = checkReward(result, null)(bet);
          expect(value).toBe(null);
        });
      });
    });

    describe('2 numbers', () => {
      it('should match 2 numbers UPPER when call checkReward()', () => {
        const bet = {
          number: '30',
          price1: '10',
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe('10');
          expect(reward).toBe(68);
          expect(type).toBe(rewardType.UPPER);
        };
        checkReward(result, assertFunc)(bet);
      });

      it('should match 2 numbers BELOW when call checkReward()', () => {
        const bet = {
          number: '61',
          price2: '20',
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe('20');
          expect(reward).toBe(68);
          expect(type).toBe(rewardType.BELOW);
        };
        checkReward(result, assertFunc)(bet);
      });

      describe('when not matched', () => {
        it('should return null', () => {
          const bet = {
            number: '77',
            price1: 100,
          };
          const value = checkReward(result, null)(bet);
          expect(value).toBe(null);
        });

        it('should return null', () => {
          const bet = {
            number: '77',
            price1: 100,
            price2: 200,
          };
          const value = checkReward(result, null)(bet);
          expect(value).toBe(null);
        });
      });
    });

    describe('1 number', () => {
      it('should match 1 number UPPER when call checkReward()', () => {
        const bet = {
          number: '6',
          price1: '100',
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe(bet.price1);
          expect(reward).toBe(2);
          expect(type).toBe(rewardType.UPPER);
        };
        checkReward(result, assertFunc)(bet);
      });

      it('should match 1 number BELOW when call checkReward()', () => {
        const bet = {
          number: '6',
          price2: '100',
        };
        const assertFunc = (number, price, reward, type) => {
          expect(number).toBe(bet.number);
          expect(price).toBe(bet.price2);
          expect(reward).toBe(3);
          expect(type).toBe(rewardType.BELOW);
        };
        checkReward(result, assertFunc)(bet);
      });
    });

    describe('Not receiving any reward', () => {
      it('should return null when result is null', () => {
        const bet = {
          number: '7',
          price1: 100,
        };
        const value = checkReward(null, null)(bet);
        expect(value).toBe(null);
      });

      it('should return null when not match any', () => {
        const bet = {
          number: '7',
          price1: 100,
        };
        const value = checkReward(result, null)(bet);
        expect(value).toBe(null);
      });

      it('should return null when not match any', () => {
        const bet = {
          number: '7',
          price1: 100,
          price2: 200,
        };
        const value = checkReward(result, null)(bet);
        expect(value).toBe(null);
      });
    });
  });

  describe('calculateTotal', () => {
    const calculateTotal = service.calculation.calculateTotal;

    it('should return result of 3 numbers when call calculateTotal()', () => {
      const bet = {
        number: '630',
        price1: '10',
        price2: '20',
        price3: '30',
      };

      const value = calculateTotal(result)(bet);
      const ticketPrice = (10 + 20 + 30) * 0.9;
      const rewardType = 10 * 500;
      expect(value).toBe(ticketPrice - rewardType);
    });

    it('should return result of 1 number when call calculateTotal()', () => {
      const bet = {
        number: '6',
        price1: '100',
        price2: '200',
      };

      const value = calculateTotal(result)(bet);
      const ticketPrice = 100 + 200;
      const rewardPrice = 100 * 2;
      const expected = ticketPrice - rewardPrice;
      expect(value).toBe(expected);
    });
  });

  describe('calculateTicketPrice', () => {
    it('no bet', () => {
      const price = calculator.calculateTicketPrice();
      expect(price).toBe(0);
    });

    it('no number', () => {
      const price = calculator.calculateTicketPrice({});
      expect(price).toBe(0);
    });

    it('1: x = 0', () => {
      const bet = {
        number: '1',
      };
      const price = calculator.calculateTicketPrice(bet);
      expect(price).toBe(0);
    });

    it('1: 100 + 200 = 300', () => {
      const bet = {
        number: '1',
        price1: 100,
        price2: 200,
      };
      const price = calculator.calculateTicketPrice(bet);
      expect(price).toBe(300);
    });

    it('12: 10 + 20 = 27', () => {
      const bet = {
        number: '12',
        price1: 10,
        price2: 20,
      };
      const price = calculator.calculateTicketPrice(bet);
      expect(price).toBe(27);
    });

    it('123: 10 + 20 + 30 = 54', () => {
      const bet = {
        number: '12',
        price1: 10,
        price2: 20,
        price3: 30,
      };
      const price = calculator.calculateTicketPrice(bet);
      expect(price).toBe(54);
    });
  });
});
