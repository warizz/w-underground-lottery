import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Layout as Uut } from './';

describe('snapshot testing', () => {
  it('should match snapshot when no props', () => {
    const wrapper = shallow(<Uut />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should display placeholder when fetching initial data', () => {
    const wrapper = shallow(<Uut />);
    wrapper.setState({ isFetchingInitialData: true });
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should render content when have children', () => {
    const wrapper = shallow(
      <Uut>
        <div>test</div>
      </Uut>
    );
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});

describe('functional testing', () => {
  test('closeSnackbar', () => {
    const props = {
      setAlert: jest.fn(),
    };
    const wrapper = shallow(<Uut {...props} />);
    wrapper.instance().closeSnackbar();
    expect(props.setAlert).toHaveBeenCalledWith('');
  });

  describe('fetchInitialData', () => {
    test('on success', async () => {
      const mockUser = {};
      const mockCurrentPeriod = {};
      const props = {
        proxy: {
          getCurrentPeriod: async () => mockCurrentPeriod,
          getUser: async () => mockUser,
        },
        setCurrentPeriod: jest.fn(),
        setUser: jest.fn(),
      };
      const wrapper = shallow(<Uut {...props} />);
      await wrapper.instance().fetchInitialData();
      expect(props.setCurrentPeriod).toHaveBeenCalledWith(mockCurrentPeriod);
      expect(props.setUser).toHaveBeenCalledWith(mockUser);
    });

    test('on error', async () => {
      const props = {
        proxy: {
          getCurrentPeriod: async () => Promise.rejct(),
          getUser: async () => Promise.rejct(),
        },
        setCurrentPeriod: jest.fn(),
        setUser: jest.fn(),
      };
      const wrapper = shallow(<Uut {...props} />);
      await wrapper.instance().fetchInitialData();
      expect(props.setCurrentPeriod).toHaveBeenCalledTimes(0);
      expect(props.setUser).toHaveBeenCalledTimes(0);
    });

    test('on 401 error', async () => {
      const mockError = new Error();
      mockError.response = {
        status: 401,
      };
      const props = {
        cookieManager: {
          removeToken: jest.fn(),
        },
        proxy: {
          getCurrentPeriod: async () => Promise.reject(mockError),
          getUser: async () => Promise.reject(mockError),
        },
        router: {
          push: jest.fn(),
        },
        setCurrentPeriod: jest.fn(),
        setUser: jest.fn(),
      };
      const wrapper = shallow(<Uut {...props} />);
      await wrapper.instance().fetchInitialData();
      expect(props.setCurrentPeriod).toHaveBeenCalledTimes(0);
      expect(props.setUser).toHaveBeenCalledTimes(0);
      expect(props.cookieManager.removeToken).toHaveBeenCalled();
      expect(props.router.push).toHaveBeenCalledWith('/log-in');
    });
  });
});
