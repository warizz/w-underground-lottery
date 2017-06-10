import React from 'react';
import { shallow } from 'enzyme';
import BetList from '../../../components/bet-list/bet-list';

it('should render when not provide "bets"', () => {
  const periodEndedAt = 'periodEndedAt';

  const wrapper = shallow(<BetList periodEndedAt={periodEndedAt} />);
  expect(wrapper.find('div.bet-list').exists()).toBe(true);
  expect(wrapper.find('div.bet-list div.title').text()).toBe(periodEndedAt);
  expect(wrapper.find('div.bet-list div.title + div.body').text()).toBe('total: 0 ฿');
  expect(wrapper.find('div.bet-list > div.list').exists()).toBe(true);
  expect(wrapper.find('div.bet-list > div.list').children().length).toBe(0);
});

it('should render when provide "bets"', () => {
  const props = {
    bets: [
      {
        id: '1',
        number: '111',
        price1: 10,
        price2: 20,
        price3: 30,
        createdBy: 'createdBy',
        createdAt: new Date(2017, 1, 1),
      },
      {
        id: '2',
        number: '2',
        price1: 100,
        price2: 200,
        createdBy: 'createdBy',
        createdAt: new Date(2017, 2, 1),
      },
      {
        id: '3',
        number: '12',
        price1: 10,
        createdBy: 'createdBy',
        createdAt: new Date(2016, 2, 1),
      },
      {
        id: '4',
        number: '44',
        price2: 10,
        createdBy: 'createdBy',
        createdAt: new Date(2016, 2, 1),
      },
    ],
    calculator: {
      calculateTicketPrice: () => 10,
    },
    periodEndedAt: 'periodEndedAt',
  };

  const wrapper = shallow(<BetList {...props} />);
  expect(wrapper.find('div.bet-list').exists()).toBe(true);
  expect(wrapper.find('div.bet-list div.title').text()).toBe(props.periodEndedAt);
  expect(wrapper.find('div.bet-list div.title + div.body').text()).toBe('total: 40 ฿');
  expect(wrapper.find('div.bet-list > div.list').exists()).toBe(true);
  expect(wrapper.find('div.bet-list > div.list').children().length).toBe(4);
});
