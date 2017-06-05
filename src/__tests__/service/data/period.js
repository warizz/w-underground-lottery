import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import service from '../../../services/index';

describe('service.data.period', () => {
  // workaround for nock and axios problem, see https://github.com/node-nock/nock/issues/699
  const host = process.env.REACT_APP_FB_APP_ID;
  axios.defaults.host = host;
  axios.defaults.adapter = httpAdapter;

  describe('getCurrentPeriod', () => {
    it('should success with data', (done) => {
      nock(process.env.REACT_APP_API_URL).get('/period').reply(200, {
        bets: [
          {
            createdAt: new Date(2017, 1, 1).getTime(),
          },
        ],
      });

      service.data.getCurrentPeriod().then((res) => {
        expect(res.bets).toBeTruthy();
        done();
      });
    });

    it('should success without data', (done) => {
      nock(process.env.REACT_APP_API_URL).get('/period').reply(200);

      service.data.getCurrentPeriod().then((res) => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });

  describe('getHistory', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).get('/history').reply(200);

      service.data.getHistory().then(done);
    });
  });

  describe('getSummary', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).get('/summary/1234').reply(200);

      service.data.getSummary('1234').then(done);
    });
  });

  describe('openPeriod', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).post('/periods/latest').reply(200);

      service.data.openPeriod(new Date(2017, 1, 1)).then(done);
    });
  });

  describe('updatePeriod', () => {
    it('should success', (done) => {
      nock(process.env.REACT_APP_API_URL).patch('/periods/latest').reply(200);

      service.data.updatePeriod({}).then(done);
    });
  });
});