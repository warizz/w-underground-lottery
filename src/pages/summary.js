import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index';
import FAB from '../components/fab';
import constants from '../constants/index';
import service from '../services/index';
import Snackbar from '../components/snackbar';

const styles = {
  base: {
    marginTop: '1em',
    ...constants.elementStyle.flexContainerColumnCenter,
  },
  paidItem: {
    textDecoration: 'line-through',
  },
};

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
    this.props.setPageName('Summary');
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
  setAlert(alertText) {
    return () => {
      this.setState({
        alertText,
        fetching: false,
        hasAlert: true,
      });
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
    this.setAlert('copied to clipboard')();
  }
  handleError(error) {
    const alertText = `${error.response.status}: ${error.response.statusText}`;
    this.setAlert(alertText);
    this.props.setFetching(false);
  }
  render() {
    const { currentPeriod, themeColor } = this.props;
    const { alertText, hasAlert, summary } = this.state;
    if (!summary) return null;
    const { bets, result } = summary;
    if (!bets || bets.length === 0) {
      return (
        <div style={constants.elementStyle.placeholder}>{'no data'}</div>
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
      <div style={styles.base}>
        <div id="for-clipboard" className="col-xs-12 col-sm-6 col-md-4" style={{ height: '90vh', overflow: 'auto' }}>
          <div style={{ fontWeight: 'bold', margin: '0 0 1em 0' }}>{`Total: ${total}`}</div>
          {buyers.map((buyer) => {
            const sumPrice = buyer.bets
              .map(service.calculation.calculateTotal(result))
              .reduce((a, b) => a + b);
            // check if this user paid or not
            const paid = buyer.bets
              .map(bet => bet.isPaid)
              .includes(true);
            const itemStyle = paid ? styles.paidItem : {};
            return (
              <div key={buyer.name} className="col-xs-12 col-md-12" style={constants.elementStyle.betCard}>
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
                      {paid ? 'จ่ายแล้ว' : `ต้องจ่ายทั้งหมด: ${sumPrice}`}</label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <FAB active onClick={this.copyToClipboard} themeColor={themeColor}>
          <i className="material-icons">content_copy</i>
        </FAB>
        <Snackbar active={hasAlert} text={alertText} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

const mapDispatchToProps = dispatch => (
  {
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

SummaryPage.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
  themeColor: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
