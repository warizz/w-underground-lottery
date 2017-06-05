import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from '../../components/user-profile';

it('should render without props', () => {
  const wrapper = shallow(<UserProfile />);

  expect(wrapper.find('div.user-profile').exists()).toBe(true);
  expect(wrapper.find('div.placeholder').text()).toBe('...');
});

it('should render with user', () => {
  const user = {
    is_admin: false,
    name: 'name',
    picture: 'picture',
  };

  const wrapper = shallow(<UserProfile user={user} />);

  expect(wrapper.find('div.body > img.picture').props().src).toBe(user.picture);
  expect(wrapper.find('div.body > div.name').text()).toBe(user.name);
  expect(wrapper.find('div.action').children().length).toBe(2);
});

it('should render extralink with admin user', () => {
  const user = {
    is_admin: true,
    name: 'name',
    picture: 'picture',
  };

  const wrapper = shallow(<UserProfile user={user} />);

  expect(wrapper.find('div.action').childAt(0).props().to).toBe('/dashboard');
});
