import React from 'react';
import { shallow } from 'enzyme';
import ResultDisplay from '../../components/result-display';

it('should render with only required props', () => {
  const props = {
    six: '053630',
    firstThree: '121',
    secondThree: '218',
    thirdThree: '581',
    fourthThree: '881',
    two: '61',
    endedAt: '2017-01-01',
  };
  const wrapper = shallow(<ResultDisplay {...props} />);

  expect(wrapper.find('div.result-display').exists()).toBe(true);
  expect(wrapper.find('div.title').text()).toBe(props.endedAt);
  expect(wrapper.find('span.six').text()).toBe(props.six);
  expect(wrapper.find('span.two').text()).toBe(props.two);
  expect(wrapper.find('span.firstThree').text()).toBe(props.firstThree);
  expect(wrapper.find('span.secondThree').text()).toBe(props.secondThree);
  expect(wrapper.find('span.thirdThree').text()).toBe(props.thirdThree);
  expect(wrapper.find('span.fourthThree').text()).toBe(props.fourthThree);
});

it('should render with losing bets', () => {
  const props = {
    six: '053630',
    firstThree: '121',
    secondThree: '218',
    thirdThree: '581',
    fourthThree: '881',
    two: '61',
    endedAt: '2017-01-01',
    bets: [
      {
        id: '1',
        number: '111',
        price1: 10,
        createdBy: 'createdBy',
      },
    ],
  };
  const wrapper = shallow(<ResultDisplay {...props} />);

  expect(wrapper.find('div.message.lose').exists()).toBe(true);
});

it('should render with winning bets', () => {
  const props = {
    six: '053630',
    firstThree: '121',
    secondThree: '218',
    thirdThree: '581',
    fourthThree: '881',
    two: '61',
    endedAt: '2017-01-01',
    bets: [
      {
        id: '1',
        number: '630',
        price1: 10,
        createdBy: 'createdBy',
      },
    ],
  };
  const wrapper = shallow(<ResultDisplay {...props} />);

  expect(wrapper.find('div.message.win').exists()).toBe(true);
});
