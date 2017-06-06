import React from 'react';
import { mount } from 'enzyme';
import LayoutPage from '../../pages/layout';

it('should render with no props', () => {
  const wrapper = mount(<LayoutPage />);

  expect(wrapper.find('div.layout-component').exists()).toBe(true);
  expect(wrapper.find('div.tool-bar').exists()).toBe(true);
});

it('should render snackbar and call onClose()', (done) => {
  const props = {
    alert: 'alert',
    setAlert(arg) {
      expect(arg).toBe('');
      done();
    },
  };
  mount(
    <LayoutPage {...props}>
      <div>test</div>
    </LayoutPage>,
  );
});
