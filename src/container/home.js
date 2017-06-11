import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/index';
import HomePage from '../pages/home';

export class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOpen: false,
      editingBet: null,
    };
    this.handleSaveBet = this.handleSaveBet.bind(this);
    this.handleDeleteBet = this.handleDeleteBet.bind(this);
    this.inputToggle = this.inputToggle.bind(this);
    this.setEditingBet = this.setEditingBet.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    this.props.setPageName('Home');
  }
  setEditingBet(editingBet) {
    this.inputToggle();
    this.setState({ editingBet });
    const editor = document.getElementById('bet-editor');
    editor.focus();
  }
  inputToggle() {
    this.setState({ editingBet: null, inputOpen: !this.state.inputOpen });
  }
  handleDeleteBet(id) {
    this.props.setFetching(true);
    return this.props.service.data.deleteBet(id).then(() =>
      this.props.service.data.getCurrentPeriod().then((res) => {
        this.props.setCurrentPeriod(res);
        this.props.setFetching(false);
        this.props.setAlert('deleted');
      }),
    );
  }
  handleSaveBet(bet) {
    const { currentPeriod } = this.props;

    if (!bet) {
      return Promise.reject(new Error('Invalid argument: bet is not defined'));
    }

    if (!currentPeriod.isOpen) {
      return Promise.reject(new Error('Invalid operation: current period is closed'));
    }

    let inputBet = currentPeriod.bets.find(item => item.number === bet.number);
    let actor;
    if (inputBet) {
      inputBet.price1 = 0;
      inputBet.price2 = 0;
      inputBet.price3 = 0;
      if (bet.price1) {
        inputBet.price1 = Number(bet.price1);
      }
      if (bet.price2) {
        inputBet.price2 = Number(bet.price2);
      }
      if (bet.price3) {
        inputBet.price3 = Number(bet.price3);
      }
      actor = this.props.service.data.updateBet;
    } else {
      inputBet = bet;
      inputBet.period = currentPeriod.id;
      actor = this.props.service.data.insertBet;
    }

    this.props.setFetching(true);
    return actor(inputBet).then(() =>
      this.props.service.data.getCurrentPeriod().then((res) => {
        this.props.setCurrentPeriod(res);
        this.props.setFetching(false);
        this.props.setAlert('Saved');
        this.setState({ editingBet: null });
      }),
    );
  }
  logOut() {
    return this.props.service.data.logOut().then(() => {
      this.props.cookieManager.removeItem(`fbat_${process.env.REACT_APP_FB_APP_ID}`);
      this.props.router.push('/log-in');
    });
  }
  render() {
    const { editingBet } = this.state;
    const { currentPeriod, user } = this.props;
    return (
      <HomePage
        currentPeriod={currentPeriod}
        user={user}
        logOut={this.logOut}
        handleSaveBet={this.handleSaveBet}
        handleDeleteBet={this.handleDeleteBet}
        editingBet={editingBet}
        inputToggle={this.inputToggle}
        setEditingBet={this.setEditingBet}
      />
    );
  }
}

HomeContainer.propTypes = {
  cookieManager: PropTypes.shape({
    removeItem: PropTypes.func,
  }),
  currentPeriod: PropTypes.shape({}),
  user: PropTypes.shape({}),
  setPageName: PropTypes.func,
  setFetching: PropTypes.func,
  setCurrentPeriod: PropTypes.func,
  setAlert: PropTypes.func,
  service: PropTypes.shape({
    data: PropTypes.shape({
      deleteBet: PropTypes.func,
      getCurrentPeriod: PropTypes.func,
      updateBet: PropTypes.func,
      insertBet: PropTypes.func,
      logOut: PropTypes.func,
    }),
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

HomeContainer.defaultProps = {
  cookieManager: {
    removeItem() {},
  },
  currentPeriod: {},
  user: {},
  setPageName() {},
  setFetching() {},
  setCurrentPeriod() {},
  setAlert() {},
  service: {
    data: {
      deleteBet: async () => {},
      getCurrentPeriod: async () => {},
      updateBet: async () => {},
      insertBet: async () => {},
      logOut: async () => {},
    },
  },
  router: {
    push() {},
  },
};

const mapStateToProps = state => ({
  currentPeriod: state.data.currentPeriod,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  setAlert: actions.layout.setAlert,
  setCurrentPeriod: actions.data.setCurrentPeriod,
  setFetching: actions.data.setFetching,
  setPageName: actions.layout.setPageName,
})(HomeContainer);
