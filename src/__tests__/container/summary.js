import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index';
import ConnectedSummaryContainer, { SummaryContainer } from '../../container/summary';

it('should render contained component', () => {
  const wrapper = mount(<SummaryContainer />);

  expect(wrapper.find('div.summary-component').exists()).toBe(true);
});

it('should render connected component', () => {
  const store = createStore(reducer);
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedSummaryContainer />
    </Provider>,
  );

  expect(wrapper.find('div.summary-component').exists()).toBe(true);
});
