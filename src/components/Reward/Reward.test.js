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

  it('should match snapshot with bet but wrong result', () => {
    const props = {
      bets: [
        {
          number: '111',
          price1: 10,
          price2: 20,
          price3: 30,
        },
      ],
      result: {
        firstThree: '123',
        fourthThree: '101',
        secondThree: '456',
        six: '123456',
        thirdThree: '789',
        two: '69',
      },
    };
    const wrapper = shallow(<Uut {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with matched result', () => {
    const props = {
      bets: [
        {
          number: '123',
          price1: 10,
          price2: 20,
          price3: 30,
        },
      ],
      result: {
        firstThree: '123',
        fourthThree: '101',
        secondThree: '456',
        six: '123456',
        thirdThree: '789',
        two: '69',
      },
    };
    const wrapper = shallow(<Uut {...props} />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
