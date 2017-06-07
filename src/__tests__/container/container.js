import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Container from '../../container/dashboard';
import reducer from '../../reducers/index';

it('should render contained component', () => {
  const store = createStore(reducer);
  const wrapper = mount(
    <Provider store={store}>
      <Container />
    </Provider>,
  );

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});
