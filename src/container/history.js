/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/index';
import HistoryPage from '../pages/history';

export class HistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    this.props.setPageName('History');
    return this.props.service.data
      .getHistory()
      .then(res => this.setState({ history: res }));
  }

  componentWillReceiveProps() {
    return this.props.service.data
      .getHistory()
      .then(res => this.setState({ history: res }));
  }

  clone(currentPeriod) {
    return bets => {
      if (!currentPeriod.isOpen) {
        return this.props.setAlert('period is closed');
      }

      const newBets = bets
        .map(bet => {
          // if cloning bet have same number as current period's bet, skip it.
          const numberAlreadyExists = currentPeriod.bets.find(
            currentBet => currentBet.number === bet.number
          );
          if (numberAlreadyExists) {
            return null;
          }

          return bet;
        })
        // this will get rid of undefined element
        .filter(a => a);

      if (newBets.length === 0) {
        return this.props.setAlert('nothing to clone');
      }

      this.props.setFetching(true);
      return this.props.service.data
        .insertBets(currentPeriod.id, newBets)
        .then(() => {
          this.props.service.data.getCurrentPeriod().then(res => {
            this.props.setCurrentPeriod(res);
            this.props.setFetching(false);
            this.props.setAlert('cloned');
          });
        });
    };
  }
  render() {
    const props = {
      clonable: this.props.currentPeriod.isOpen,
      clone: this.clone(this.props.currentPeriod),
      history: this.state.history,
    };
    return <HistoryPage {...props} />;
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

HistoryContainer.propTypes = {
  currentPeriod: PropTypes.shape({
    isOpen: PropTypes.bool,
  }),
  service: PropTypes.shape({
    data: PropTypes.shape({
      getHistory: PropTypes.func,
      getCurrentPeriod: PropTypes.func,
      insertBets: PropTypes.func,
    }),
  }),
  setAlert: PropTypes.func.isRequired,
  setCurrentPeriod: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
};

HistoryContainer.defaultProps = {
  currentPeriod: {},
  setAlert() {},
  setCurrentPeriod() {},
  setFetching() {},
  setPageName() {},
  service: {
    data: {
      getHistory: async () => {},
      getCurrentPeriod: async () => {},
      insertBets: async () => {},
    },
  },
};

export default connect(mapStateToProps, {
  setAlert: actions.layout.setAlert,
  setCurrentPeriod: actions.data.setCurrentPeriod,
  setFetching: actions.data.setFetching,
  setPageName: actions.layout.setPageName,
})(HistoryContainer);
