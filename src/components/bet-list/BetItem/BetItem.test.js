import React from 'react';
import { shallow } from 'enzyme';
import Sut from './index';

const bet = {
  id: 'id',
  number: '001',
  price1: 10,
  price2: 20,
  price3: 30,
};

it('should render with only required props', () => {
  const props = { bet };
  const wrapper = shallow(<Sut {...props} />);

  expect(wrapper.find('div.bet-item').exists()).toBe(true);
  expect(wrapper.find('button.edit').exists()).toBe(false);
  expect(wrapper.find('button.delete').exists()).toBe(false);
});

it('should render edit && delete button when props.isEditable === true', () => {
  const isEditable = true;
  const props = { bet, isEditable };
  const wrapper = shallow(<Sut {...props} />);

  expect(wrapper.find('button.edit').exists()).toBe(true);
  expect(wrapper.find('button.delete').exists()).toBe(true);
});

it('should do as expected when submit edit', () => {
  const editHandler = jest.fn();
  const isEditable = true;
  const props = { bet, editHandler, isEditable };
  const wrapper = shallow(<Sut {...props} />);

  wrapper.find('button.edit').simulate('click');
  expect(editHandler).toHaveBeenCalledTimes(1);
  expect(editHandler).toHaveBeenCalledWith(bet);
});

it('should do as expected when submit delete', () => {
  const deleteHandler = jest.fn();
  const isEditable = true;
  const props = { bet, deleteHandler, isEditable };
  const wrapper = shallow(<Sut {...props} />);

  wrapper.find('button.delete').simulate('click');
  expect(deleteHandler).toHaveBeenCalledTimes(1);
  expect(deleteHandler).toHaveBeenCalledWith(bet.id);
});
