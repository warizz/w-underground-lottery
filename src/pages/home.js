import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import docCookies from 'doc-cookies';

import BetList from '../components/bet-list/bet-list';
import BetEditor from '../components/bet-editor';
import ResultDisplay from '../components/result-display';
import UserProfile from '../components/user-profile';

import actions from '../actions/index';
import constants from '../constants/index';
import service from '../services/index';

import './home.css';

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
    if (editor) editor.focus();
  }
  inputToggle() {
    this.setState({ editingBet: null, inputOpen: !this.state.inputOpen });
  }
  handleDeleteBet(id) {
    this.props.setFetching(true);
    service.data
    .deleteBet(id)
    .then(() => {
      service.data
      .getCurrentPeriod()
      .then((res) => {
        this.props.setCurrentPeriod(res);
        this.props.setFetching(false);
        this.props.setAlert('deleted');
      })
      .catch(this.handleError);
    });
  }
  handleError(error) {
    if (error.response) {
      const alertText = `${error.response.status}: ${error.response.statusText}`;
      this.props.setAlert(alertText);
    }
    this.props.setFetching(false);
  }
  handleSaveBet(bet) {
    const { currentPeriod } = this.props;
    this.props.setFetching(true);
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
            this.props.setAlert('saved');
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
    return (
      <div className="home">
        {
          // left pane
        }
        <div className="pane visible-md visible-lg">
          <UserProfile user={user} logOutHandler={this.logOut} />
        </div>
        {
          // center pane
        }
        <div className="pane center">
          <div className="visible-xs visible-sm" style={{ display: 'flex' }}>
            <UserProfile user={user} logOutHandler={this.logOut} />
          </div>
          {
            currentPeriod.isOpen && (
              <div className="visible-xs" style={{ display: 'flex' }}>
                <BetEditor
                  saveBetHandler={this.handleSaveBet}
                  editingBet={this.state.editingBet}
                  onClose={this.inputToggle}
                />
              </div>
            )
          }
          {
            currentPeriod.result && (
              <div style={{ margin: '0 0 10px 0' }}>
                <ResultDisplay
                  {...currentPeriod.result}
                  bets={currentPeriod.bets}
                  endedAt={moment(currentPeriod.endedAt).format('DD MMM YYYY')}
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
        {
          // right pane
        }
        <div className="hidden-xs">
          {currentPeriod.isOpen && (
            <BetEditor
              saveBetHandler={this.handleSaveBet}
              editingBet={this.state.editingBet}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    currentPeriod: state.data.currentPeriod,
    user: state.user.user,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setAlert: alert => dispatch(actions.layout.setAlert(alert)),
    setCurrentPeriod: currentPeriod => dispatch(actions.data.setCurrentPeriod(currentPeriod)),
    setFetching: fetching => dispatch(actions.data.setFetching(fetching)),
    setPageName: pageName => dispatch(actions.layout.setPageName(pageName)),
  }
);

Home.propTypes = {
  currentPeriod: constants.customPropType.periodShape,
  setAlert: PropTypes.func.isRequired,
  setCurrentPeriod: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
    is_admin: PropTypes.bool,
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
