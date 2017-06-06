import React from 'react';
import { mount } from 'enzyme';
import BetEditor from '../../components/bet-editor';

it('should render inputs correctly', () => {
  const editingBet = {
    number: '123',
    price1: '10',
    price2: '20',
    price3: '30',
  };
  const wrapper = mount(<BetEditor />);

  expect(wrapper.find('div.bet-editor').exists()).toBe(true);
  expect(wrapper.find('#number').text()).toBe('');
  expect(wrapper.find('#price1').text()).toBe('');
  expect(wrapper.find('#price2').text()).toBe('');
  expect(wrapper.find('#price3').text()).toBe('');

  wrapper.setProps({ editingBet });
  expect(wrapper.find('#number').node.value).toBe(editingBet.number);
  expect(wrapper.find('#price1').node.value).toBe(editingBet.price1);
  expect(wrapper.find('#price2').node.value).toBe(editingBet.price2);
  expect(wrapper.find('#price3').node.value).toBe(editingBet.price3);
});

it('should render input changes correctly', () => {
  const editingBet = {
    number: '123',
    price1: '10',
    price2: '20',
    price3: '30',
  };
  const wrapper = mount(<BetEditor />);

  expect(wrapper.find('div.bet-editor').exists()).toBe(true);
  expect(wrapper.find('#number').text()).toBe('');
  expect(wrapper.find('#price1').text()).toBe('');
  expect(wrapper.find('#price2').text()).toBe('');
  expect(wrapper.find('#price3').text()).toBe('');

  wrapper.setState({ ...editingBet });
  expect(wrapper.find('#number').node.value).toBe(editingBet.number);
  expect(wrapper.find('#price1').node.value).toBe(editingBet.price1);
  expect(wrapper.find('#price2').node.value).toBe(editingBet.price2);
  expect(wrapper.find('#price3').node.value).toBe(editingBet.price3);
});

it('should get random number when click random button', () => {
  const wrapper = mount(<BetEditor />);

  expect(wrapper.find('#number').node.value).toBe('');
  wrapper.find('button.random').simulate('click');
  expect(wrapper.find('#number').node.value).toMatch(/^\d{1,3}$/);
});
