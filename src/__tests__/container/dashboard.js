import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index';
import ConnectedDashboardContainer, { DashboardContainer } from '../../container/dashboard';

it('should render contained component', () => {
  const props = {
    service: {
      data: {
        getCurrentPeriod: () => new Promise(resolve => resolve()),
        openPeriod() {},
        updatePeriod() {},
        updateBets() {},
        getSummary() {},
      },
    },
  };
  const wrapper = mount(<DashboardContainer {...props} />);

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should render connected component', () => {
  const props = {
    service: {
      data: {
        getCurrentPeriod: () => new Promise(resolve => resolve()),
        openPeriod() {},
        updatePeriod() {},
        updateBets() {},
        getSummary() {},
      },
    },
  };
  const store = createStore(reducer);
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedDashboardContainer {...props} />
    </Provider>,
  );

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should update state.endDate when call onEndDateChange()', () => {
  const props = {
    service: {
      data: {
        getCurrentPeriod: () => new Promise(resolve => resolve()),
        openPeriod() {},
        updatePeriod() {},
        updateBets() {},
        getSummary() {},
      },
    },
  };
  const wrapper = mount(<DashboardContainer {...props} />);
  const endDate = new Date();

  wrapper.instance().onEndDateChange({ target: { value: endDate } });
  expect(wrapper.state('endDate').getTime()).toBe(endDate.getTime());
});

it('should call service.data.updatePeriod then call setPeriod when call openPeriod()', (done) => {
  const props = {
    setFetching() {},
    setCurrentPeriod() {
      done();
    },
    service: {
      data: {
        getCurrentPeriod() {
          return new Promise(resolve => resolve());
        },
        openPeriod() {
          return new Promise(resolve => resolve());
        },
        updatePeriod() {},
      },
    },
  };
  const wrapper = mount(<DashboardContainer {...props} />);

  wrapper.instance().openPeriod();
});

it('should call service.data.updatePeriod then call setPeriod when call closePeriod()', () => {
  const setFetchingMock = jest.fn();
  const setCurrentPeriodMock = jest.fn();
  const props = {
    setFetching: setFetchingMock,
    setCurrentPeriod: setCurrentPeriodMock,
    service: {
      data: {
        getCurrentPeriod() {
          return new Promise(resolve => resolve('ah'));
        },
        openPeriod() {},
        updatePeriod() {
          return new Promise(resolve => resolve());
        },
      },
    },
  };
  const wrapper = shallow(<DashboardContainer {...props} />);

  return wrapper.instance().closePeriod().then(() => {
    expect(setFetchingMock).toHaveBeenCalledTimes(2);
    expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
  });
});

// it('should call service.data.getSummary in componentDidMount when currentPeriod is present', () => {
//   const props = {
//     currentPeriod: {
//       id: 'id',
//     },
//     setFetching() {},
//     setCurrentPeriod() {},
//     service: {
//       data: {
//         getCurrentPeriod() {},
//         openPeriod() {},
//         updatePeriod() {},
//         getSummary: () => new Promise(resolve => resolve('test')),
//       },
//     },
//   };
//   const wrapper = mount(<DashboardContainer {...props} />);
//   expect(wrapper.update().state('summary')).toBe('test');
// });
