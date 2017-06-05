import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import service from '../../../services/index';

describe('service.data.bet', () => {
  // workaround for nock and axios problem, see https://github.com/node-nock/nock/issues/699
  const host = process.env.REACT_APP_FB_APP_ID;
  axios.defaults.host = host;
  axios.defaults.adapter = httpAdapter;

  describe('insertBet', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).post('/bet').reply(200, {});

      service.data.insertBet({}).then(done);
    });
  });

  describe('insertBets', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).post('/bets/1234').reply(200, {});

      service.data.insertBets('1234', [{}]).then(done);
    });
  });

  describe('updateBet', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).patch('/bet/1234').reply(200, {});

      service.data
        .updateBet({
          id: '1234',
        })
        .then(done);
    });
  });

  describe('updateBets', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).patch('/bets/1234').reply(200, {});

      service.data.updateBets('1234', 'userId', {}).then(done);
    });
  });

  describe('deleteBet', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).delete('/bet/1234').reply(200, {});

      service.data.deleteBet(1234).then(done);
    });
  });
});
