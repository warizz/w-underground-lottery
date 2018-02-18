import React from 'react';
import { mount } from 'enzyme';
import Snackbar from '../../components/snackbar';

it('should render correctly', done => {
  const props = {
    onClose() {
      done();
    },
    text: 'text',
  };
  const wrapper = mount(<Snackbar />);
  const spy = jest.spyOn(wrapper.instance(), 'setTimer');

  expect(wrapper.find('div.snackbar.inactive').exists()).toBe(true);
  wrapper.setProps({ text: props.text, onClose: props.onClose });
  expect(wrapper.find('div.snackbar.active > div.body').text()).toBe(
    props.text
  );
  // these 2 row below to cover branches
  wrapper.setProps({ text: props.text, onClose: props.onClose });
  expect(wrapper.find('div.snackbar.active > div.body').text()).toBe(
    props.text
  );

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(1000);
});
