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
  it('should render correct text for 1:100:200', () => {
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
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('li#bet-it--123').text()).toBe('1 = บน 100 ล่าง 200');
  });
  it('should render correct text for 12:10:20', () => {
    const props = {
      bets: [
        {
          id: '123',
          number: '12',
          price1: 10,
          price2: 20,
          createdBy: {
            id: 'id',
            name: 'name',
          },
        },
      ],
      currentPeriod: {
        endedAt: new Date(2017, 1, 1),
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('li#bet-it--123').text()).toBe('12 = บน 10 ล่าง 20');
  });
  it('should render correct text for 123:10:20:30', () => {
    const props = {
      bets: [
        {
          id: '123',
          number: '123',
          price1: 10,
          price2: 20,
          price3: 30,
          createdBy: {
            id: 'id',
            name: 'name',
          },
        },
      ],
      currentPeriod: {
        endedAt: new Date(2017, 1, 1),
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('li#bet-it--123').text()).toBe('123 = เต็ง 10 โต๊ด 20 ล่าง 30');
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
