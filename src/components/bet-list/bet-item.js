import React, { PropTypes } from 'react';
import constants from '../../constants/index';

const style = {
  container: {
    border: '1px solid #b8bfc3',
    borderRadius: '5px',
    overflow: 'hidden',
    maxWidth: '300px',
    width: '300px',
    margin: '0 0 10px 0',
  },
  detail: {
    container: {
      backgroundColor: 'white',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      container: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      reward: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
      },
    },
    price: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    reward: {
      display: 'flex',
      alignItems: 'center',
      color: '#689F38',
      fontWeight: 'bold',
    },
  },
  action: {
    container: {
      backgroundColor: '#F6F7F9',
      borderTop: '1px solid #b8bfc3',
    },
    button: {
      base: {
        backgroundColor: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        padding: '10px',
        width: '50%',
      },
      edit: {
        color: 'rgb(148, 146, 146)',
        borderRight: '1px solid #b8bfc3',
      },
      delete: {
        color: 'rgb(191, 58, 58)',
      },
    },
  },
};

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
      <div key={bet.id} style={style.container}>
        <div style={style.detail.container}>
          <div style={style.detail.header.container}>
            <span><b>{bet.number}</b></span>
            <span style={style.detail.header.reward}>reward</span>
          </div>
          <div style={style.detail.price}>
            {bet.price1 > 0 ? `${price1Label} ${bet.price1}` : null}
            {bet.price1 > 0 && <span style={style.detail.reward}>{price1Reward}</span>}
          </div>
          <div style={style.detail.price}>
            {bet.price2 > 0 ? `${price2Label} ${bet.price2}` : null}
            {bet.price2 > 0 && <span style={style.detail.reward}>{price2Reward}</span>}
          </div>
          <div style={style.detail.price}>
            {bet.price3 > 0 ? `${price3Label} ${bet.price3}` : null}
            {bet.price3 > 0 && <span style={style.detail.reward}>{price3Reward}</span>}
          </div>
        </div>
        {isEditable && (
          <div style={style.action.container}>
            <button style={{ ...style.action.button.base, ...style.action.button.edit }} onClick={this.handleEdit(bet)}>
              {'edit'}
            </button>
            <button style={{ ...style.action.button.base, ...style.action.button.delete }} onClick={this.handleDelete(bet.id)}>
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
