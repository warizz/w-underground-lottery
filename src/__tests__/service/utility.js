import service from '../../services/index';

describe('service.utility', () => {
  describe('getRandomNumber', () => {
    it('should generate random numbers when call getRandomNumber(1, 3)', () => {
      const value = service.utility.getRandomNumber(1, 3);
      expect(value).toMatch(/^\d*$/);
    });
  });

  describe('validateNumber', () => {
    it('should return "true" when call validateNumber("123456")', () => {
      const value = service.utility.validateNumber('123456');
      expect(value).toBe(true);
    });

    it('should return "false" when call validateNumber("12ab56")', () => {
      const value = service.utility.validateNumber('12ab56');
      expect(value).toBe(false);
    });
  });
});
