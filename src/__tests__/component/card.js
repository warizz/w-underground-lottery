import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../components/card';

describe('component.card', () => {
  it('should render with children', () => {
    const wrapper = shallow(
      <Card>
        <div className="test-1" />
        <div className="test-2" />
      </Card>,
    );

    expect(wrapper.find('div.card-component').exists()).toBe(true);
    expect(wrapper.find('div.card-component > div.test-1').exists()).toBe(true);
    expect(wrapper.find('div.card-component > div.test-2').exists()).toBe(true);
  });
});
