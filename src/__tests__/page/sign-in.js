import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/sign-in';

it('should render with no props', () => {
  const wrapper = shallow(<Page />);

  expect(wrapper.find('div.sign-in').exists()).toBe(true);
  expect(wrapper.find('div.sign-in > button#sign-in').exists()).toBe(true);
  expect(wrapper.find('div.sign-in > div.message').exists()).toBe(true);
});

it('should render correctly when fetching === true', () => {
  const props = {
    fetching: true,
  };
  const wrapper = shallow(<Page {...props} />);

  expect(wrapper.find('div.sign-in > button[disabled=true]#sign-in').text()).toBe('...');
});

describe('behaviors', () => {
  it('should call props.signInButtonClickedCallback() when click button#sign-in', () => {
    const signInButtonClickedCallbackMock = jest.fn();
    const props = { signInButtonClickedCallback: signInButtonClickedCallbackMock };
    const wrapper = shallow(<Page {...props} />);

    wrapper.find('div.sign-in > button#sign-in').simulate('click');
    expect(signInButtonClickedCallbackMock).toHaveBeenCalledTimes(1);
  });

  it('should render correctly when set props.alertText', () => {
    const errorTextMock = 'error!';
    const props = {
      errorText: errorTextMock,
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('div.message.error').text()).toBe(errorTextMock);
  });
});
