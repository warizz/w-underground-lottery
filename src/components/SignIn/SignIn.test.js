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

  it('should match snapshot with props.errorText', () => {
    const props = {
      errorText: 'errorText',
    };
    const wrapper = shallow(<Uut {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
