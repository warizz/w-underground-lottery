import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
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
      history: [],
    };
  }
  componentDidMount() {
    this.props.setPageName('History');
  }
  componentWillReceiveProps() {
    service.data.getHistory().then((res) => {
      this.setState({ history: res });
    });
  }
  clone(currentPeriod, bets) {
    const self = this;
    return (e) => {
      e.preventDefault();
      const newBets = bets
        .map((bet) => {
          if (currentPeriod.isOpen && currentPeriod.bets.find(currentBet => currentBet.number === bet.number)) return null;
          const newBet = Object.assign({}, bet);
          delete newBet._id;
          return newBet;
        })
        .filter(a => a);
      if (newBets.length === 0) {
        self.props.setAlert('nothing to clone');
        return;
      }
      self.props.setFetching(true);
      service.data
        .insertBets(currentPeriod.id, newBets)
        .then(() => {
          service.data.getCurrentPeriod(
          () => {},
          (res) => {
            self.props.setCurrentPeriod(res);
            self.props.setFetching(false);
            self.props.setAlert('cloned');
          });
        });
    };
  }
  render() {
    const { currentPeriod } = this.props;
    if (!currentPeriod) return null;
    const history = this.state.history.filter((h) => {
      const { bets = [] } = h;
      return bets.length > 0 && h.id !== currentPeriod.id;
    });

    if (history.length === 0) {
      return (
        <div style={constants.elementStyle.placeholder}>{'no data'}</div>
      );
    }

    return (
      <div style={styles.base}>
        <div style={styles.cardContainer} className="col-sm-12 col-md-3">
          {history.map(h => (
            <div key={h.id} className="col-xs-12" style={constants.elementStyle.betCard}>
              <div>{moment(h.endedAt).format('DD MMM YYYY')}</div>
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
              {currentPeriod.isOpen && (
                <button className="btn btn-primary btn-block" onClick={this.clone(currentPeriod, h.bets, service.data.insertBet)}>clone</button>
              )}
            </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    currentPeriod: state.data.currentPeriod,
    username: state.user.username,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setAlert: alert => dispatch(actions.layout.setAlert(alert)),
    setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

HistoryPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  history: PropTypes.arrayOf(constants.customPropType.periodShape),
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
