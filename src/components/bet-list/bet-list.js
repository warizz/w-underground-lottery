import React, { PropTypes } from 'react';
import { discountPercent } from '../../config';
import constants from '../../constants/index';
import BetItem from './bet-item';

const styles = {
  helpIcon: {
    border: 'none',
    backgroundColor: 'transparent',
    marginLeft: '.5em',
    color: '#757575',
    display: 'flex',
  },
  listContainer: {
    overflowX: 'auto',
    maxHeight: '80vh',
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30vh',
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
    const { bets = [], deleteHandler, editHandler, faqHandler } = this.props;
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
          <div className="row">
            {bets.length > 0 && (
                bets
                  .sort((a, b) => {
                    if (a.createdAt > b.createdAt) return -1;
                    if (a.createdAt < b.createdAt) return 1;
                    return 0;
                  })
                  .map(bet => <BetItem key={bet.id} bet={bet} deleteHandler={deleteHandler} editHandler={editHandler} faqHandler={faqHandler} />)
              )}
          </div>
        </div>
      </div>
    );
  }
}

BetList.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func.isRequired,
  faqHandler: PropTypes.func,
  bets: PropTypes.arrayOf(constants.customPropType.betShape),
};

export default BetList;
