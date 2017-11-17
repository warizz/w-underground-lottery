/* eslint-disable max-len */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index';
import ConnectedContainer, { HistoryContainer } from '../../container/history';

it('should render connected component', () => {
  const store = createStore(reducer);
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedContainer />
    </Provider>
  );

  expect(wrapper.find('div.history').exists()).toBe(true);
});

describe('life cycle methods', () => {
  it('should call componentDidMount correctly', async () => {
    const historyMock = [{}];
    const setPageNameMock = jest.fn();
    const getHistoryMock = jest.fn(async () => historyMock);
    const props = {
      setPageName: setPageNameMock,
      service: {
        data: {
          getHistory: getHistoryMock,
        },
      },
    };
    const wrapper = mount(<HistoryContainer {...props} />);

    expect(setPageNameMock).toHaveBeenCalledTimes(1);
    expect(setPageNameMock).toHaveBeenCalledWith('History');
    expect(getHistoryMock).toHaveBeenCalledTimes(1);
    await wrapper.update();
    expect(wrapper.state('history')).toEqual(historyMock);
  });

  it('should call componentWillReceiveProps correctly', async () => {
    const historyMock = [{}];
    const getHistoryMock = jest.fn(async () => historyMock);
    const props = {
      service: {
        data: {
          getHistory: getHistoryMock,
        },
      },
    };
    const wrapper = mount(<HistoryContainer />);
    wrapper.setProps({ service: props.service });
    await wrapper.update();
    expect(getHistoryMock).toHaveBeenCalledTimes(1);
    expect(wrapper.state('history')).toEqual(historyMock);
  });
});

describe('cloning', () => {
  it('should do nothing when currentPeriod.isOpen === false', async () => {
    const currentPeriodMock = {
      isOpen: false,
    };
    const betsMock = [];
    const setAlertMock = jest.fn();
    const props = {
      setAlert: setAlertMock,
    };

    const wrapper = shallow(<HistoryContainer {...props} />);
    wrapper.instance().clone(currentPeriodMock)(betsMock);
    expect(setAlertMock).toHaveBeenCalledTimes(1);
    expect(setAlertMock).toHaveBeenCalledWith('period is closed');
  });
  it('should not complete when cloning bets have same number as current period\' bets', async () => {
    const setAlertMock = jest.fn();
    const currentPeriodMock = {
      id: '1',
      isOpen: true,
      bets: [
        {
          number: '123',
        },
      ],
    };
    const betsMock = [
      {
        number: '123',
        price1: 10,
        price2: 10,
        price3: 10,
      },
    ];
    const props = {
      setAlert: setAlertMock,
    };

    const wrapper = shallow(<HistoryContainer {...props} />);
    wrapper.instance().clone(currentPeriodMock)(betsMock);
    expect(setAlertMock).toHaveBeenCalledTimes(1);
    expect(setAlertMock).toHaveBeenCalledWith('nothing to clone');
  });
  it('should completed with required props', async () => {
    const currentPeriodMock = {
      id: '1',
      isOpen: true,
      bets: [
        {
          number: '123',
        },
      ],
    };
    const setFetchingMock = jest.fn();
    const setAlertMock = jest.fn();
    const setCurrentPeriodMock = jest.fn();
    const betsMock = [
      {
        number: '123',
        price1: 10,
        price2: 10,
        price3: 10,
      },
      {
        number: '69',
        price1: 10,
        price2: 10,
      },
    ];
    const props = {
      setFetching: setFetchingMock,
      setAlert: setAlertMock,
      setCurrentPeriod: setCurrentPeriodMock,
    };

    const wrapper = shallow(<HistoryContainer {...props} />);
    await wrapper.instance().clone(currentPeriodMock)(betsMock);
    expect(setFetchingMock).toHaveBeenCalledTimes(2);
    expect(setAlertMock).toHaveBeenCalledWith('cloned');
    expect(setAlertMock).toHaveBeenCalledTimes(1);
  });
});
