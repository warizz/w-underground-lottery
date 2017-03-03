import React, { PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as LayoutActionCreators from '../actions/layout';
import * as DataActionCreators from '../actions/data';
import * as lib from '../constants/lib';
import * as commonStyles from '../constants/styles/common';
import * as customPropTypes from '../constants/custom-prop-type';
import * as config from '../config';
import Snackbar from '../components/snackbar';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1em',
  },
  cardContainer: {
    height: '90vh',
    overflow: 'auto',
  },
};

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      periods: [],
      hasAlert: false,
      alertMessage: '',
    };
    this.setList = this.setList.bind(this);
    this.setAlert = this.setAlert.bind(this);
  }
  componentDidMount() {
    this.props.setPageName('History');
    lib.getHistory(this.props.username, this.setList);
  }
  setList(periods) {
    this.setState({ periods });
  }
  setAlert(alertMessage) {
    this.setState({ hasAlert: true, alertMessage });
    setTimeout(() => this.setState({ hasAlert: false, alertMessage: '' }), 1000);
  }
  clone(bets) {
    return (e) => {
      e.preventDefault();
      const newBets = bets
        .map((bet) => {
          if (this.props.period.bets.find(currentBet => currentBet.number === bet.number)) return null;
          const newBet = Object.assign({}, bet);
          delete newBet._id;
          newBet.period = this.props.period.id;
          newBet.createdAt = new Date();
          newBet.username = this.props.username;
          return newBet;
        })
        .filter(a => a);
      if (newBets.length === 0) {
        this.setAlert('nothing to copy');
        return;
      }
      axios
        .put(config.betUrl, { bets: newBets })
        .then((res) => {
          if (res.status !== 200) {
            // TODO: error handling
          }
          lib.getLatestPeriod(this.props.username, this.props.setPeriod);
          this.setState({ editingBet: null });
          this.setAlert('copied!');
        });
    };
  }
  render() {
    const { alertMessage, hasAlert } = this.state;
    const periods = this.state.periods.filter(period => period.bets.length > 0);
    if (periods.length === 0) {
      return (
        <div style={commonStyles.placeholder}>{'no data'}</div>
      );
    }

    return (
      <div style={styles.base}>
        <div style={styles.cardContainer} className="col-sm-12 col-md-3">
          {periods.map(period => (
            <div key={period.id} className="col-xs-12" style={commonStyles.betCard}>
              <div>{moment(period.endDate).format('DD MMM YYYY')}</div>
              <ul>
                {period.bets
                  .map((bet) => {
                    const price1Label = bet.number.length > 2 ? ' เต็ง ' : ' บน ';
                    const price2Label = bet.number.length > 2 ? ' โต๊ด ' : ' ล่าง ';
                    const price3Label = ' ล่าง ';
                    let historyItem = `${bet.number} =`;
                    historyItem += bet.price1 ? `${price1Label}${bet.price1}` : '';
                    historyItem += bet.price2 ? `${price2Label}${bet.price2}` : '';
                    historyItem += bet.price3 ? `${price3Label}${bet.price3}` : '';
                    return (
                      <li key={`bet-it--${bet._id}`}>
                        {historyItem}
                      </li>
                    );
                  })
                }
              </ul>
              {this.props.period.open && (
                <button className="btn btn-primary btn-block" onClick={this.clone(period.bets)}>clone</button>
              )}
            </div>
            ))}
        </div>
        <Snackbar active={hasAlert} text={alertMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ period: state.data.period, username: state.user.username });
const mapDispatchToProps = dispatch => (bindActionCreators({ ...LayoutActionCreators, ...DataActionCreators }, dispatch));

HistoryPage.propTypes = {
  period: customPropTypes.periodShape,
  setPageName: PropTypes.func,
  setPeriod: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
