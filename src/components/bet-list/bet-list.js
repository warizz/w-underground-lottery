import React from 'react';
import { PropTypes } from 'prop-types';
import { discountPercent } from '../../config';
import constants from '../../constants/index';
import BetItem from './bet-item';
import Card from '../card';
import './bet-list.css';

class BetList extends React.Component {
  static calculateTotal(betItem) {
    let total;
    if (betItem.number.length === 1) {
      total = Number(betItem.price1 || 0) + Number(betItem.price2 || 0);
    }
    if (betItem.number.length > 1) {
      total = (Number(1) - Number(discountPercent || 0)) * (Number(betItem.price1 || 0) + Number(betItem.price2 || 0) + Number(betItem.price3 || 0));
    }

    return total || 0;
  }
  render() {
    const { bets, deleteHandler, editHandler, periodEndedAt, isEditable = false } = this.props;

    const total = bets.length > 0 ? bets.map(BetList.calculateTotal).reduce((a, b) => a + b, 0) : 0;
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
                if (a.createdAt > b.createdAt) return -1;
                if (a.createdAt < b.createdAt) return 1;
                return 0;
              })
              .map(bet => <BetItem key={bet.id} bet={bet} deleteHandler={deleteHandler} editHandler={editHandler} isEditable={isEditable} />)}
        </div>
      </div>
    );
  }
}

BetList.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func.isRequired,
  bets: PropTypes.arrayOf(constants.customPropType.betShape),
  periodEndedAt: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
};

BetList.defaultProps = {
  deleteHandler() {},
  editHandler() {},
  bets: [],
  isEditable: false,
};

export default BetList;
