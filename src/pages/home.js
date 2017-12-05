import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BetList from '../components/BetList';
import BetEditor from '../components/bet-editor';
import ResultDisplay from '../components/ResultDisplay';
import Reward from '../components/Reward';
import UserProfile from '../components/user-profile';
import service from '../services/index';
import './home.css';

const HomePage = ({
  currentPeriod,
  user,
  logOut,
  handleSaveBet,
  editingBet,
  inputToggle,
  setEditingBet,
  handleDeleteBet,
}) => {
  let betEditorElement = null;

  if (currentPeriod.isOpen) {
    betEditorElement = (
      <BetEditor
        editingBet={editingBet}
        onClose={inputToggle}
        saveBetHandler={handleSaveBet}
      />
    );
  }

  return (
    <div className='home'>
      <div className='pane visible-md visible-lg'>
        <UserProfile logOutHandler={logOut} user={user} />
      </div>
      <div className='pane center'>
        <div className='visible-xs visible-sm' style={{ display: 'flex' }}>
          <UserProfile logOutHandler={logOut} user={user} />
        </div>
        <div
          className='visible-xs'
          id='bet-editor-container'
          style={{ display: 'flex' }}
        >
          {betEditorElement}
        </div>
        {currentPeriod.result && (
          <div style={{ margin: '0 0 8px 0' }}>
            <Reward bets={currentPeriod.bets} result={currentPeriod.result} />
            <ResultDisplay {...currentPeriod.result} />
          </div>
        )}
        <BetList
          bets={currentPeriod.bets}
          calculateTicketPrice={service.calculation.calculateTicketPrice}
          deleteHandler={handleDeleteBet}
          editHandler={setEditingBet}
          isEditable={currentPeriod.isOpen}
          periodEndedAt={moment(currentPeriod.endedAt).format('DD MMM YYYY')}
        />
      </div>
      <div className='hidden-xs'>
        <div
          className='hidden-xs'
          id='bet-editor-container'
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
