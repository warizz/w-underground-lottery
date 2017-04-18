import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import docCookies from 'doc-cookies';
import BetList from '../components/bet-list/index';
import BetInput from '../components/bet-input';
import ResultDisplay from '../components/result-display';
import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';
import Snackbar from '../components/snackbar';
import UserProfile from '../components/user-profile';

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
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    this.props.setPageName('Home');
  }
  setEditingBet(editingBet) {
    this.inputToggle();
    this.setState({ editingBet });
    const editor = document.getElementById('bet-editor');
    if (editor) {
      editor.scrollIntoView(false);
    }
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
            this.setState({ editingBet: null });
          })
          .catch(this.handleError);
      });
  }
  logOut() {
    const cookieName = `fbat_${process.env.REACT_APP_FB_APP_ID}`;
    const accessToken = docCookies.getItem(cookieName);
    service
      .data
      .logOut(accessToken)
      .then(() => this.props.router.push('/log-in'))
      .catch(error => (
        this.setState({
          alertText: `${error.response.status}: ${error.response.statusText}`,
          hasAlert: true,
        })
      ));
  }
  render() {
    const { currentPeriod = {}, user } = this.props;
    if (currentPeriod.result) {
      const { bets, result } = currentPeriod;
      const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
      const userReward = bets
        .map(service.calculation.checkReward(result, rewardCallback))
        .filter(a => a); // remove null elements
      return (
        <div>
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
            endedAt={moment(currentPeriod.endedAt).format('DD MMM YYYY')}
          />
        </div>
      );
    }
    return (
      <div>
        {
          // <Snackbar active={hasAlert} text={alertText} timer={1000} onClose={() => this.setState({ hasAlert: false, alertText: '' })} />
          // <FaqDialog active={this.state.faqOpen} toggle={this.switchFaqToggle} />
        }
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div className="visible-md visible-lg">
            <UserProfile name={user.name} pictureUrl={user.picture} isAdmin={user.is_admin} logOutHandler={this.logOut} />
          </div>
          <div style={{ margin: '0 10px' }}>
            <div className="visible-xs visible-sm" style={{ margin: '0 0 10px 0' }}>
              <UserProfile name={user.name} pictureUrl={user.picture} isAdmin={user.is_admin} logOutHandler={this.logOut} />
            </div>
            {
              currentPeriod.isOpen && (
                <div className="visible-xs" style={{ marginBottom: '10px' }}>
                  <BetInput
                    saveBetHandler={this.handleSaveBet}
                    editingBet={this.state.editingBet}
                    onClose={this.inputToggle}
                  />
                </div>
              )
            }
            <BetList
              bets={currentPeriod.bets}
              editHandler={this.setEditingBet}
              deleteHandler={this.handleDeleteBet}
              faqHandler={this.switchFaqToggle}
              isEditable={currentPeriod.isOpen}
              periodEndedAt={moment(currentPeriod.endedAt).format('DD MMM YYYY')}
            />
          </div>
          <div className="hidden-xs">
            {currentPeriod.isOpen && (
              <BetInput
                saveBetHandler={this.handleSaveBet}
                editingBet={this.state.editingBet}
              />
            )}
          </div>
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
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    is_admin: PropTypes.bool.isRequired,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
