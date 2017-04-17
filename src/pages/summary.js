import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../actions/index';
import FAB from '../components/fab';
import constants from '../constants/index';
import service from '../services/index';
import Snackbar from '../components/snackbar';

const style = {
  summary: {
    container: {
      backgroundColor: 'white',
      border: '1px solid #b8bfc3',
      borderRadius: '5px',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    item: {
      base: {
        padding: '10px',
      },
      date: {
        borderBottom: '1px solid #b8bfc3',
        textAlign: 'center',
      },
    },
  },
  list: {
    item: {
      container: {
        position: 'relative',
        width: '300px',
        maxWidth: '300px',
        border: '1px solid #b8bfc3',
        borderRadius: '5px',
        overflow: 'hidden',
      },
      title: {
        borderBottom: '1px solid #b8bfc3',
        padding: '10px',
        backgroundColor: 'white',
      },
      body: {
        backgroundColor: 'white',
        padding: '10px',
      },
    },
  },
  action: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(246, 247, 249)',
    },
    button: {
      width: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      borderTop: '1px solid rgb(184, 191, 195)',
      padding: '10px',
      fontWeight: 'bold',
      color: 'rgb(148, 146, 146)',
      cursor: 'pointer',
    },
  },
};

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
    const { currentPeriod } = this.props;
    const { alertText, hasAlert, summary } = this.state;
    if (!summary) return null;
    const { bets } = summary;
    const result = currentPeriod.result;
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
      <div>
        <div>
          <div style={style.summary.container}>
            <div style={{ ...style.summary.item.base, ...style.summary.item.date }}>
              {moment(currentPeriod.endedAt).format('D MMMM YYYY')}
            </div>
            <div style={style.summary.item.base}>{`total: ${total} ฿`}</div>
            <div style={style.action.container}>
              <button style={style.action.button} onClick={this.copyToClipboard}>copy to clipboard</button>
            </div>
          </div>
          <div id="for-clipboard">
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
                <div key={buyer.name} style={style.list.item.container}>
                  <div style={style.list.item.title}>{buyer.name}</div>
                  <div style={style.list.item.body}>
                    <ul>
                      {buyer.bets
                        .map((betItem) => {
                          const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
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
                  </div>
                  <div style={style.action.container}>
                    {!currentPeriod.isOpen && this.state.processingUser === buyer.name && <span style={{ fontWeight: 'bold' }}>...</span>}
                    {!currentPeriod.isOpen && this.state.processingUser !== buyer.name && (
                      <label htmlFor={`paid-check-for-${buyer.name}`} style={style.action.button}>
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
                </div>
              );
            })}
          </div>
        </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
