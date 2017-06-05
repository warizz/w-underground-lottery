import React from 'react';
import { shallow } from 'enzyme';
import BetList from '../../../components/bet-list/bet-list';

describe('BetList', () => {
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
    const periodEndedAt = 'periodEndedAt';
    const bets = [
      {
        id: '1',
        number: '111',
        price1: 10,
        price2: 20,
        price3: 30,
        createdBy: 'createdBy',
      },
      {
        id: '2',
        number: '2',
        price1: 100,
        price2: 200,
        createdBy: 'createdBy',
      },
    ];

    const wrapper = shallow(<BetList periodEndedAt={periodEndedAt} bets={bets} />);
    expect(wrapper.find('div.bet-list').exists()).toBe(true);
    expect(wrapper.find('div.bet-list div.title').text()).toBe(periodEndedAt);
    expect(wrapper.find('div.bet-list div.title + div.body').text()).toBe('total: 354 ฿');
    expect(wrapper.find('div.bet-list > div.list').exists()).toBe(true);
    expect(wrapper.find('div.bet-list > div.list').children().length).toBe(2);
  });
});
