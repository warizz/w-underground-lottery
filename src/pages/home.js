import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import BetList from '../components/bet-list/index';
import BetInput from '../components/bet-input';
import ResultDisplay from '../components/result-display';
import Fab from '../components/fab';
import FaqDialog from '../components/faq-dialog';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Snackbar from '../components/snackbar';

const styles = {
  base: {
    overflowX: 'auto',
    height: '100%',
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
    this.handleError = this.handleError.bind(this);
    this.handleSaveBet = this.handleSaveBet.bind(this);
    this.handleDeleteBet = this.handleDeleteBet.bind(this);
    this.inputToggle = this.inputToggle.bind(this);
    this.setEditingBet = this.setEditingBet.bind(this);
    this.switchFaqToggle = this.switchFaqToggle.bind(this);
  }
  componentDidMount() {
    this.props.setPageName('Bet');
  }
  setEditingBet(editingBet) {
    this.inputToggle();
    this.setState({ editingBet });
  }
  setAlert(alertText) {
    return () => {
      this.setState({
        alertText,
        fetching: false,
        hasAlert: true,
      });
    };
  }
  switchFaqToggle() {
    this.setState({ faqOpen: !this.state.faqOpen });
  }
  inputToggle() {
    this.setState({ editingBet: null, inputOpen: !this.state.inputOpen });
  }
  handleDeleteBet(id) {
    const self = this;
    self.props.setFetching(true);
    service.data
    .deleteBet(id)
    .then(() => {
      service.data
      .getCurrentPeriod()
      .then((res) => {
        self.props.setCurrentPeriod(res);
        self.props.setFetching(false);
      })
      .catch(this.handleError);
    });
  }
  handleError(error) {
    const alertText = `${error.response.status}: ${error.response.statusText}`;
    this.setAlert(alertText);
    this.props.setFetching(false);
  }
  handleSaveBet(bet) {
    const self = this;
    const { currentPeriod } = this.props;
    self.props.setFetching(true);
    if (!currentPeriod.isOpen) return;
    let inputBet = currentPeriod.bets.find(item => item.number === bet.number);
    let actor;
    if (inputBet) {
      inputBet.price1 = bet.price1 ? Number(bet.price1) : 0;
      inputBet.price2 = bet.price2 ? Number(bet.price2) : 0;
      inputBet.price3 = bet.price3 ? Number(bet.price3) : 0;
      actor = service.data.updateBet;
    } else {
      inputBet = bet;
      inputBet.period = currentPeriod.id;
      actor = service.data.insertBet;
    }
    actor(inputBet)
      .then(() => {
        service.data
          .getCurrentPeriod()
          .then((res) => {
            this.props.setCurrentPeriod(res);
            this.props.setFetching(false);
            this.setAlert('saved')();
            this.setState({ editingBet: null })
          })
          .catch(this.handleError);
      });
  }
  render() {
    const { alertText, hasAlert } = this.state;
    const { currentPeriod, themeColor } = this.props;
    if (!currentPeriod || (!currentPeriod.isOpen && !currentPeriod.result)) {
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
            <div className="alert" style={{ textAlign: 'center' }}>
              <h1>คุณไม่ถูกรางวัล คราวหน้าลองใหม่นะ :)</h1>
            </div>
          )}
          {userReward.length > 0 && (
            <div className="alert alert-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ textAlign: 'center' }}>ดีจวยด้วย คุณถูกรางวัล!</h1>
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
        <Snackbar active={hasAlert} text={alertText} timer={1000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
        <FaqDialog active={this.state.faqOpen} toggle={this.switchFaqToggle} />
        <div className="visible-lg" style={{ height: '100%' }}>
          <div className="col-lg-10" style={{ height: '100%', overflowX: 'auto' }}>
            <BetList
              bets={currentPeriod.bets}
              editHandler={this.setEditingBet}
              deleteHandler={this.handleDeleteBet}
              faqHandler={this.switchFaqToggle}
            />
          </div>
          <div className="col-lg-2" style={{ padding: 0, height: '100%' }}>
            <BetInput
              saveBetHandler={this.handleSaveBet}
              editingBet={this.state.editingBet}
              open
              onClose={this.inputToggle}
            />
          </div>
        </div>
        <div className="hidden-lg" style={{ height: '100%' }}>
          {!this.state.inputOpen && (
            <BetList
              bets={currentPeriod.bets}
              editHandler={this.setEditingBet}
              deleteHandler={this.handleDeleteBet}
              faqHandler={this.switchFaqToggle}
            />
          )}
          {this.state.inputOpen && (
            <BetInput
              saveBetHandler={this.handleSaveBet}
              editingBet={this.state.editingBet}
              onClose={this.inputToggle}
              open={this.state.inputOpen}
            />
          )}
          <Fab active={!this.state.inputOpen} onClick={this.inputToggle} themeColor={themeColor}>
            <span style={{ fontSize: '30px' }}>+</span>
          </Fab>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    currentPeriod: state.data.currentPeriod,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

Home.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setCurrentPeriod: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
  themeColor: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
