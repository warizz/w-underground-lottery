import React from 'react';
import PropTypes from 'prop-types';
import service from '../../services/index';
import { Segment } from 'semantic-ui-react';

const Reward = ({ bets, result }) => {
  if (bets.length === 0) {
    return null;
  }

  const rewardCallback = (number, price, reward, rewardType) =>
    `ถูก ${rewardType} [${number}] ${price} x ${reward} = ${price *
      reward} บาท`;

  const rewards = bets
    .map(service.calculation.checkReward(result, rewardCallback))
    .filter(a => a);

  return (
    <Segment
      color={rewards.length > 0 ? 'green' : 'grey'}
      inverted
      textAlign='center'
    >
      {rewards.length > 0 ? (
        <div>
          <strong>You win!</strong>
          {rewards.map(resultItem => <p key={resultItem}>{resultItem}</p>)}
        </div>
      ) : (
        'You lose'
      )}
    </Segment>
  );
};

Reward.propTypes = {
  bets: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      price1: PropTypes.number,
      price2: PropTypes.number,
      price3: PropTypes.number,
    })
  ),
  result: PropTypes.shape({
    firstThree: PropTypes.string,
    fourthThree: PropTypes.string,
    secondThree: PropTypes.string,
    six: PropTypes.string,
    thirdThree: PropTypes.string,
    two: PropTypes.string,
  }),
};

Reward.defaultProps = {
  bets: [],
  result: {},
};

export default Reward;
