import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/home';

it('should render without props', () => {
  const wrapper = shallow(<Page />);

  expect(wrapper.find('div.home').exists()).toBe(true);
});

describe('show/hide element', () => {
  it('should render BetEditor element when currentPeriod.isOpen === true', () => {
    const props = {
      currentPeriod: {
        isOpen: true,
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('div#bet-editor-container').exists()).toBe(true);
  });

  it('should render ResultDisplay element when currentPeriod.result is defined', () => {
    const props = {
      currentPeriod: {
        result: {},
      },
    };
    const wrapper = shallow(<Page {...props} />);

    expect(wrapper.find('div#result-display-container').exists()).toBe(true);
  });
});
