import React, { PropTypes } from 'react';
import service from '../services/index';
import constant from '../constants/index';
import './result-display.css';

const ResultDisplay = (props) => {
  const result = {
    six: props.six,
    two: props.two,
    firstThree: props.firstThree,
    secondThree: props.secondThree,
  };
  const bets = props.bets || [];
  const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
  const userReward = bets
      .map(service.calculation.checkReward(result, rewardCallback))
      .filter(a => a); // remove null element
  return (
    <div className="result-display">
      <div className="title">{props.endedAt}</div>
      <div className={`message${userReward.length > 0 ? ' win' : ' lose'}`}>
        {userReward.length === 0 && (
          <div>{'you lose!'}</div>
        )}
        {userReward.length > 0 && (
          <div>
            <div style={{ textAlign: 'center' }}>{'you win!'}</div>
            <ul>
              {userReward.map((resultItem, index) => <li key={index}>{resultItem}</li>)}
            </ul>
          </div>
        )}
      </div>
      <div className="body">
        <div className="row">
          <div className="result-group">
            <div>รางวัลที่หนึ่ง</div>
            <span style={{ fontSize: '50px' }}>{props.six}</span>
          </div>
        </div>
        <div className="row">
          <div className="result-group">
            <div>เลขท้ายสองตัว</div>
            <span style={{ fontSize: '30px' }}>{props.two}</span>
          </div>
        </div>
        <div className="row">
          <div className="result-group">
            <div>สามตัวล่าง</div>
            <div className="three">
              <span style={{ fontSize: '30px' }}>{props.firstThree}</span>
              <span style={{ fontSize: '30px' }}>{props.secondThree}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ResultDisplay.propTypes = {
  bets: PropTypes.arrayOf(constant.customPropType.betShape),
  six: PropTypes.string.isRequired,
  two: PropTypes.string.isRequired,
  firstThree: PropTypes.string.isRequired,
  secondThree: PropTypes.string.isRequired,
  endedAt: PropTypes.string.isRequired,
};

export default ResultDisplay;
