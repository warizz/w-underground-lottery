import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import customPropTypes from '../constants/custom-prop-type';
import actions from '../actions/index';
import FAB from '../components/fab';
import * as commonStyles from '../constants/styles/common';
import * as lib from '../constants/lib';
import service from '../services/index';

const styles = {
  base: {
    marginTop: '1em',
    ...commonStyles.flexContainerColumnCenter,
  },
  paidItem: {
    textDecoration: 'line-through',
  },
};

class SummaryPage extends React.Component {
  static copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.textContent = document.getElementById('for-clipboard').innerText;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('copied to clipboard');
  }
  constructor(props) {
    super(props);
    this.state = {
      period: '',
      processingUser: '',
    };
    this.setPeriod = this.setPeriod.bind(this);
    // this.setPaid = this.setPaid.bind(this);
  }
  componentDidMount() {
    // if username not in admin list, go back to index
    // if (config.admins.indexOf(this.props.username) === -1) {
    //   this.props.router.push('/');
    // }

    this.props.setPageName('Bet list');
    lib.getSummary(this.setPeriod);
  }
  setPeriod(period) {
    this.setState({ period });
  }
  render() {
    const { period } = this.props;
    console.log(period);
    if (!period) {
      return null;
    }
    const { result } = period;
    if (!this.state.period || !this.state.period.bets || this.state.period.bets.length === 0) {
      return (
        <div style={commonStyles.placeholder}>{'no data'}</div>
      );
    }

    // this will get list of all buyers
    const temp = [];
    period.bets.map((a) => {
      if (temp.indexOf(a.username) === -1) temp.push(a.username);
      return a;
    });

    // this will group bet of each buyer
    const buyers = temp.map(buyer => ({
      name: buyer,
      bets: period.bets.filter(betItem => betItem.username === buyer),
    }));

    const total = period.bets
      .map(service.calculation.calculateTotal(result))
      .reduce((a, b) => a + b, 0);

    return (
      <div style={styles.base}>
        <div id="for-clipboard" className="col-sm-12 col-md-3" style={{ height: '90vh', overflow: 'auto' }}>
          <div style={{ fontWeight: 'bold', margin: '0 0 1em 0' }}>{`Total: ${total}`}</div>
          {buyers.map((buyer) => {
            const sumPrice = buyer.bets
              .map(service.calculation.calculateTotal(result))
              .reduce((a, b) => a + b);
            // check if this user paid or not
            const paid = buyer.bets
              .map(bet => bet.paid)
              .includes(true);
            const itemStyle = paid ? styles.paidItem : {};
            return (
              <div key={buyer.name} className="col-xs-12 col-md-12" style={commonStyles.betCard}>
                <div><b>{buyer.name}</b></div>
                <ul>
                  {buyer.bets
                    .map((betItem) => {
                      const rewardCallback = (number, price, reward) => `ถูก เต็ง [${number}] ${price} x ${reward} = ${price * reward} บาท`;
                      const reward = service.calculation.checkReward(result, rewardCallback)(betItem);
                      if (reward) {
                        const winningItemStyle = { ...itemStyle, fontWeight: 'bold', color: '#B71C1C' };
                        return (
                          <li key={`bet-it--${betItem.id}`} style={winningItemStyle}>
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
                        <li key={`bet-it--${betItem.id}`} style={itemStyle}>
                          {bet}
                        </li>
                      );
                    }
                  )}
                </ul>
                <div>
                  {!period.open && this.state.processingUser === buyer.name && <span style={{ fontWeight: 'bold' }}>...</span>}
                  {!period.open && this.state.processingUser !== buyer.name && (
                    <label htmlFor={`paid-check-for-${buyer.name}`}>
                      <input
                        checked={buyer.bets.map(bet => bet.paid).includes(true)}
                        id={`paid-check-for-${buyer.name}`}
                        onChange={() => service.data.setPaid(period.id, buyer.bets, !paid)}
                        style={{ marginRight: '1em' }}
                        type="checkbox"
                      />
                      {paid ? 'จ่ายแล้ว' : `ต้องจ่ายทั้งหมด: ${sumPrice}`}</label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <FAB active onClick={SummaryPage.copyToClipboard}>
          <i className="material-icons">content_copy</i>
        </FAB>
      </div>
    );
  }
}

const mapStateToProps = state => ({ period: state.data.period, username: state.user.username });

const mapDispatchToProps = dispatch => (
  {
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

SummaryPage.propTypes = {
  period: customPropTypes.periodShape,
  router: routerShape,
  setPageName: PropTypes.func,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
