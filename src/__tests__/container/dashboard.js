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
