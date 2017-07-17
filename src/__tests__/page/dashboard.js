import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/dashboard';

it('should render with no props', () => {
  const wrapper = shallow(<Page />);

  expect(wrapper.find('div.dashboard').exists()).toBe(true);
});

it('should render elements correctly when !currentPeriod.isOpen', () => {
  const wrapper = shallow(<Page currentPeriod={{ isOpen: false }} />);

  expect(wrapper.find('input#txt-start-date').exists()).toBe(true);
  expect(wrapper.find('button#open-period').exists()).toBe(true);
});

it('should render elements correctly when currentPeriod.isOpen', () => {
  const wrapper = shallow(<Page currentPeriod={{ isOpen: true }} />);

  expect(wrapper.find('button#close-period').exists()).toBe(true);
});

// eslint-disable-next-line max-len
it('should call openPeriodClickedCallback when click button#open-period', () => {
  const openPeriodClickedCallbackMock = jest.fn();
  const props = {
    endDate: '2017-01-01',
    openPeriodClickedCallback: openPeriodClickedCallbackMock,
  };
  const wrapper = shallow(<Page {...props} />);

  wrapper.find('button#open-period').simulate('click');
  expect(openPeriodClickedCallbackMock).toHaveBeenCalledWith(props.endDate);
});

// eslint-disable-next-line max-len
it('should call updateResultClickedCallback when click button#update-result', () => {
  const updateResultClickedCallback = jest.fn();
  const props = {
    updateResultClickedCallback,
  };
  const wrapper = shallow(<Page {...props} />);

  wrapper.find('button#update-result').simulate('click');
  expect(updateResultClickedCallback).toHaveBeenCalled();
});

// eslint-disable-next-line max-len
it('should call closeButtonClickedCallback when click button#close-period', () => {
  const closeButtonClickedCallbackMock = jest.fn();
  const props = {
    currentPeriod: {
      id: 'id',
      isOpen: true,
    },
    endDate: '2017-01-01',
    closeButtonClickedCallback: closeButtonClickedCallbackMock,
  };
  const wrapper = shallow(<Page {...props} />);

  wrapper.find('button#close-period').simulate('click');
  expect(closeButtonClickedCallbackMock).toHaveBeenCalledWith(
    props.currentPeriod.id
  );
});
