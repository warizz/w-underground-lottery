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

describe('handleNumberChange', () => {
  const wrapper = mount(<BetEditor />);

  it('should not allow other letter than number', () => {
    wrapper.find('input#number').simulate('change', { target: { value: 'x' } });
    expect(wrapper.find('input#number').node.value).toBeFalsy();
  });

  it('should not allow number.length > 3', () => {
    wrapper.find('input#number').simulate('change', { target: { value: '1234' } });
    expect(wrapper.find('input#number').node.value).toBe('123');
  });

  it('should change parent of input#price3 from hidden to visible when number.length > 3', () => {
    wrapper.find('input#number').simulate('change', { target: { value: '1' } });
    expect(wrapper.find('input#number').node.value).toBe('1');
    expect(wrapper.find('input#price3').parent().is('.input-group.hidden')).toBe(true);
    wrapper.find('input#number').simulate('change', { target: { value: '123' } });
    expect(wrapper.find('input#number').node.value).toBe('123');
    expect(wrapper.find('input#price3').parent().is('.input-group.visible')).toBe(true);
  });
});

describe('handlePriceChange', () => {
  const wrapper = mount(<BetEditor />);

  it('should not allow other letter than number', () => {
    wrapper.find('input#price1').simulate('change', { target: { value: 'x' } });
    expect(wrapper.find('input#price1').node.value).toBeFalsy();
  });

  it('should change price', () => {
    wrapper.find('input#price1').simulate('change', { target: { value: '1000' } });
    expect(wrapper.find('input#price1').node.value).toBe('1000');
  });
});

describe('handleSaveBet', () => {
  it('should get alert "number can not be blank"', () => {
    const wrapper = mount(<BetEditor />);

    wrapper.instance().handleSaveBet();
    expect(wrapper.state('alertText')).toBe('number can not be blank');
  });

  it('should get alert "number can not be blank"', () => {
    const wrapper = mount(<BetEditor />);

    wrapper.instance().handleSaveBet();
    expect(wrapper.state('alertText')).toBe('number can not be blank');
  });

  it('should get alert "at least 1 price must be filled"', () => {
    const wrapper = mount(<BetEditor />);

    wrapper.setState({ number: '123' });
    wrapper.instance().handleSaveBet();
    expect(wrapper.state('alertText')).toBe('at least 1 price must be filled');
  });

  it('should get alert "เลขวิ่ง ขั้นต่ำ 100"', () => {
    const wrapper = mount(<BetEditor />);

    wrapper.setState({ number: '1', price1: 10 });
    wrapper.instance().handleSaveBet();
    expect(wrapper.state('alertText')).toBe('เลขวิ่ง ขั้นต่ำ 100');
  });

  it('should get alert "ขั้นต่ำ 10"', () => {
    const wrapper = mount(<BetEditor />);

    wrapper.setState({ number: '12', price1: 5 });
    wrapper.instance().handleSaveBet();
    expect(wrapper.state('alertText')).toBe('ขั้นต่ำ 10');
  });

  it('should get alert "โต๊ด ต้อง เต็ง"', () => {
    const wrapper = mount(<BetEditor />);

    wrapper.setState({ number: '123', price2: 100 });
    wrapper.instance().handleSaveBet();
    expect(wrapper.state('alertText')).toBe('โต๊ด ต้อง เต็ง');
  });

  it('should call saveBetHandler() and reset state', () => {
    const wrapper = mount(<BetEditor />);
    const spy = jest.fn();

    wrapper.setProps({ saveBetHandler: spy });
    wrapper.setState({ number: '12', price1: 10, price2: 10 });
    wrapper.instance().handleSaveBet();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state('number')).toBeFalsy();
    expect(wrapper.state('price1')).toBeFalsy();
    expect(wrapper.state('price2')).toBeFalsy();
  });
});
