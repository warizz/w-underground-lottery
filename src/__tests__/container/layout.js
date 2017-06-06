import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LayoutContainer from '../../container/layout';

import reducer from '../../reducers/index';

const store = createStore(reducer);

it('should render', () => {
  const wrapper = mount(
    <Provider store={store}>
      <LayoutContainer />
    </Provider>,
  );

  expect(wrapper.find('div.layout-component').exists()).toBe(true);
});
