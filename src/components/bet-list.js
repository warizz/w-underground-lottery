import React, { PropTypes } from 'react';
// import * as paperShadow from '../constants/styles/paper-shadow';
import { discountPercent } from '../config';
import customPropTypes from '../constants/custom-prop-type';

const styles = {
  item: {
    backgroundColor: 'white',
    // boxShadow: paperShadow.level1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '200px',
    maxHeight: '200px',
    marginBottom: '1em',
    overflow: 'hidden',
    padding: '1em',
  },
  listContainer: {
    overflowX: 'auto',
    maxHeight: '80vh',
  },
  helpIcon: {
    border: 'none',
    backgroundColor: 'transparent',
    marginLeft: '.5em',
    color: '#757575',
    display: 'flex',
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30vh',
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
  summary: {
    fontWeight: 'bold',
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
  },
};

class BetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'พรุ่งนี้รวย!!',
    };
    this.handleEdit = this.handleEdit.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.bets !== this.props.bets;
  }
  handleEdit(betItem) {
    return () => {
      this.props.editHandler(betItem);
    };
  }
  handleDelete(betId) {
    return () => this.props.deleteHandler(betId);
  }
  render() {
    const { bets = [] } = this.props;
    if (bets.length === 0) {
      return (
        <div style={styles.placeholder} className="col-xs-12 col-md-12 col-lg-12">{this.state.placeholder}</div>
      );
    }
    const total = bets.length > 0 ? bets
      .map((betItem) => {
        if (betItem.number.length > 1) {
          return (Number(1) - Number(discountPercent)) * (Number(betItem.price1) + Number(betItem.price2) + Number(betItem.price3));
        }
        return Number(betItem.price1) + Number(betItem.price2) + Number(betItem.price3);
      })
      .reduce((a, b) => a + b) : null;
    return (
      <div>
        <div className="container-fluid">
          <div style={styles.summary} className="col-xs-12 col-md-12 col-lg-12">
            {total && `Total: ${total} ฿`}
            <button style={styles.helpIcon} onClick={this.props.faqHandler}>
              <i className="material-icons" style={{ fontSize: '16px' }}>help</i>
            </button>
          </div>
        </div>
        <div className="container-fluid" style={styles.listContainer}>
          {bets.length > 0 && (
              bets
                .sort((a, b) => {
                  if (a.createdAt > b.createdAt) return -1;
                  if (a.createdAt < b.createdAt) return 1;
                  return 0;
                })
                .map((bet) => {
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
                    <div key={bet.id} className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                      <div style={styles.item}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span><b>{bet.number}</b></span>
                            <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                              <button style={styles.helpIcon} onClick={this.props.faqHandler}>
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
                })
            )}
        </div>
      </div>
    );
  }
}

BetList.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func.isRequired,
  faqHandler: PropTypes.func,
  bets: PropTypes.arrayOf(customPropTypes.betShape),
};

export default BetList;
