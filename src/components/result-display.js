import React from 'react';
import { PropTypes } from 'prop-types';
import service from '../services/index';
import Card from './card';
import './result-display.css';

const ResultDisplay = (props) => {
  const { bets } = props;
  const result = {
    six: props.six,
    two: props.two,
    firstThree: props.firstThree,
    secondThree: props.secondThree,
    thirdThree: props.thirdThree,
    fourthThree: props.fourthThree,
  };
  let resultElement = null;

  if (bets.length > 0) {
    const rewardCallback = (number, price, reward, rewardType) => `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price * reward} บาท`;
    const userReward = bets.map(service.calculation.checkReward(result, rewardCallback)).filter(a => a);
    resultElement = (
      <div className={`message${userReward.length > 0 ? ' win' : ' lose'}`}>
        {userReward.length === 0 && <div>{'you lose!'}</div>}
        {userReward.length > 0 &&
          <div>
            <div style={{ textAlign: 'center' }}>{'you win!'}</div>
            <ul>
              {userReward.map(resultItem => <li key={resultItem}>{resultItem}</li>)}
            </ul>
          </div>}
      </div>
    );
  }
  return (
    <div className="result-display">
      <Card>
        <div className="title">{props.endedAt}</div>
        <div className="body center">
          {resultElement}
          <div className="row">
            <div className="result-group">
              <div>รางวัลที่หนึ่ง</div>
              <span className="six" style={{ fontSize: '50px' }}>{props.six}</span>
            </div>
          </div>
          <div className="row">
            <div className="result-group">
              <div>เลขท้ายสองตัว</div>
              <span className="two" style={{ fontSize: '30px' }}>{props.two}</span>
            </div>
          </div>
          <div className="row">
            <div className="result-group">
              <div>สามตัวล่าง</div>
              <div className="three">
                <span className="firstThree" style={{ fontSize: '30px' }}>{props.firstThree}</span>
                <span className="secondThree" style={{ fontSize: '30px' }}>{props.secondThree}</span>
              </div>
              <div className="three">
                <span className="thirdThree" style={{ fontSize: '30px' }}>{props.thirdThree}</span>
                <span className="fourthThree" style={{ fontSize: '30px' }}>{props.fourthThree}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

ResultDisplay.propTypes = {
  bets: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      price1: PropTypes.number,
      price2: PropTypes.number,
      price3: PropTypes.number,
    }),
  ),
  six: PropTypes.string.isRequired,
  two: PropTypes.string.isRequired,
  firstThree: PropTypes.string.isRequired,
  secondThree: PropTypes.string.isRequired,
  thirdThree: PropTypes.string.isRequired,
  fourthThree: PropTypes.string.isRequired,
  endedAt: PropTypes.string.isRequired,
};

ResultDisplay.defaultProps = {
  bets: [],
};

export default ResultDisplay;
