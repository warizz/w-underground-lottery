import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '../Card';
import './bet-item.css';

class BetItem extends React.Component {
  handleEdit(bet) {
    return () => this.props.editHandler(bet);
  }
  handleDelete(id) {
    return () => this.props.deleteHandler(id);
  }
  render() {
    const { bet, isEditable } = this.props;

    if (!bet) {
      return null;
    }

    if (bet.number.length > 3) {
      return null;
    }

    const price1Label = bet.number.length > 2 ? 'เต็ง' : 'บน';
    const price2Label = bet.number.length > 2 ? 'โต๊ด' : 'ล่าง';
    const price3Label = 'ล่าง';

    let price1Reward;
    switch (bet.number.length) { // eslint-disable-line default-case
      case 1:
        price1Reward = bet.price1 * 2;
        break;
      case 2:
        price1Reward = bet.price1 * 70;
        break;
      case 3:
        price1Reward = bet.price1 * 500;
        break;
    }

    let price2Reward;
    switch (bet.number.length) { // eslint-disable-line default-case
      case 1:
        price2Reward = bet.price2 * 3;
        break;
      case 2:
        price2Reward = bet.price2 * 70;
        break;
      case 3:
        price2Reward = bet.price2 * 100;
        break;
    }

    let price3Reward;
    switch (bet.number.length) {
      case 2:
        price3Reward = bet.price3 * 70;
        break;
      case 3:
        price3Reward = bet.price3 * 100;
        break;
      default:
        break;
    }

    return (
      <div className="bet-item">
        <Card>
          <div className="body">
            <div className="item">
              <div className="bet-number">
                <b>{bet.number}</b>
              </div>
              <div>
                <b>reward</b>
              </div>
            </div>
            {bet.price1 && (
              <div className="item">
                <div className="price-1">{`${price1Label} ${bet.price1}`}</div>
                <div className="reward">{price1Reward}</div>
              </div>
            )}
            {bet.price2 && (
              <div className="item">
                <div className="price-2">{`${price2Label} ${bet.price2}`}</div>
                <div className="reward">{price2Reward}</div>
              </div>
            )}
            {bet.price3 && (
              <div className="item">
                <div className="price-3">{`${price3Label} ${bet.price3}`}</div>
                <div className="reward">{price3Reward}</div>
              </div>
            )}
          </div>
          {isEditable && (
            <div className="action">
              <button
                className="edit border-right"
                onClick={this.handleEdit(bet)}
              >
                {'edit'}
              </button>
              <button
                className="delete danger"
                onClick={this.handleDelete(bet.id)}
              >
                {'delete'}
              </button>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

BetItem.propTypes = {
  bet: PropTypes.shape({
    number: PropTypes.string,
    price1: PropTypes.number,
    price2: PropTypes.number,
    price3: PropTypes.number,
  }),
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  isEditable: PropTypes.bool,
};

BetItem.defaultProps = {
  bet: null,
  editHandler() {},
  deleteHandler() {},
  isEditable: false,
};

export default BetItem;
