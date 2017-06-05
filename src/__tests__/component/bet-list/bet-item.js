import React from 'react';
import { shallow } from 'enzyme';
import BetItem from '../../../components/bet-list/bet-item';

describe('BetItem', () => {
  it('should return null when no propTypes.bet was provided', () => {
    const wrapper = shallow(<BetItem />);
    expect(wrapper.find('div.bet-item').exists()).toBe(false);
  });

  it('should return null when bet.number.length more than 3', () => {
    const bet = {
      id: '1',
      number: '1234',
      price1: 10,
      price2: 20,
      price3: 30,
      createdBy: 'createdBy',
    };

    const wrapper = shallow(<BetItem bet={bet} />);
    expect(wrapper.find('div.bet-item').exists()).toBe(false);
  });

  it('should render text correctly when bet with 3 numbers was provided', () => {
    const bet = {
      id: '1',
      number: '123',
      price1: 10,
      price2: 20,
      price3: 30,
      createdBy: 'createdBy',
    };

    const wrapper = shallow(<BetItem bet={bet} />);
    expect(wrapper.find('div.bet-item').exists()).toBe(true);
    expect(wrapper.find('div.bet-number').text()).toBe(bet.number);
    expect(wrapper.find('div.price-1').text()).toBe('เต็ง 10');
    expect(wrapper.find('div.price-1 + .reward').text()).toBe('5000');
    expect(wrapper.find('div.price-2').text()).toBe('โต๊ด 20');
    expect(wrapper.find('div.price-2 + .reward').text()).toBe('2000');
    expect(wrapper.find('div.price-3').text()).toBe('ล่าง 30');
    expect(wrapper.find('div.price-3 + .reward').text()).toBe('3000');
  });

  it('should render text correctly when bet with 2 numbers was provided', () => {
    const bet = {
      id: '1',
      number: '12',
      price1: 10,
      price2: 20,
      createdBy: 'createdBy',
    };

    const wrapper = shallow(<BetItem bet={bet} />);
    expect(wrapper.find('div.bet-item').exists()).toBe(true);
    expect(wrapper.find('div.bet-number').text()).toBe(bet.number);
    expect(wrapper.find('div.price-1').text()).toBe('บน 10');
    expect(wrapper.find('div.price-1 + .reward').text()).toBe('700');
    expect(wrapper.find('div.price-2').text()).toBe('ล่าง 20');
    expect(wrapper.find('div.price-2 + .reward').text()).toBe('1400');
    expect(wrapper.find('div.price-3').parent().exists()).toBe(false);
  });

  it('should render text correctly when bet with 1 numbers was provided', () => {
    const bet = {
      id: '1',
      number: '1',
      price1: 100,
      price2: 200,
      createdBy: 'createdBy',
    };

    const wrapper = shallow(<BetItem bet={bet} />);
    expect(wrapper.find('div.bet-item').exists()).toBe(true);
    expect(wrapper.find('div.bet-number').text()).toBe(bet.number);
    expect(wrapper.find('div.price-1').text()).toBe('บน 100');
    expect(wrapper.find('div.price-2').text()).toBe('ล่าง 200');
    expect(wrapper.find('div.price-3').exists()).toBe(false);
  });

  it('should render actions correctly when isEditable === true', (done) => {
    const bet = {
      id: '1',
      number: '1',
      price1: 100,
      price2: 200,
      createdBy: 'createdBy',
    };
    const editCallback = ($bet) => {
      expect($bet.id).toBe('1');
    };
    const deleteCallback = ($id) => {
      expect($id).toBe('1');
      done();
    };

    const wrapper = shallow(<BetItem bet={bet} isEditable editHandler={editCallback} deleteHandler={deleteCallback} />);
    expect(wrapper.find('div.action').exists()).toBe(true);
    expect(wrapper.find('button.edit').exists()).toBe(true);
    expect(wrapper.find('button.edit').simulate('click'));
    expect(wrapper.find('button.delete').exists()).toBe(true);
    expect(wrapper.find('button.delete').simulate('click'));
  });
});
