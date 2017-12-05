import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index';
import ConnectedContainer, { HomeContainer } from '../../container/home';

it('should render connected component', () => {
  const store = createStore(reducer);
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedContainer />
    </Provider>
  );

  expect(wrapper.find('div.Home').exists()).toBe(true);
});

describe('life cycle functions', () => {
  it('should do specific tasks when componentDidMount', () => {
    const setPageNameMock = jest.fn();
    const props = {
      setPageName: setPageNameMock,
    };
    mount(<HomeContainer {...props} />);

    expect(setPageNameMock).toHaveBeenCalledTimes(1);
    expect(setPageNameMock).toHaveBeenCalledWith('Home');
  });
});

describe('internal functions', () => {
  it('should do specific tasks when call inputToggle()', () => {
    const wrapper = mount(<HomeContainer />);

    wrapper.instance().inputToggle();
    wrapper.update();
    expect(wrapper.state('editingBet')).toBe(null);
    expect(wrapper.state('inputOpen')).toBe(true);
  });
  it('should do specific tasks when call setEditingBet()', () => {
    const editingBetMock = {};
    const focusMock = jest.fn();
    document.getElementById = () => ({ focus: focusMock });
    const wrapper = mount(<HomeContainer />);

    wrapper.instance().setEditingBet(editingBetMock);
    wrapper.update();
    expect(wrapper.state('editingBet')).toBe(editingBetMock);
    expect(wrapper.state('inputOpen')).toBe(true);
    expect(focusMock).toHaveBeenCalledTimes(1);
  });
  it('should do specific tasks when call handleDeleteBet()', async () => {
    const setFetchingMock = jest.fn();
    const setCurrentPeriodMock = jest.fn();
    const setAlertMock = jest.fn();
    const props = {
      setFetching: setFetchingMock,
      setCurrentPeriod: setCurrentPeriodMock,
      setAlert: setAlertMock,
    };
    const wrapper = mount(<HomeContainer {...props} />);

    await wrapper.instance().handleDeleteBet();
    expect(setFetchingMock).toHaveBeenCalledTimes(2);
    expect(setFetchingMock).toHaveBeenLastCalledWith(false);
    expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
    expect(setAlertMock).toHaveBeenCalledWith('deleted');
  });
  describe('handleSaveBet', () => {
    it('should return error when call with bet = undefined', async () => {
      const wrapper = mount(<HomeContainer />);

      try {
        await wrapper.instance().handleSaveBet();
      } catch (e) {
        expect(e.message).toBe('Invalid argument: bet is not defined');
      }
    });
    it('should return error when call with currentPeriod.isOpen === false', async () => {
      const wrapper = mount(<HomeContainer />);

      try {
        await wrapper.instance().handleSaveBet({});
      } catch (e) {
        expect(e.message).toBe('Invalid operation: current period is closed');
      }
    });
    it('should complete inserting tasks', async () => {
      const bet = {
        number: '321',
        price1: 10,
        price2: 10,
        price3: 10,
      };
      const currentPeriodMock = {
        isOpen: true,
        bets: [
          {
            number: '123',
          },
        ],
      };
      const setFetchingMock = jest.fn();
      const setCurrentPeriodMock = jest.fn();
      const setAlertMock = jest.fn();
      const props = {
        currentPeriod: currentPeriodMock,
        setFetching: setFetchingMock,
        setCurrentPeriod: setCurrentPeriodMock,
        setAlert: setAlertMock,
      };
      const wrapper = mount(<HomeContainer {...props} />);

      await wrapper.instance().handleSaveBet(bet);
      expect(setFetchingMock).toHaveBeenCalledTimes(2);
      expect(setFetchingMock).toHaveBeenLastCalledWith(false);
      expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
      expect(setAlertMock).toHaveBeenCalledWith('Saved');
      wrapper.update();
      expect(wrapper.state('editingBet')).toBe(null);
    });
    it('should complete updating tasks', async () => {
      const bet = {
        number: '123',
        price1: 10,
        price2: 10,
        price3: 10,
      };
      const currentPeriodMock = {
        isOpen: true,
        bets: [
          {
            number: '123',
          },
        ],
      };
      const setFetchingMock = jest.fn();
      const setCurrentPeriodMock = jest.fn();
      const setAlertMock = jest.fn();
      const props = {
        currentPeriod: currentPeriodMock,
        setFetching: setFetchingMock,
        setCurrentPeriod: setCurrentPeriodMock,
        setAlert: setAlertMock,
      };
      const wrapper = mount(<HomeContainer {...props} />);

      await wrapper.instance().handleSaveBet(bet);
      expect(setFetchingMock).toHaveBeenCalledTimes(2);
      expect(setFetchingMock).toHaveBeenLastCalledWith(false);
      expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
      expect(setAlertMock).toHaveBeenCalledWith('Saved');
      wrapper.update();
      expect(wrapper.state('editingBet')).toBe(null);
    });
    it('should complete updating tasks with no prices', async () => {
      const bet = {
        number: '123',
        price1: 0,
        price2: 0,
        price3: 0,
      };
      const currentPeriodMock = {
        isOpen: true,
        bets: [
          {
            number: '123',
          },
        ],
      };
      const setFetchingMock = jest.fn();
      const setCurrentPeriodMock = jest.fn();
      const setAlertMock = jest.fn();
      const props = {
        currentPeriod: currentPeriodMock,
        setFetching: setFetchingMock,
        setCurrentPeriod: setCurrentPeriodMock,
        setAlert: setAlertMock,
      };
      const wrapper = mount(<HomeContainer {...props} />);

      await wrapper.instance().handleSaveBet(bet);
      expect(setFetchingMock).toHaveBeenCalledTimes(2);
      expect(setFetchingMock).toHaveBeenLastCalledWith(false);
      expect(setCurrentPeriodMock).toHaveBeenCalledTimes(1);
      expect(setAlertMock).toHaveBeenCalledWith('Saved');
      wrapper.update();
      expect(wrapper.state('editingBet')).toBe(null);
    });
  });
  it('should do specific tasks when call logOut()', async () => {
    const removeItemMock = jest.fn();
    const pushMock = jest.fn();
    const props = {
      cookieManager: {
        removeItem: removeItemMock,
      },
      router: {
        push: pushMock,
      },
    };
    const wrapper = mount(<HomeContainer {...props} />);

    await wrapper.instance().logOut();
    expect(removeItemMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/log-in');
  });
});
