import React from 'react';
import { mount } from 'enzyme';
import Snackbar from '../../components/snackbar';

it('should render correctly', (done) => {
  const props = {
    onClose() {
      done();
    },
    text: 'text',
  };
  const wrapper = mount(<Snackbar />);

  expect(wrapper.find('div.snackbar.inactive').exists()).toBe(true);
  wrapper.setProps({ text: props.text, onClose: props.onClose });
  expect(wrapper.find('div.snackbar.active > div.body').text()).toBe(props.text);
});
