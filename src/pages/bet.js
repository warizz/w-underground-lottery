import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import moment from 'moment';
import BetList from '../components/bet-list';
import BetInput from '../components/bet-input';
import BetInputOverlay from '../components/overlay';
import ResultDisplay from '../components/result-display';
import Fab from '../components/fab';
import FaqDialog from '../components/faq-dialog';
import actions from '../actions/index';
import * as commonStyles from '../constants/styles/common';
import customPropTypes from '../constants/custom-prop-type';
import service from '../services/index';

const styles = {
  base: {
    overflowX: 'auto',
    height: '90vh',
  },
};

class BetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOpen: false,
      editingBet: null,
      faqOpen: false,
    };
    this.handleSaveBet = this.handleSaveBet.bind(this);
    // this.handleDeleteBet = this.handleDeleteBet.bind(this);
    this.inputToggle = this.inputToggle.bind(this);
    this.setEditingBet = this.setEditingBet.bind(this);
    this.switchFaqToggle = this.switchFaqToggle.bind(this);
  }
  componentDidMount() {
    if (!this.props.username) {
      this.props.router.push('/sign-in');
      return;
    }
    this.props.setPageName('Bet');
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.period) {
      return true;
    }
    return false;
  }
  setEditingBet(editingBet) {
    this.inputToggle();
    this.setState({ editingBet });
  }
  handleSaveBet(bet) {
    const { period } = this.props;
    if (!period.open) return;
    let inputBet = period.bets.find(item => item.number === bet.number);
    // if number exists, update instead.
    if (inputBet) {
      inputBet.price1 = bet.price1 ? Number(bet.price1) : 0;
      inputBet.price2 = bet.price2 ? Number(bet.price2) : 0;
      inputBet.price3 = bet.price3 ? Number(bet.price3) : 0;
    } else {
      inputBet = bet;
      inputBet.id = new Date().valueOf().toString();
      inputBet.username = this.props.username;
    }
    service.data.insertBet(period.id, inputBet);
  }
  handleDeleteBet(periodId) {
    return betId => service.data.deleteBet(periodId, betId);
  }
  inputToggle() {
    this.setState({ editingBet: null, inputOpen: !this.state.inputOpen });
  }
  switchFaqToggle() {
    this.setState({ faqOpen: !this.state.faqOpen });
  }
  render() {
    const { period } = this.props;
    if (!period || !period.open) {
      return (
        <div style={commonStyles.placeholder}>
          {'ตลาดยังไม่เปิดจ้ะ'}
        </div>
      );
    }
    if (period.result) {
      const { bets, result } = period;
      const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
      const userReward = bets
        .map(service.calculation.checkReward(result, rewardCallback))
        .filter(a => a); // remove null elements
      return (
        <div className="container-fluid" style={{ height: '90vh', overflowX: 'auto' }}>
          {userReward.length === 0 && (
            <div className="alert">
              <h1>คุณไม่ถูกรางวัล คราวหน้าลองใหม่นะ :)</h1>
            </div>
          )}
          {userReward.length > 0 && (
            <div className="alert alert-success">
              <h1>ดีจวยด้วย คุณถูกรางวัล!</h1>
              <ul>
                {userReward.map((resultItem, index) => <li key={index}>{resultItem}</li>)}
              </ul>
            </div>
          )}
          <ResultDisplay
            {...result}
            periodEndDate={moment(period.endDate).format('DD MMM YYYY')}
          />
        </div>
      );
    }
    return (
      <div style={styles.base}>
        <FaqDialog active={this.state.faqOpen} toggle={this.switchFaqToggle} />
        <BetList bets={period.bets} editHandler={this.setEditingBet} deleteHandler={this.handleDeleteBet(period.id)} faqHandler={this.switchFaqToggle} />
        <BetInputOverlay active={this.state.inputOpen} />
        <BetInput saveBetHandler={this.handleSaveBet} editingBet={this.state.editingBet} open={this.state.inputOpen} onClose={this.inputToggle} />
        <Fab active={!this.state.inputOpen} onClick={this.inputToggle}>
          <span style={{ fontSize: '30px' }}>+</span>
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    fetching: state.data.fetching,
    period: state.data.period,
    username: state.user.username,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

BetPage.propTypes = {
  period: customPropTypes.periodShape,
  router: routerShape,
  setPageName: PropTypes.func,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BetPage);
