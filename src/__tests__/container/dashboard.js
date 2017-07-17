import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index';
import ConnectedDashboardContainer, {
  DashboardContainer,
} from '../../container/dashboard';

it('should render contained component', () => {
  const wrapper = mount(<DashboardContainer />);

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should render connected component', () => {
  const store = createStore(reducer);
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedDashboardContainer />
    </Provider>
  );

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should update state.endDate when call onEndDateChange()', () => {
  const wrapper = mount(<DashboardContainer />);
  const endDate = new Date();

  wrapper.instance().onEndDateChange({ target: { value: endDate } });
  expect(wrapper.state('endDate').getTime()).toBe(endDate.getTime());
});

it('should call spesific functions when call openPeriod()', async () => {
  const setFetchingMock = jest.fn();
  const setCurrentPeriodMock = jest.fn();
  const props = {
    setFetching: setFetchingMock,
    setCurrentPeriod: setCurrentPeriodMock,
  };
  const wrapper = shallow(<DashboardContainer {...props} />);

  await wrapper.instance().openPeriod().then(() => {
    expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
    expect(setFetchingMock).toHaveBeenCalledTimes(2);
  });
});

it('should call spesific functions when call closePeriod()', async () => {
  const setFetchingMock = jest.fn();
  const setCurrentPeriodMock = jest.fn();
  const props = {
    setFetching: setFetchingMock,
    setCurrentPeriod: setCurrentPeriodMock,
  };
  const wrapper = shallow(<DashboardContainer {...props} />);

  await wrapper.instance().closePeriod().then(() => {
    expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
    expect(setFetchingMock).toHaveBeenCalledTimes(2);
  });
});

it('should call spesific functions when call updateResult()', async () => {
  const updateResultMock = async () => jest.fn();
  const props = {
    service: {
      data: {
        updateResult: updateResultMock,
      },
    },
  };
  const wrapper = shallow(<DashboardContainer {...props} />);

  wrapper.instance().updateResult().then(() => {
    expect(updateResultMock).toHaveBeenCalledTimes(1);
  });
});

describe('lifecycle functions', () => {
  // eslint-disable-next-line max-len
  it('should do specific tasks when componentDidMount with no currentPeriod', async () => {
    const setCurrentPeriodMock = jest.fn();
    const setFetchingMock = jest.fn();
    const props = {
      setFetching: setFetchingMock,
      setCurrentPeriod: setCurrentPeriodMock,
    };
    await shallow(<DashboardContainer {...props} />)
      .instance()
      .componentDidMount();
    expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
    expect(setFetchingMock).toHaveBeenCalledTimes(1);
    expect(setFetchingMock).toHaveBeenLastCalledWith(false);
  });

  // eslint-disable-next-line max-len
  it('should do specific tasks when componentDidMount with currentPeriod is present', async () => {
    const summaryMock = {};
    const props = {
      currentPeriod: {
        id: 'id',
      },
      setFetching() {},
      setCurrentPeriod() {},
      service: {
        data: {
          getCurrentPeriod() {},
          openPeriod() {},
          updatePeriod() {},
          getSummary: () => new Promise(resolve => resolve(summaryMock)),
        },
      },
    };
    const wrapper = mount(<DashboardContainer {...props} />);
    await Promise.resolve().then(() => {
      expect(wrapper.update().state('summary')).toBe(summaryMock);
    });
  });

  // eslint-disable-next-line max-len
  it('should do nothing when componentWillReceiveProps with no currentPeriod', async () => {
    await shallow(<DashboardContainer />)
      .instance()
      .componentWillReceiveProps({ currentPeriod: {} });
  });
});

it('should do specified tasks when call setPaid()', async () => {
  const setFetchingMock = jest.fn();
  const setCurrentPeriodMock = jest.fn();
  const props = {
    setFetching: setFetchingMock,
    setCurrentPeriod: setCurrentPeriodMock,
  };
  const wrapper = shallow(<DashboardContainer {...props} />);

  await wrapper.instance().setPaid()().then(() => {
    expect(setFetchingMock).toHaveBeenCalledTimes(2);
  });
});
