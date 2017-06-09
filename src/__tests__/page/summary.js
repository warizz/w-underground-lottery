import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Page from '../../pages/summary';

it('should render with no currentPeriod', () => {
  const wrapper = shallow(<Page />);

  expect(wrapper.find('div#placeholder').text()).toBe('no period');
});

it('should render with no bets', () => {
  const props = {
    currentPeriod: {},
  };
  const wrapper = shallow(<Page {...props} />);

  expect(wrapper.find('div#placeholder').text()).toBe('no one bet yet');
});

it('should render correctly with bets', () => {
  const props = {
    bets: [
      {
        id: 'id',
        number: '123',
        price1: 10,
        price2: 20,
        price3: 30,
        createdBy: {
          id: 'id',
          name: 'name',
        },
        isPaid: false,
      },
    ],
    currentPeriod: {
      endedAt: new Date(2017, 1, 1),
    },
  };
  const wrapper = shallow(<Page {...props} />);

  expect(wrapper.find('div#period-endedAt').text()).toBe('1 February 2017');
});

it('should render correctly when win a reward', () => {
  const props = {
    bets: [
      {
        id: 'id',
        number: '121',
        price1: 10,
        price2: 20,
        price3: 30,
        createdBy: {
          id: 'id',
          name: 'name',
        },
        isPaid: false,
      },
    ],
    currentPeriod: {
      endedAt: new Date(2017, 1, 1),
    },
    service: {
      calculation: {
        checkReward: () => () => 'you win',
        calculateTotal: () => () => {},
      },
    },
  };
  const wrapper = shallow(<Page {...props} />);

  expect(wrapper.find('li#bet-item-id-reward').text()).toBe('you win');
});

it('should call copyToClipboard when click button#copy-to-clipboard', () => {
  const setAlertMock = jest.fn();
  const props = {
    bets: [
      {
        number: '123',
        price1: 10,
        price2: 20,
        price3: 30,
        createdBy: {
          id: 'id',
          name: 'name',
        },
        isPaid: false,
      },
    ],
    currentPeriod: {
      endedAt: new Date(2017, 1, 1),
    },
    setAlert: setAlertMock,
  };
  document.execCommand = jest.fn();
  const wrapper = mount(<Page {...props} />, { attachTo: document.body });

  expect(wrapper.find('#for-clipboard').exists()).toBe(true);
  wrapper.find('button#copy-to-clipboard').simulate('click');
  expect(setAlertMock).toHaveBeenCalledWith('copied to clipboard');
});
