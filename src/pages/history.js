import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Card from '../components/card';
import './history.css';

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
    service.data.getHistory().then(res => this.setState({ history: res })).catch(this.handleError);
  }
  componentWillReceiveProps() {
    service.data.getHistory().then(res => this.setState({ history: res })).catch(this.handleError);
  }
  clone(currentPeriod, bets) {
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
        this.props.setAlert('nothing to clone');
        return;
      }
      this.props.setFetching(true);
      service.data.insertBets(currentPeriod.id, newBets).then(() => {
        service.data
          .getCurrentPeriod()
          .then((res) => {
            this.props.setCurrentPeriod(res);
            this.props.setFetching(false);
            this.props.setAlert('cloned');
          })
          .catch(this.handleError);
      });
    };
  }
  handleError(error) {
    const alertText = `${error.response.status}: ${error.response.statusText}`;
    this.props.setAlert(alertText);
    this.props.setFetching(false);
  }
  render() {
    const { currentPeriod = {} } = this.props;
    const history = this.state.history.filter((h) => {
      const { bets = [] } = h;
      return bets.length > 0;
    });
    return (
      <div className="history">
        <div className="bet-list">
          {history.length === 0 &&
            <Card>
              <div className="placeholder">{'you have no history here, make one!'}</div>
            </Card>}
          {history.length > 0 &&
            history.map(h => (
              <Card key={h.id}>
                <div className="title">{moment(h.endedAt).format('DD MMM YYYY')}</div>
                <div className="body">
                  <ul>
                    {h.bets.map((bet) => {
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
                    })}
                  </ul>
                </div>
                <div className="action">
                  {currentPeriod.isOpen && <button onClick={this.clone(currentPeriod, h.bets, service.data.insertBet)}>clone</button>}
                </div>
              </Card>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

const mapDispatchToProps = dispatch => ({
  setAlert: alert => dispatch(actions.layout.setAlert(alert)),
  setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
  setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
  setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
});

HistoryPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setAlert: PropTypes.func.isRequired,
  setCurrentPeriod: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
