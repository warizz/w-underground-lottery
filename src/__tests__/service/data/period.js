import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import service from '../../../services/index';

describe('service.data.period', () => {
  // workaround for nock and axios problem
  // see https://github.com/node-nock/nock/issues/699
  const host = process.env.REACT_APP_API_URL;
  axios.defaults.host = host;
  axios.defaults.adapter = httpAdapter;

  describe('getCurrentPeriod', () => {
    it('should success with data', done => {
      nock(host).get('/period').reply(200, {
        bets: [
          {
            createdAt: new Date(2017, 1, 1).getTime(),
          },
        ],
      });

      service.data.getCurrentPeriod().then(res => {
        expect(res.bets).toBeTruthy();
        done();
      });
    });

    // eslint-disable-next-line max-len
    it('should success with data (normalising when bet has no createdAt)', done => {
      nock(host).get('/period').reply(200, {
        bets: [{}],
      });

      service.data.getCurrentPeriod().then(res => {
        expect(res.bets).toBeTruthy();
        done();
      });
    });

    // eslint-disable-next-line max-len
    it('should success with data (normalising when period has no bets)', done => {
      nock(host).get('/period').reply(200, {});

      service.data.getCurrentPeriod().then(res => {
        expect(res.bets).toBeTruthy();
        done();
      });
    });

    it('should success without data', done => {
      nock(host).get('/period').reply(200);

      service.data.getCurrentPeriod().then(res => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });

  describe('getHistory', () => {
    it('should success', done => {
      nock(host).get('/history').reply(200);

      service.data.getHistory().then(done);
    });
  });

  describe('getSummary', () => {
    it('should success', done => {
      nock(host).get('/summary/1234').reply(200);

      service.data.getSummary('1234').then(done);
    });
  });

  describe('openPeriod', () => {
    it('should success', done => {
      nock(host).post('/periods/latest').reply(200);

      service.data.openPeriod(new Date(2017, 1, 1)).then(done);
    });
  });

  describe('updatePeriod', () => {
    it('should success', done => {
      nock(host).patch('/periods/latest').reply(200);

      service.data.updatePeriod({}).then(done);
    });
  });

  describe('updateResult', () => {
    it('should success', done => {
      nock(host).post('/results').reply(200);

      service.data.updateResult({}).then(done);
    });
  });
});
