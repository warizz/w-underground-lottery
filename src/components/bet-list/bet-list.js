import React from 'react';
import { PropTypes } from 'prop-types';
import constants from '../../constants/index';
import BetItem from './bet-item';
import Card from '../card';
import './bet-list.css';

const BetList = (props) => {
  const { bets, calculator, deleteHandler, editHandler, periodEndedAt, isEditable } = props;
  let total = 0;

  if (bets.length > 0) {
    total = bets.map(calculator.calculateTicketPrice).reduce((a, b) => a + b, 0);
  }
  return (
    <div className="bet-list">
      <Card>
        <div className="title">{periodEndedAt}</div>
        <div className="body"><b>{`total: ${total} ฿`}</b></div>
      </Card>
      <div className="list">
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
            .map(bet => <BetItem key={bet.id} bet={bet} deleteHandler={deleteHandler} editHandler={editHandler} isEditable={isEditable} />)}
      </div>
    </div>
  );
};

BetList.propTypes = {
  calculator: PropTypes.shape({
    calculateTicketPrice: PropTypes.func,
  }),
  deleteHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func.isRequired,
  bets: PropTypes.arrayOf(constants.customPropType.betShape),
  periodEndedAt: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
};

BetList.defaultProps = {
  calculator: {
    calculateTicketPrice() {},
  },
  deleteHandler() {},
  editHandler() {},
  bets: [],
  isEditable: false,
};

export default BetList;
