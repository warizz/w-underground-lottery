import React, { PropTypes } from 'react';
import { discountPercent } from '../../config';
import constants from '../../constants/index';
import BetItem from './bet-item';

const style = {
  container: {
    width: '300px',
    maxWidth: '300px',
  },
  summary: {
    backgroundColor: 'white',
    border: '1px solid #b8bfc3',
    borderRadius: '5px',
    padding: '10px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

class BetList extends React.Component {
  static calculateTotal(betItem) {
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
    const { bets = [], deleteHandler, editHandler } = this.props;
    const total = bets.length > 0 ? bets
      .map(BetList.calculateTotal)
      .reduce((a, b) => a + b) : null;
    return (
      <div style={style.container}>
        <div style={style.summary}>
          <div>{`total: ${total || 0} ฿`}</div>
        </div>
        <div>
          {bets.length > 0 && (
              bets
                .sort((a, b) => {
                  if (a.createdAt > b.createdAt) return -1;
                  if (a.createdAt < b.createdAt) return 1;
                  return 0;
                })
                .map(bet => <BetItem key={bet.id} bet={bet} deleteHandler={deleteHandler} editHandler={editHandler} />)
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
};

export default BetList;
