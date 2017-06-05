import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Card from '../components/card';
import './summary.css';

class SummaryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: '',
      processingUser: '',
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  componentDidMount() {
    if (this.props.currentPeriod) {
      service
        .data
        .getSummary(this.props.currentPeriod.id)
        .then((res) => {
          this.setState({ summary: res });
        });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPeriod) {
      service
        .data
        .getSummary(nextProps.currentPeriod.id)
        .then((res) => {
          this.setState({ summary: res });
        });
    }
  }
  setPaid(periodId, userId, isPaid) {
    const self = this;
    return () => {
      self.props.setFetching(true);
      service
        .data
        .updateBets(periodId, userId, { isPaid })
        .then(() => {
          service
            .data
            .getSummary(periodId)
            .then((res) => {
              this.setState({ summary: res });
              self.props.setFetching(false);
            })
            .catch(this.handleError);
        })
        .catch(this.handleError);
    };
  }
  copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.textContent = document.getElementById('for-clipboard').innerText;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.props.setAlert('copied to clipboard');
  }
  handleError(error) {
    const alertText = `${error.response.status}: ${error.response.statusText}`;
    this.props.setAlert(alertText);
    this.props.setFetching(false);
  }
  render() {
    const { currentPeriod } = this.props;
    const { summary } = this.state;
    if (!summary) return null;
    const { bets } = summary;
    const result = currentPeriod.result;
    if (!bets || bets.length === 0) {
      return (
        <div className="summary-component">
          <Card>
            <div className="body center">{'no one bet yet'}</div>
          </Card>
        </div>
      );
    }

    // this will get list of all buyers
    const temp = [];
    bets.map((a) => {
      if (temp.indexOf(a.createdBy.name) === -1) temp.push(a.createdBy.name);
      return a;
    });

    // this will group bet of each buyer
    const buyers = temp.map(buyer => ({
      id: bets.filter(betItem => betItem.createdBy.name === buyer)[0].createdBy.id,
      bets: bets.filter(betItem => betItem.createdBy.name === buyer),
      name: buyer,
    }));

    const total = bets
      .map(service.calculation.calculateTotal(result))
      .reduce((a, b) => a + b, 0);

    return (
      <div className="summary-component">
        <Card>
          <div className="title">
            {moment(currentPeriod.endedAt).format('D MMMM YYYY')}
          </div>
          <div className="body">
            {`total: ${total} ฿`}
          </div>
          <div className="action">
            <button onClick={this.copyToClipboard}>copy to clipboard</button>
          </div>
        </Card>
        <div id="for-clipboard">
          {buyers.map((buyer) => {
            const sumPrice = buyer.bets
              .map(service.calculation.calculateTotal(result))
              .reduce((a, b) => a + b);
            // check if this user paid or not
            const paid = buyer.bets
              .map(bet => bet.isPaid)
              .includes(true);
            // const itemStyle = paid ? styles.paidItem : {};
            return (
              <Card key={buyer.name}>
                <div className="title">{buyer.name}</div>
                <div className="body">
                  <ul>
                    {buyer.bets
                      .map((betItem) => {
                        const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
                        const reward = service.calculation.checkReward(result, rewardCallback)(betItem);
                        if (reward) {
                          // const winningItemStyle = { ...itemStyle, fontWeight: 'bold', color: '#B71C1C' };
                          return (
                            <li key={`bet-it--${betItem.id}`} className={`bet win${paid ? ' paid' : ''}`}>
                              {reward}
                            </li>
                          );
                        }
                        const price1Label = betItem.number.length > 2 ? ' เต็ง ' : ' บน ';
                        const price2Label = betItem.number.length > 2 ? ' โต๊ด ' : ' ล่าง ';
                        const price3Label = ' ล่าง ';
                        let bet = `${betItem.number} =`;
                        bet += betItem.price1 ? `${price1Label}${betItem.price1}` : '';
                        bet += betItem.price2 ? `${price2Label}${betItem.price2}` : '';
                        bet += betItem.price3 ? `${price3Label}${betItem.price3}` : '';
                        return (
                          <li key={`bet-it--${betItem.id}`} className={`bet${paid ? ' paid' : ''}`}>
                            {bet}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
                <div className="action">
                  {!currentPeriod.isOpen && this.state.processingUser === buyer.name && <span style={{ fontWeight: 'bold' }}>...</span>}
                  {!currentPeriod.isOpen && this.state.processingUser !== buyer.name && (
                    <label htmlFor={`paid-check-for-${buyer.name}`}>
                      <input
                        checked={buyer.bets.map(bet => bet.isPaid).includes(true)}
                        id={`paid-check-for-${buyer.name}`}
                        onChange={this.setPaid(currentPeriod.id, buyer.id, !paid)}
                        style={{ marginRight: '1em' }}
                        type="checkbox"
                      />
                      {paid ? 'จ่ายแล้ว' : `ต้องจ่ายทั้งหมด: ${sumPrice} ฿`}</label>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

const mapDispatchToProps = dispatch => (
  {
    setAlert: alert => dispatch(actions.layout.setAlert(alert)),
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
  }
);

SummaryPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setAlert: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
