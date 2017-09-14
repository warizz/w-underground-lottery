import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import Card from '../components/Card';
import TextBuilder from '../helper/text-builder';
import './summary.css';

const SummaryPage = props => {
  const { currentPeriod, bets, paying, setPaid, service } = props;

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.textContent = document.getElementById('for-clipboard').innerText;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    props.setAlert('copied to clipboard');
  };

  if (!currentPeriod) {
    return (
      <div className="summary-component">
        <Card>
          <div id="placeholder" className="body center">
            {'no period'}
          </div>
        </Card>
      </div>
    );
  }

  if (bets.length === 0) {
    return (
      <div className="summary-component">
        <Card>
          <div id="placeholder" className="body center">
            {'no one bet yet'}
          </div>
        </Card>
      </div>
    );
  }

  // this will get list of all buyers
  const temp = [];
  bets.map(a => {
    if (temp.indexOf(a.createdBy.name) === -1) {
      temp.push(a.createdBy.name);
    }
    return a;
  });

  // this will group bet of each buyer
  const buyers = temp.map(buyer => ({
    id: bets.filter(betItem => betItem.createdBy.name === buyer)[0].createdBy
      .id,
    bets: bets.filter(betItem => betItem.createdBy.name === buyer),
    name: buyer,
  }));

  const result = currentPeriod.result;
  const total = bets
    .map(service.calculation.calculateTotal(result))
    .reduce((a, b) => a + b, 0);

  return (
    <div className="summary-component">
      <Card>
        <div id="period-endedAt" className="title">
          {moment(currentPeriod.endedAt).format('D MMMM YYYY')}
        </div>
        <div className="body">{`total: ${total} ฿`}</div>
        <div className="action">
          <button id="copy-to-clipboard" onClick={() => copyToClipboard()}>
            copy to clipboard
          </button>
        </div>
      </Card>
      <div id="for-clipboard">
        {buyers.map(buyer => {
          const sumPrice = buyer.bets
            .map(service.calculation.calculateTotal(result))
            .reduce((a, b) => a + b);
          // check if this user paid or not
          const paid = buyer.bets.map(bet => bet.isPaid).includes(true);

          let paymentStatusElement = null;
          // Can toggle payment status only when period closed
          if (!currentPeriod.isOpen) {
            // block clicking while processing payment
            if (paying === buyer.name) {
              paymentStatusElement = (
                <span
                  className="payment-status-processing"
                  style={{ fontWeight: 'bold' }}
                >
                  ...
                </span>
              );
            } else {
              let statusLabel;
              if (paid) {
                statusLabel = 'จ่ายแล้ว';
              } else {
                statusLabel = `ต้องจ่ายทั้งหมด: ${sumPrice} ฿`;
              }

              const isPaid = buyer.bets.map(bet => bet.isPaid).includes(true);

              paymentStatusElement = (
                <label
                  id={`payment-status-for-${buyer.name}`}
                  htmlFor={`paid-check-for-${buyer.name}`}
                >
                  <input
                    checked={isPaid}
                    id={`paid-check-for-${buyer.name}`}
                    onChange={setPaid(currentPeriod.id, buyer.id, !paid)}
                    style={{ marginRight: '1em' }}
                    type="checkbox"
                  />
                  {statusLabel}
                </label>
              );
            }
          }

          return (
            <Card key={buyer.name} className={`buyer-${buyer.name}`}>
              <div className="title">{buyer.name}</div>
              <div className="body">
                <ul>
                  {buyer.bets.map(betItem => {
                    let className = 'bet';

                    if (paid) {
                      className += ' paid';
                    }

                    const rewardCallback = (
                      number,
                      price,
                      reward,
                      rewardType
                    ) =>
                      `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price *
                        reward} บาท`;
                    const reward = service.calculation.checkReward(
                      result,
                      rewardCallback
                    )(betItem);

                    if (reward) {
                      className += ' win';

                      return (
                        <li
                          id={`bet-item-${betItem.id}-reward`}
                          key={`bet-it--${betItem.id}`}
                          className={className}
                        >
                          {reward}
                        </li>
                      );
                    }

                    const { number, price1, price2, price3 } = betItem;
                    const bet = TextBuilder.buildTicketSummary(
                      number,
                      price1,
                      price2,
                      price3
                    );
                    const id = `bet-it--${betItem.id}`;

                    return (
                      <li id={id} key={id} className={className}>
                        {bet}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="action">{paymentStatusElement}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

SummaryPage.propTypes = {
  bets: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      price1: PropTypes.number,
      price2: PropTypes.number,
      price3: PropTypes.number,
      isPaid: PropTypes.bool.isRequired,
      createdBy: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
    endedAt: PropTypes.instanceOf(Date),
    isOpen: PropTypes.bool,
    result: PropTypes.shape({}),
  }),
  paying: PropTypes.bool,
  setPaid: PropTypes.func,
  service: PropTypes.shape({
    calculation: PropTypes.shape({
      calculateTotal: PropTypes.func,
      checkReward: PropTypes.func,
    }),
  }),
};

SummaryPage.defaultProps = {
  bets: [],
  currentPeriod: null,
  copyToClipboard() {},
  paying: false,
  setPaid() {},
  service: {
    calculation: {
      calculateTotal: () => () => {},
      checkReward: () => () => {},
    },
  },
};

export default SummaryPage;
