import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import service from '../../../services/index';

describe('service.data.user', () => {
  // workaround for nock and axios problem, see https://github.com/node-nock/nock/issues/699
  const host = process.env.REACT_APP_FB_APP_ID;
  axios.defaults.host = host;
  axios.defaults.adapter = httpAdapter;

  describe('logIn', () => {
    it('should return data when get status:200 from api', (done) => {
      nock(process.env.REACT_APP_API_URL).post('/log_in').reply(200, {});

      service.data.logIn('access_token').then((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should catch error when get status other than 200 from api', (done) => {
      nock(process.env.REACT_APP_API_URL).post('/log_in').reply(401, {});

      service.data.logIn('access_token').catch((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });
  });

  describe('getUser', () => {
    it('should return data when get status:200 from api', (done) => {
      nock(process.env.REACT_APP_API_URL).get('/me').reply(200, {});

      service.data.getUser().then((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should catch error when get status other than 200 from api', (done) => {
      nock(process.env.REACT_APP_API_URL).get('/me').reply(401, {});

      service.data.getUser().catch((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });
  });

  describe('logOut', () => {
    it('should return data when get status:200 from api', (done) => {
      nock(process.env.REACT_APP_API_URL).patch('/log_out').reply(200, {});

      service.data.logOut('access_token').then((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should catch error when get status other than 200 from api', (done) => {
      nock(process.env.REACT_APP_API_URL).patch('/log_out').reply(401, {});

      service.data.logOut('access_token').catch((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });
  });
});
