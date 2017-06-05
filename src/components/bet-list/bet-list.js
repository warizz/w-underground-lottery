import React from 'react';
import { PropTypes } from 'prop-types';
import { discountPercent } from '../../config';
import constants from '../../constants/index';
import BetItem from './bet-item';
import Card from '../card';
import './bet-list.css';

class BetList extends React.Component {
  static calculateTotal(betItem) {
    if (!betItem.number) return 0;
    if (betItem.number.length > 1) {
      return (Number(1) - Number(discountPercent)) * (Number(betItem.price1) + Number(betItem.price2) + Number(betItem.price3));
    }
    return Number(betItem.price1) + Number(betItem.price2) + Number(betItem.price3);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.bets !== this.props.bets;
  }
  handleEdit(betItem) {
    return () => this.props.editHandler(betItem);
  }
  handleDelete(betId) {
    return () => this.props.deleteHandler(betId);
  }
  render() {
    const { bets = [], deleteHandler, editHandler, periodEndedAt, isEditable = false } = this.props;
    const total = bets.length > 0 ? bets
      .map(BetList.calculateTotal)
      .reduce((a, b) => a + b) : null;
    return (
      <div className="bet-list">
        <Card>
          <div className="title">{periodEndedAt}</div>
          <div className="body"><b>{`total: ${total || 0} ฿`}</b></div>
        </Card>
        <div className="list">
          {bets.length > 0 && (
              bets
                .sort((a, b) => {
                  if (a.createdAt > b.createdAt) return -1;
                  if (a.createdAt < b.createdAt) return 1;
                  return 0;
                })
                .map(bet => (
                  <BetItem
                    key={bet.id} bet={bet}
                    deleteHandler={deleteHandler}
                    editHandler={editHandler}
                    isEditable={isEditable}
                  />
                ))
            )}
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

export default BetList;
