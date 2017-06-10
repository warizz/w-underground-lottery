import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/history';

it('should render without props', () => {
  const wrapper = shallow(<Page />);

  expect(wrapper.find('div.history').exists()).toBe(true);
  expect(wrapper.find('div.placeholder').exists()).toBe(true);
});

it('should render correctly with history', () => {
  const props = {
    history: [
      {
        id: '1',
        endedAt: new Date(2017, 0, 1),
        bets: [
          {
            id: 'bet-1',
            number: '123',
            price1: 10,
            price2: 20,
            price3: 30,
          },
        ],
      },
    ],
  };
  const wrapper = shallow(<Page {...props} />);

  expect(wrapper.find('div.title').text()).toBe('01 Jan 2017');
  expect(wrapper.find('ul > li.bet-item-bet-1').exists()).toBe(true);
  expect(wrapper.find('button#clone').exists()).toBe(false);
});

it('should render correctly with history and clonable === true', () => {
  const cloneMock = jest.fn();
  const props = {
    clonable: true,
    clone: cloneMock,
    history: [
      {
        id: '1',
        endedAt: new Date(2017, 0, 1),
        bets: [
          {
            id: 'bet-1',
            number: '123',
            price1: 10,
            price2: 20,
            price3: 30,
          },
        ],
      },
    ],
  };
  const wrapper = shallow(<Page {...props} />);

  expect(wrapper.find('button#clone').exists()).toBe(true);
  wrapper.find('button#clone').simulate('click');
  expect(cloneMock).toHaveBeenCalledTimes(1);
});
