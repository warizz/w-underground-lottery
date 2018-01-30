import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Uut from './';

describe('snapshot testing', () => {
  it('should match snapshot when no props', () => {
    const props = {
      currentPeriod: {
        endedAt: new Date(2017, 0, 1),
      },
    };
    const wrapper = shallow(<Uut {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot when props.currentPeriod.isOpen', () => {
    const props = {
      currentPeriod: {
        endedAt: new Date(2017, 0, 1),
        isOpen: true,
      },
    };
    const wrapper = shallow(<Uut {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot when props.currentPeriod.result', () => {
    const props = {
      currentPeriod: {
        endedAt: new Date(2017, 1, 1),
        result: {},
      },
    };
    const wrapper = shallow(<Uut {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
