import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import Card from '../components/card';
import './summary.css';

const SummaryPage = (props) => {
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
          <div id="placeholder" className="body center">{'no period'}</div>
        </Card>
      </div>
    );
  }

  if (bets.length === 0) {
    return (
      <div className="summary-component">
        <Card>
          <div id="placeholder" className="body center">{'no one bet yet'}</div>
        </Card>
      </div>
    );
  }

  // this will get list of all buyers
  const temp = [];
  bets.map((a) => {
    if (temp.indexOf(a.createdBy.name) === -1) {
      temp.push(a.createdBy.name);
    }
    return a;
  });

  // this will group bet of each buyer
  const buyers = temp.map(buyer => ({
    id: bets.filter(betItem => betItem.createdBy.name === buyer)[0].createdBy.id,
    bets: bets.filter(betItem => betItem.createdBy.name === buyer),
    name: buyer,
  }));

  const result = currentPeriod.result;
  const total = bets.map(service.calculation.calculateTotal(result)).reduce((a, b) => a + b, 0);

  return (
    <div className="summary-component">
      <Card>
        <div id="period-endedAt" className="title">
          {moment(currentPeriod.endedAt).format('D MMMM YYYY')}
        </div>
        <div className="body">
          {`total: ${total} ฿`}
        </div>
        <div className="action">
          <button id="copy-to-clipboard" onClick={() => copyToClipboard()}>copy to clipboard</button>
        </div>
      </Card>
      <div id="for-clipboard">
        {buyers.map((buyer) => {
          const sumPrice = buyer.bets.map(service.calculation.calculateTotal(result)).reduce((a, b) => a + b);
          // check if this user paid or not
          const paid = buyer.bets.map(bet => bet.isPaid).includes(true);
          return (
            <Card key={buyer.name}>
              <div className="title">{buyer.name}</div>
              <div className="body">
                <ul>
                  {buyer.bets.map((betItem) => {
                    let className = 'bet';

                    if (paid) {
                      className += ' paid';
                    }

                    const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
                    const reward = service.calculation.checkReward(result, rewardCallback)(betItem);

                    if (reward) {
                      className += ' win';

                      return (
                        <li id={`bet-item-${betItem.id}-reward`} key={`bet-it--${betItem.id}`} className={className}>
                          {reward}
                        </li>
                      );
                    }

                    const { number, price1, price2, price3 } = betItem;

                    // generate label for each prices
                    let price1Label;
                    let price2Label;
                    const price3Label = ' ล่าง ';
                    if (number.length === 3) {
                      price1Label = ' เต็ง ';
                      price2Label = ' โต๊ด ';
                    } else {
                      price1Label = ' บน ';
                      price2Label = ' ล่าง ';
                    }

                    // generate label for each bet number
                    let bet = `${number} =`;
                    if (price1) {
                      bet += `${price1Label}${betItem.price1}`;
                    }
                    if (price2) {
                      bet += `${price2Label}${betItem.price2}`;
                    }
                    if (price3) {
                      bet += `${price3Label}${betItem.price3}`;
                    }

                    const id = `bet-it--${betItem.id}`;

                    return (
                      <li id={id} key={id} className={className}>
                        {bet}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="action">
                {!currentPeriod.isOpen && paying === buyer.name && <span style={{ fontWeight: 'bold' }}>...</span>}
                {!currentPeriod.isOpen &&
                  paying !== buyer.name &&
                  <label htmlFor={`paid-check-for-${buyer.name}`}>
                    <input
                      checked={buyer.bets.map(bet => bet.isPaid).includes(true)}
                      id={`paid-check-for-${buyer.name}`}
                      onChange={setPaid(currentPeriod.id, buyer.id, !paid)}
                      style={{ marginRight: '1em' }}
                      type="checkbox"
                    />
                    {paid ? 'จ่ายแล้ว' : `ต้องจ่ายทั้งหมด: ${sumPrice} ฿`}
                  </label>}
              </div>
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
    }),
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
