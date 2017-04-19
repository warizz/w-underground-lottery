import React, { PropTypes } from 'react';
import constants from '../../constants/index';
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
    const price1Label = bet.number.length > 2 ? 'เต็ง' : 'บน';
    const price2Label = bet.number.length > 2 ? 'โต๊ด' : 'ล่าง';
    const price3Label = 'ล่าง';
    let price1Reward;
    switch (bet.number.length) {
      case 1:
        price1Reward = bet.price1 * 2;
        break;
      case 2:
        price1Reward = bet.price1 * 70;
        break;
      case 3:
        price1Reward = bet.price1 * 500;
        break;
      default:
        break;
    }
    let price2Reward;
    switch (bet.number.length) {
      case 1:
        price2Reward = bet.price2 * 3;
        break;
      case 2:
        price2Reward = bet.price2 * 70;
        break;
      case 3:
        price2Reward = bet.price2 * 100;
        break;
      default:
        break;
    }
    let price3Reward;
    switch (bet.number.length) {
      case 2:
        price3Reward = bet.price3 * 70;
        break;
      case 3:
        price3Reward = bet.price3 * 500;
        break;
      default:
        break;
    }
    return (
      <div className="bet-item" key={bet.id} tabIndex={0}>
        <div className="body">
          <div className="item">
            <div><b>{bet.number}</b></div>
            <div><b>reward</b></div>
          </div>
          <div className="item">
            {bet.price1 > 0 ? `${price1Label} ${bet.price1}` : null}
            {bet.price1 > 0 && <div className="reward">{price1Reward}</div>}
          </div>
          <div className="item">
            {bet.price2 > 0 ? `${price2Label} ${bet.price2}` : null}
            {bet.price2 > 0 && <div className="reward">{price2Reward}</div>}
          </div>
          <div className="item">
            {bet.price3 > 0 ? `${price3Label} ${bet.price3}` : null}
            {bet.price3 > 0 && <div className="reward">{price3Reward}</div>}
          </div>
        </div>
        {isEditable && (
          <div className="action">
            <button className="edit" onClick={this.handleEdit(bet)}>
              {'edit'}
            </button>
            <button className="delete" onClick={this.handleDelete(bet.id)}>
              {'delete'}
            </button>
          </div>
        )}
      </div>
    );
  }
}

BetItem.propTypes = {
  bet: constants.customPropType.betShape,
  editHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
};

export default BetItem;
