import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Uut from './';

describe('snapshot testing', () => {
  it('should match snapshot when no props', () => {
    const wrapper = shallow(<Uut />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with result', () => {
    const props = {
      firstThree: '123',
      fourthThree: '101',
      secondThree: '456',
      six: '123456',
      thirdThree: '789',
      two: '69',
    };
    const wrapper = shallow(<Uut {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
