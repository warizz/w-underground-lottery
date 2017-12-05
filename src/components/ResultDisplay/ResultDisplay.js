import React from 'react';
import PropTypes from 'prop-types';
import service from '../../services/index';
import './ResultDisplay.css';
import { Segment } from 'semantic-ui-react';

const ResultDisplay = ({
  bets,
  six,
  two,
  firstThree,
  secondThree,
  thirdThree,
  fourthThree,
}) => {
  const result = { firstThree, fourthThree, secondThree, six, thirdThree, two };
  let resultElement = null;

  if (bets.length > 0) {
    const rewardCallback = (number, price, reward, rewardType) =>
      `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price *
        reward} บาท`;
    const userReward = bets
      .map(service.calculation.checkReward(result, rewardCallback))
      .filter(a => a);
    resultElement = (
      <div className={`message${userReward.length > 0 ? ' win' : ' lose'}`}>
        {userReward.length === 0 && <div>{'you lose!'}</div>}
        {userReward.length > 0 && (
          <div>
            <div style={{ textAlign: 'center' }}>{'you win!'}</div>
            <ul>
              {userReward.map(resultItem => (
                <li key={resultItem}>{resultItem}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className='ResultDisplay'>
      <Segment color='green' inverted>
        {resultElement}
      </Segment>
      <Segment.Group size='massive'>
        <Segment color='green' textAlign='center'>
          {six}
        </Segment>
        <Segment textAlign='center'>{two}</Segment>
        <Segment.Group horizontal>
          <Segment textAlign='center'>{firstThree}</Segment>
          <Segment textAlign='center'>{secondThree}</Segment>
        </Segment.Group>
        <Segment.Group horizontal>
          <Segment textAlign='center'>{thirdThree}</Segment>
          <Segment textAlign='center'>{fourthThree}</Segment>
        </Segment.Group>
      </Segment.Group>
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
    })
  ),
  firstThree: PropTypes.string,
  fourthThree: PropTypes.string,
  secondThree: PropTypes.string,
  six: PropTypes.string,
  thirdThree: PropTypes.string,
  two: PropTypes.string,
};

ResultDisplay.defaultProps = {
  bets: [],
  firstThree: '',
  fourthThree: '',
  secondThree: '',
  six: '',
  thirdThree: '',
  two: '',
};

export default ResultDisplay;
