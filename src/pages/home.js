import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import BetList from '../components/BetList';
import BetEditor from '../components/bet-editor';
import ResultDisplay from '../components/result-display';
import UserProfile from '../components/user-profile';
import service from '../services/index';
import './home.css';

const HomePage = props => {
  const {
    currentPeriod,
    user,
    logOut,
    handleSaveBet,
    editingBet,
    inputToggle,
    setEditingBet,
    handleDeleteBet,
  } = props;
  let betEditorElement = null;
  let resultDisplayElement = null;
  if (currentPeriod.isOpen) {
    betEditorElement = (
      <BetEditor
        saveBetHandler={handleSaveBet}
        editingBet={editingBet}
        onClose={inputToggle}
      />
    );
  }
  if (currentPeriod.result) {
    resultDisplayElement = (
      <div id="result-display-container" style={{ margin: '0 0 10px 0' }}>
        <ResultDisplay
          {...currentPeriod.result}
          bets={currentPeriod.bets}
          endedAt={moment(currentPeriod.endedAt).format('DD MMM YYYY')}
        />
      </div>
    );
  }
  return (
    <div className="home">
      <div className="pane visible-md visible-lg">
        <UserProfile user={user} logOutHandler={logOut} />
      </div>
      <div className="pane center">
        <div className="visible-xs visible-sm" style={{ display: 'flex' }}>
          <UserProfile user={user} logOutHandler={logOut} />
        </div>
        <div
          id="bet-editor-container"
          className="visible-xs"
          style={{ display: 'flex' }}
        >
          {betEditorElement}
        </div>
        {resultDisplayElement}
        <BetList
          bets={currentPeriod.bets}
          editHandler={setEditingBet}
          deleteHandler={handleDeleteBet}
          isEditable={currentPeriod.isOpen}
          periodEndedAt={moment(currentPeriod.endedAt).format('DD MMM YYYY')}
          calculateTicketPrice={service.calculation.calculateTicketPrice}
        />
      </div>
      <div className="hidden-xs">
        <div
          id="bet-editor-container"
          className="hidden-xs"
          style={{ display: 'flex' }}
        >
          {betEditorElement}
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  currentPeriod: PropTypes.shape({
    id: PropTypes.string,
    bets: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  user: PropTypes.shape({}),
  logOut: PropTypes.func,
  handleSaveBet: PropTypes.func,
  handleDeleteBet: PropTypes.func,
  editingBet: PropTypes.shape({}),
  inputToggle: PropTypes.func,
  setEditingBet: PropTypes.func,
};

HomePage.defaultProps = {
  currentPeriod: {},
  user: {},
  logOut() {},
  handleSaveBet() {},
  handleDeleteBet() {},
  editingBet: {},
  inputToggle() {},
  setEditingBet() {},
};

export default HomePage;
