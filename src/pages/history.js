import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import Card from '../components/card';
import './history.css';

const HistoryPage = (props) => {
  const { clonable, clone, history } = props;

  const filteredHistory = history.filter((h) => {
    // assign empty array to prevent undefined.length error
    const { bets = [] } = h;
    return bets.length > 0;
  });

  const list = filteredHistory.length > 0
    ? filteredHistory.map(h =>
      (<Card key={h.id}>
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
                <li className={`bet-item-${bet.id}`} key={`bet-it--${bet.id}`}>
                  {historyItem}
                </li>
              );
            })}
          </ul>
        </div>
        {clonable &&
        <div className="action">
          <button id="clone" onClick={() => clone(h.bets)}>clone</button>
        </div>}
      </Card>),
      )
    : (<Card>
      <div className="placeholder">{'you have no history here, make one!'}</div>
    </Card>);

  return (
    <div className="history">
      <div className="bet-list">
        {list}
      </div>
    </div>
  );
};

HistoryPage.propTypes = {
  clonable: PropTypes.bool,
  clone: PropTypes.func,
  history: PropTypes.arrayOf(PropTypes.shape({})),
};

HistoryPage.defaultProps = {
  clonable: false,
  clone() {},
  history: [],
};

export default HistoryPage;
