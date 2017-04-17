import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Snackbar from '../components/snackbar';

const style = {
  bet: {
    container: {
      border: '1px solid #b8bfc3',
      borderRadius: '5px',
      overflow: 'hidden',
      maxWidth: '300px',
      width: '300px',
      margin: '0 0 10px 0',
    },
    title: {
      backgroundColor: 'white',
      borderBottom: '1px solid #b8bfc3',
      padding: '10px',
      fontWeight: 'bold',
    },
    body: {
      backgroundColor: 'white',
      padding: '10px',
    },
    action: {
      container: {
        backgroundColor: '#F6F7F9',
        borderTop: '1px solid #b8bfc3',
      },
      button: {
        clone: {
          backgroundColor: 'transparent',
          border: 'none',
          fontWeight: 'bold',
          padding: '10px',
          width: '100%',
          color: 'rgb(148, 146, 146)',
        },
      },
    },
  },
};

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      hasAlert: false,
      history: [],
    };
    this.handleError = this.handleError.bind(this);
  }
  componentDidMount() {
    this.props.setPageName('History');
  }
  componentWillReceiveProps() {
    service
      .data
      .getHistory()
      .then(res => this.setState({ history: res }))
      .catch(this.handleError);
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
          service
            .data
            .getCurrentPeriod()
            .then((res) => {
              self.props.setCurrentPeriod(res);
              self.props.setFetching(false);
              this.setState({ alertText: 'cloned', hasAlert: true });
            })
            .catch(this.handleError);
        });
    };
  }
  handleError(error) {
    const alertText = `${error.response.status}: ${error.response.statusText}`;
    this.setAlert(alertText);
    this.props.setFetching(false);
  }
  render() {
    const { alertText, hasAlert } = this.state;
    const { currentPeriod } = this.props;
    if (!currentPeriod) return null;
    const history = this.state.history.filter((h) => {
      const { bets = [] } = h;
      return bets.length > 0;
    });

    if (history.length === 0) {
      return (
        <div style={constants.elementStyle.placeholder}>{'no data'}</div>
      );
    }

    return (
      <div>
        <Snackbar active={hasAlert} text={alertText} timer={1000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
        <div>
          {history.map(h => (
            <div key={h.id} style={style.bet.container}>
              <div style={style.bet.title}>{moment(h.endedAt).format('DD MMM YYYY')}</div>
              <div style={style.bet.body}>
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
              </div>
              <div style={style.bet.action.container}>
                {currentPeriod.isOpen && (
                  <button style={style.bet.action.button.clone} onClick={this.clone(currentPeriod, h.bets, service.data.insertBet)}>clone</button>
                )}
              </div>
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
  }
);

const mapDispatchToProps = dispatch => (
  {
    setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

HistoryPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
