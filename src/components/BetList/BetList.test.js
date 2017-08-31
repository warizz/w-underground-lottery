import React from 'react';
import { shallow } from 'enzyme';
import Sut from './index';

it('should successfully render with only required props', () => {
  const wrapper = shallow(<Sut />);

  expect(wrapper.find('div.bet-list-component').exists()).toBe(true);
});
