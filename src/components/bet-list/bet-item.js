import React, { PropTypes } from 'react';
import constants from '../../constants/index';

const styles = {
  helpIcon: {
    border: 'none',
    backgroundColor: 'transparent',
    marginLeft: '.5em',
    color: '#757575',
    display: 'flex',
  },
  priceItem: {
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
};

class BetItem extends React.Component {
  handleEdit(bet) {
    return () => this.props.editHandler(bet);
  }
  handleDelete(id) {
    return () => this.props.deleteHandler(id);
  }
  render() {
    const { bet, faqHandler } = this.props;
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
      <div key={bet.id} className="col-xs-12 col-sm-3 col-md-3 col-lg-3" style={{ margin: '0 0 10px 0' }}>
        <div style={{ ...constants.elementStyle.betCard, height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><b>{bet.number}</b></span>
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <button style={styles.helpIcon} onClick={faqHandler}>
                  <i className="material-icons" style={{ fontSize: '16px' }}>help</i>
                </button>
                reward
              </span>
            </div>
            <div style={styles.priceItem}>
              {bet.price1 > 0 ? `${price1Label} ${bet.price1}` : null}
              {bet.price1 > 0 && <span style={styles.reward}>{price1Reward}</span>}
            </div>
            <div style={styles.priceItem}>
              {bet.price2 > 0 ? `${price2Label} ${bet.price2}` : null}
              {bet.price2 > 0 && <span style={styles.reward}>{price2Reward}</span>}
            </div>
            <div style={styles.priceItem}>
              {bet.price3 > 0 ? `${price3Label} ${bet.price3}` : null}
              {bet.price3 > 0 && <span style={styles.reward}>{price3Reward}</span>}
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{ marginTop: '.5em' }}>
              <button className="btn btn-default btn-block" onClick={this.handleEdit(bet)}>
                {'edit'}
              </button>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{ marginTop: '.5em' }}>
              <button className="btn btn-danger btn-block" onClick={this.handleDelete(bet.id)}>
                {'delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BetItem.propTypes = {
  bet: constants.customPropType.betShape,
  editHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  faqHandler: PropTypes.func.isRequired,
};

export default BetItem;
