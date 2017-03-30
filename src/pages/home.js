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
import constants from '../constants/index';
import service from '../services/index';

const styles = {
  base: {
    overflowX: 'auto',
    height: '90vh',
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOpen: false,
      editingBet: null,
      faqOpen: false,
    };
    this.handleSaveBet = this.handleSaveBet.bind(this);
    this.handleDeleteBet = this.handleDeleteBet.bind(this);
    this.inputToggle = this.inputToggle.bind(this);
    this.setEditingBet = this.setEditingBet.bind(this);
    this.switchFaqToggle = this.switchFaqToggle.bind(this);
    this.errorHanlder = this.errorHanlder.bind(this);
  }
  componentDidMount() {
    if (!this.props.username) {
      this.props.router.push('/sign-in');
      return;
    }
    this.props.setPageName('Bet');
  }
  setEditingBet(editingBet) {
    this.inputToggle();
    this.setState({ editingBet });
  }
  errorHanlder(error) {
    if (error.response.status === 401) {
      this.props.router.push('/sign-in');
    }
  }
  handleSaveBet(bet) {
    const self = this;
    self.props.setFetching(true);
    const { currentPeriod } = this.props;
    if (!currentPeriod.isOpen) return;
    let inputBet = currentPeriod.bets.find(item => item.number === bet.number);
    // if number exists, update instead.
    if (inputBet) {
      inputBet.price1 = bet.price1 ? Number(bet.price1) : 0;
      inputBet.price2 = bet.price2 ? Number(bet.price2) : 0;
      inputBet.price3 = bet.price3 ? Number(bet.price3) : 0;
      service.data
        .updateBet(inputBet)
        .then(() => {
          service.data
            .getCurrentPeriod()
            .then((res) => {
              self.props.setCurrentPeriod(res);
              self.props.setFetching(false);
            })
            .catch(this.errorHanlder);
        });
    } else {
      inputBet = bet;
      inputBet.period = currentPeriod.id;
      service.data
        .insertBet(inputBet)
        .then(() => {
          service.data
            .getCurrentPeriod()
            .then((res) => {
              self.props.setCurrentPeriod(res);
              self.props.setFetching(false);
            })
            .catch(this.errorHanlder);
        });
    }
  }
  handleDeleteBet(id) {
    const self = this;
    self.props.setFetching(true);
    service.data
      .deleteBet(id)
      .then(() => {
        service.data.getCurrentPeriod(this.errorHanlder, (res) => {
          self.props.setCurrentPeriod(res);
          self.props.setFetching(false);
        });
      });
  }
  inputToggle() {
    this.setState({ editingBet: null, inputOpen: !this.state.inputOpen });
  }
  switchFaqToggle() {
    this.setState({ faqOpen: !this.state.faqOpen });
  }
  render() {
    const { currentPeriod, themeColor } = this.props;
    if (!currentPeriod || !currentPeriod.isOpen) {
      return (
        <div style={constants.elementStyle.placeholder}>
          {'ตลาดยังไม่เปิดจ้ะ'}
        </div>
      );
    }
    if (currentPeriod.result) {
      const { bets, result } = currentPeriod;
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
            periodEndDate={moment(currentPeriod.endDate).format('DD MMM YYYY')}
          />
        </div>
      );
    }
    return (
      <div style={styles.base}>
        <FaqDialog active={this.state.faqOpen} toggle={this.switchFaqToggle} />
        <BetList
          bets={currentPeriod.bets}
          editHandler={this.setEditingBet}
          deleteHandler={this.handleDeleteBet}
          faqHandler={this.switchFaqToggle}
        />
        <BetInputOverlay active={this.state.inputOpen} />
        <BetInput
          saveBetHandler={this.handleSaveBet}
          editingBet={this.state.editingBet}
          open={this.state.inputOpen}
          onClose={this.inputToggle}
        />
        <Fab active={!this.state.inputOpen} onClick={this.inputToggle} themeColor={themeColor}>
          <span style={{ fontSize: '30px' }}>+</span>
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentPeriod: state.data.currentPeriod });

const mapDispatchToProps = dispatch => (
  {
    setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

Home.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  router: routerShape,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
  themeColor: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
