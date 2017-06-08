import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index';
import ConnectedDashboardContainer, { DashboardContainer } from '../../container/dashboard';

it('should render contained component', () => {
  const wrapper = mount(<DashboardContainer />);

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should render connected component', () => {
  const store = createStore(reducer);
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedDashboardContainer />
    </Provider>,
  );

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should update state.endDate when call onEndDateChange()', () => {
  const wrapper = mount(<DashboardContainer />);
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

it('should call service.data.updatePeriod then call setPeriod when call closePeriod()', (done) => {
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
        openPeriod() {},
        updatePeriod() {
          return new Promise(resolve => resolve());
        },
      },
    },
  };
  const wrapper = mount(<DashboardContainer {...props} />);

  wrapper.instance().closePeriod();
});
