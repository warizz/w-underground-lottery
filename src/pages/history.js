import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import Snackbar from '../components/snackbar';
import service from '../services/index';

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
    // lib.getHistory(this.props.username, this.setList);
  }
  setList(periods) {
    this.setState({ periods });
  }
  setAlert(alertMessage) {
    this.setState({ hasAlert: true, alertMessage });
    setTimeout(() => this.setState({ hasAlert: false, alertMessage: '' }), 1000);
  }
  clone(currentPeriod, username, bets, insertCallback) {
    return (e) => {
      e.preventDefault();
      const newBets = bets
        .map((bet) => {
          if (currentPeriod.bets.find(currentBet => currentBet.number === bet.number)) return null;
          const newBet = Object.assign({}, bet);
          delete newBet._id;
          newBet.period = currentPeriod.id;
          newBet.createdAt = new Date();
          newBet.username = username;
          return newBet;
        })
        .filter(a => a);
      if (newBets.length === 0) {
        this.setAlert('nothing to copy');
        return;
      }
      bets.forEach((a) => {
        insertCallback(currentPeriod.id, a);
      });
    };
  }
  render() {
    const { periods, username } = this.props;
    const history = periods.map((a) => {
      const updated = Object.assign({}, a);
      updated.bets = updated.bets.filter(b => b.username === username);
      return updated;
    });
    const { alertMessage, hasAlert } = this.state;
    if (periods.length === 0) {
      return (
        <div style={constants.elementStyle.placeholder}>{'no data'}</div>
      );
    }

    return (
      <div style={styles.base}>
        <div style={styles.cardContainer} className="col-sm-12 col-md-3">
          {history.map(h => (
            <div key={h.id} className="col-xs-12" style={constants.elementStyle.betCard}>
              <div>{moment(h.endDate).format('DD MMM YYYY')}</div>
              <ul>
                {h.bets
                  .map((bet) => {
                    const price1Label = bet.number.length > 2 ? ' เต็ง ' : ' บน ';
                    const price2Label = bet.number.length > 2 ? ' โต๊ด ' : ' ล่าง ';
                    const price3Label = ' ล่าง ';
                    let historyItem = `${bet.number} =`;
                    historyItem += bet.price1 ? `${price1Label}${bet.price1}` : '';
                    historyItem += bet.price2 ? `${price2Label}${bet.price2}` : '';
                    historyItem += bet.price3 ? `${price3Label}${bet.price3}` : '';
                    return (
                      <li key={`bet-it--${bet.id}`}>
                        {historyItem}
                      </li>
                    );
                  })
                }
              </ul>
              {h.open && (
                <button className="btn btn-primary btn-block" onClick={this.clone(h, username, h.bets, service.data.insertBet)}>clone</button>
              )}
            </div>
            ))}
        </div>
        <Snackbar active={hasAlert} text={alertMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    period: state.data.period,
    username: state.user.username,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

HistoryPage.propTypes = {
  periods: PropTypes.arrayOf(constants.customPropType.periodShape),
  setPageName: PropTypes.func,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
