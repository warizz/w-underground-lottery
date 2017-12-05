/* eslint-disable max-len */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Uut from './';

describe('lifecycle functions', () => {
  describe('componentDidMount', () => {
    it('should do specific taskss when token is not set', () => {
      const hasItemMock = jest.fn(() => false);
      const pushMock = jest.fn();
      const props = {
        cookieManager: {
          hasItem: hasItemMock,
        },
        router: {
          push: pushMock,
        },
      };
      mount(<Uut {...props} />);
      expect(hasItemMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledTimes(0);
    });
    it('should do specific taskss when token is already have', () => {
      const hasItemMock = jest.fn(() => true);
      const pushMock = jest.fn();
      const props = {
        cookieManager: {
          hasItem: hasItemMock,
        },
        router: {
          push: pushMock,
        },
      };
      mount(<Uut {...props} />);
      expect(hasItemMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
});

describe('internal functions', () => {
  describe('authenFacebook', () => {
    it('should do specific tasks when no authResponse', () => {
      const fbResponseMock = {};
      const fbLogInMock = jest.fn(callback => callback(fbResponseMock));
      window.FB = {
        login: fbLogInMock,
      };
      const wrapper = mount(<Uut />);
      wrapper.instance().authenFacebook();
      wrapper.update();
      expect(fbLogInMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state('alertText')).toBe('Facebook authentication failed');
      expect(wrapper.state('fetching')).toBe(false);
    });

    it('should do specific tasks when FB.login() successed but logIn() failed', async () => {
      const fbResponseMock = { authResponse: { accessToken: 'token' } };
      const fbLogInMock = jest.fn(callback => callback(fbResponseMock));
      window.FB = {
        login: fbLogInMock,
      };
      const wrapper = mount(<Uut />);
      await wrapper.instance().authenFacebook();
      wrapper.update();
      expect(fbLogInMock).toHaveBeenCalledTimes(1);
      expect(wrapper.state('alertText')).toBe('Server error');
      expect(wrapper.state('fetching')).toBe(false);
    });

    it('should do specific tasks when FB.login() and logIn() successed', async () => {
      const setItemMock = jest.fn();
      const pushMock = jest.fn();
      const fbResponseMock = { authResponse: { accessToken: 'token' } };
      const fbLogInMock = jest.fn(callback => callback(fbResponseMock));
      const serverLogInMock = jest.fn(async () => ({
        access_token: fbResponseMock.authResponse.accessToken,
      }));
      const props = {
        cookieManager: {
          setItem: setItemMock,
        },
        router: {
          push: pushMock,
        },
        service: {
          data: {
            logIn: serverLogInMock,
          },
        },
      };
      window.FB = {
        login: fbLogInMock,
      };
      const wrapper = shallow(<Uut {...props} />);
      await wrapper.instance().authenFacebook();
      wrapper.update();
      expect(fbLogInMock).toHaveBeenCalledTimes(1);
      expect(serverLogInMock).toHaveBeenCalledTimes(1);
      expect(setItemMock).toHaveBeenCalledTimes(1);
      expect(setItemMock).toHaveBeenCalledWith(
        `fbat_${process.env.REACT_APP_FB_APP_ID}`,
        fbResponseMock.authResponse.accessToken,
        60 * 60 * 24 * 30
      );
      expect(wrapper.state('fetching')).toBe(false);
    });
  });
});
