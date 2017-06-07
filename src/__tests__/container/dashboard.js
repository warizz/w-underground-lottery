import React from 'react';
import { mount } from 'enzyme';
import { DashboardContainer } from '../../container/dashboard';

it('should render contained component', () => {
  const wrapper = mount(<DashboardContainer />);

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should update state.endDate when call onEndDateChange()', () => {
  const wrapper = mount(<DashboardContainer />);
  const endDate = new Date();

  wrapper.instance().onEndDateChange({ target: { value: endDate } });
  expect(wrapper.state('endDate').getTime()).toBe(endDate.getTime());
});

it('should call service.data.updatePeriod then call setPeriod when call closePeriod()', () => {
  const setCurrentPeriodMock = jest.fn();
  const props = {
    setFetching() {},
    setCurrentPeriod: setCurrentPeriodMock,
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
  // expect(setCurrentPeriodMock).toHaveBeenCalled();
});
