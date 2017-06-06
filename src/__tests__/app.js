import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import App from '../app';

it('should render with no error', () => {
  const host = process.env.REACT_APP_API_URL;
  axios.defaults.host = host;
  axios.defaults.adapter = httpAdapter;

  nock(host).get('/me').reply(200, {});
  nock(host).get('/period').reply(200, {});

  mount(<App />);
});
