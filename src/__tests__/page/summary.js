/* eslint-disable standard/no-callback-literal */
import React from 'react';
import { shallow, mount } from 'enzyme';
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

describe('rendering bet', () => {
  it('should render correct text for win bet', () => {
    const props = {
      bets: [
        {
          id: '123',
          number: '1',
          price1: 100,
          price2: 200,
          createdBy: {
            id: 'id',
            name: 'name',
          },
        },
      ],
      currentPeriod: {
        endedAt: new Date(2017, 1, 1),
      },
      service: {
        calculation: {
          calculateTotal: () => () => {},
          checkReward: (result, callback) => () => callback('1', 100, 2, 'x'),
        },
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('li.bet.win').text()).toBe('ถูก x [1] 100 x 2 = 200 บาท');
  });
  it('should render expected buyers', () => {
    const props = {
      bets: [
        {
          id: '1',
          number: '1',
          price1: 100,
          price2: 200,
          createdBy: {
            id: 'buyer-1',
            name: 'buyer-1',
          },
        },
        {
          id: '2',
          number: '12',
          price1: 10,
          price2: 20,
          createdBy: {
            id: 'buyer-1',
            name: 'buyer-1',
          },
        },
        {
          id: '3',
          number: '123',
          price3: 300,
          createdBy: {
            id: 'buyer-2',
            name: 'buyer-2',
          },
        },
      ],
      currentPeriod: {
        endedAt: new Date(2017, 1, 1),
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('.buyer-buyer-1').exists()).toBe(true);
    expect(wrapper.find('.buyer-buyer-2').exists()).toBe(true);
  });
  it('should not render payment status when current period is openning', () => {
    const props = {
      bets: [
        {
          id: '123',
          number: '1',
          price1: 100,
          price2: 200,
          createdBy: {
            id: 'id',
            name: 'buyer-1',
          },
        },
      ],
      currentPeriod: {
        isOpen: true,
        endedAt: new Date(2017, 1, 1),
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('label#payment-status-for-buyer-1').exists()).toBe(false);
  });
  it('should not render payment status processing when processing a buyer payment', () => {
    const props = {
      paying: 'buyer-1',
      bets: [
        {
          id: '123',
          number: '1',
          price1: 100,
          price2: 200,
          createdBy: {
            id: 'id',
            name: 'buyer-1',
          },
        },
      ],
      currentPeriod: {
        endedAt: new Date(2017, 1, 1),
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('span.payment-status-processing').exists()).toBe(true);
  });
  it('should render correct style for paid bets', () => {
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
          isPaid: true,
        },
      ],
      currentPeriod: {
        endedAt: new Date(2017, 1, 1),
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('li.bet.paid').exists()).toBe(true);
  });
});
