import React from 'react';
import { shallow } from 'enzyme';
import Sut from './index';

it('should render children', () => {
  const wrapper = shallow(
    <Sut>
      <div className='test-element'>test-text</div>
    </Sut>
  );

  expect(wrapper.find('div.card-component').exists()).toBe(true);
  expect(wrapper.find('div.test-element').exists()).toBe(true);
  expect(wrapper.find('div.test-element').text()).toBe('test-text');
});
