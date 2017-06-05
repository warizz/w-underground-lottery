import React from 'react';
import { PropTypes } from 'prop-types';
import service from '../services/index';
import constant from '../constants/index';
import Card from './card';
import './result-display.css';

const ResultDisplay = (props) => {
  const result = {
    six: props.six,
    two: props.two,
    firstThree: props.firstThree,
    secondThree: props.secondThree,
    thirdThree: props.thirdThree,
    fourthThree: props.fourthThree,
  };
  const bets = props.bets || [];
  const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
  const userReward = bets.map(service.calculation.checkReward(result, rewardCallback)).filter(a => a); // remove null element
  return (
    <div className="result-display">
      <Card>
        <div className="title">{props.endedAt}</div>
        <div className="body center">
          <div className={`message${userReward.length > 0 ? ' win' : ' lose'}`}>
            {userReward.length === 0 && <div>{'you lose!'}</div>}
            {userReward.length > 0 &&
              <div>
                <div style={{ textAlign: 'center' }}>{'you win!'}</div>
                <ul>
                  {userReward.map((resultItem, index) => <li key={index}>{resultItem}</li>)}
                </ul>
              </div>}
          </div>
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
              <div className="three">
                <span style={{ fontSize: '30px' }}>{props.thirdThree}</span>
                <span style={{ fontSize: '30px' }}>{props.fourthThree}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

ResultDisplay.propTypes = {
  bets: PropTypes.arrayOf(constant.customPropType.betShape),
  six: PropTypes.string.isRequired,
  two: PropTypes.string.isRequired,
  firstThree: PropTypes.string.isRequired,
  secondThree: PropTypes.string.isRequired,
  thirdThree: PropTypes.string.isRequired,
  fourthThree: PropTypes.string.isRequired,
  endedAt: PropTypes.string.isRequired,
};

export default ResultDisplay;
