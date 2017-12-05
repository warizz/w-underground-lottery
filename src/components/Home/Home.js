import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BetList from '../BetList';
import BetEditor from '../bet-editor';
import ResultDisplay from '../ResultDisplay';
import Reward from '../Reward';
import UserProfile from '../user-profile';
import service from '../../services/index';
import './Home.css';

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
    <div className='Home'>
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
    bets: PropTypes.arrayOf(PropTypes.shape({})),
    id: PropTypes.string,
  }),
  editingBet: PropTypes.shape({}),
  handleDeleteBet: PropTypes.func,
  handleSaveBet: PropTypes.func,
  inputToggle: PropTypes.func,
  logOut: PropTypes.func,
  setEditingBet: PropTypes.func,
  user: PropTypes.shape({}),
};

HomePage.defaultProps = {
  currentPeriod: {},
  editingBet: {},
  handleDeleteBet() {},
  handleSaveBet() {},
  inputToggle() {},
  logOut() {},
  setEditingBet() {},
  user: {},
};

export default HomePage;
