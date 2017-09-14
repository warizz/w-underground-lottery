/* eslint-disable max-len */
import React from 'react';
import { shallow } from 'enzyme';
import Sut from './Toolbar';

it('should render page name === "Test page" when props.pageName === "Test page"', () => {
  const props = {
    pageName: 'Test page',
  };
  const wrapper = shallow(<Sut {...props} />);

  expect(wrapper.find('.page-name').text()).toBe(props.pageName);
});

it('should render home icon when pageName === "Home"', () => {
  const props = {
    pageName: 'Home',
  };
  const wrapper = shallow(<Sut {...props} />);
  expect(wrapper.find('img.main-icon').props().src).toBe('home-icon.svg');
});

it('should render home icon when pageName !== "Home"', () => {
  const props = {
    pageName: 'Test page',
  };
  const wrapper = shallow(<Sut {...props} />);
  expect(wrapper.find('img.main-icon').props().src).toBe('back-icon.svg');
});

it('should call onClickMainButton when click main button', () => {
  const props = {
    onClickMainButton: jest.fn(),
  };
  const wrapper = shallow(<Sut {...props} />);

  wrapper.find('button.main').simulate('click');
  expect(props.onClickMainButton).toHaveBeenCalledTimes(1);
});
