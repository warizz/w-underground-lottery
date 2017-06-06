import React from 'react';
import { shallow } from 'enzyme';
import ToolBar from '../../components/tool-bar';

it('should render with no props', () => {
  const wrapper = shallow(<ToolBar />);

  expect(wrapper.find('div.tool-bar').exists()).toBe(true);
});

it('should render with pageName === "Home"', () => {
  const props = {
    pageName: 'Home',
  };
  const wrapper = shallow(<ToolBar {...props} />);

  expect(wrapper.find('i.material-icons').text()).toBe('home');
  expect(wrapper.find('span.page-name').text()).toBe(props.pageName);
});

it('should render with pageName !== "Home"', () => {
  const props = {
    pageName: 'Hahaha',
  };
  const wrapper = shallow(<ToolBar {...props} />);

  expect(wrapper.find('button.back').exists()).toBe(true);
  expect(wrapper.find('span.page-name').text()).toBe(props.pageName);
});

it('should call backButtonClickedCallback() when click back button', (done) => {
  const props = {
    pageName: 'Hahaha',
    backButtonClickedCallback: done,
  };
  const wrapper = shallow(<ToolBar {...props} />);

  expect(wrapper.find('button.back').simulate('click'));
});
