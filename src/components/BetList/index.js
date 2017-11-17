// @flow
import React from 'react';
import type { Bet } from '../../type/Bet';
import BetItem from './BetItem';
import Card from '../Card';

type Props = {
  bets: Bet[],
  calculateTicketPrice: (bet: Bet) => number,
  deleteHandler: (id: string) => void,
  editHandler: (bet: Bet) => void,
  periodEndedAt: string,
  isEditable: boolean
};

const BetList = (props: Props) => {
  const {
    bets,
    calculateTicketPrice,
    deleteHandler,
    editHandler,
    periodEndedAt,
    isEditable,
  } = props;
  let total = 0;

  if (bets.length > 0) {
    total = bets.map(calculateTicketPrice).reduce((a, b) => a + b, 0);
  }

  return (
    <div className='bet-list-component'>
      <Card>
        <div className='title'>{periodEndedAt}</div>
        <div className='body'>
          <b>{`total: ${total} ฿`}</b>
        </div>
      </Card>
      <div className='list'>
        {bets.length > 0 &&
          bets
            .sort((a, b) => {
              if (a.createdAt > b.createdAt) {
                return -1;
              }
              if (a.createdAt < b.createdAt) {
                return 1;
              }
              return 0;
            })
            .map(bet => (
              <BetItem
                bet={bet}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                isEditable={isEditable}
                key={bet.id}
              />
            ))}
      </div>
    </div>
  );
};

BetList.defaultProps = {
  bets: [],
  calculateTicketPrice() {},
  deleteHandler() {},
  editHandler() {},
  isEditable: false,
};

export default BetList;
